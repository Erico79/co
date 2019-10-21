import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import {validateAll} from 'indicative/validator';
import admin from './initAdmin';
import UserRecord = admin.auth.UserRecord;
// TODO: once we are on a paid plan
// import {accountSID, authToken, phoneNumber as twilioPhoneNo} from "./constants";
// const client = require('twilio')(accountSID, authToken);

// import groups from './routes/groups';

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });
const db = admin.firestore();

// const app = express();

// app.use(cors({ origin: true }));
// app.use('/api/groups', groups);

// exports.app = functions.https.onRequest(app);

exports.dedupGroup = functions.https.onCall(async (data: any) => {
  const rules = {
    chamaName: 'string|required',
    noOfMembers: 'string|required',
  };
  let querySnapshot;

  try {
    await validateAll(data, rules);
  } catch (e) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid Payload', e);
  }

  try {
    querySnapshot = await db.collection('groups')
      .where('chamaName', '==', data.chamaName)
      .get();
  } catch(e) {
    throw new functions.https.HttpsError('unknown', 'Encountered an error while validating group details', e);
  }

  if (!querySnapshot.empty)
    throw new functions.https.HttpsError('already-exists', 'A Chama with the same name already exists.');

  return null;
});

interface GroupAdmin {
  uid: string,
  displayName: string|undefined;
  email: string|undefined,
  phoneNumber: string|undefined,
  role: string,
  groupId?: string,
}

exports.registerGroupAndAdmin = functions.https.onCall(async (data: any) => {
  const rules = {
    chamaName: 'required|string|max:100',
    noOfMembers: 'required|number',
    firstName: 'required|string|max:20',
    lastName: 'required|string|max:20',
    email: 'required|email|max:255',
    mobilePhone: 'required|string',
    password: 'required|min:6|max:50',
    confirmPassword: 'required|min:6|max:50',
  };

  let payload;
  let adminRecord: UserRecord;
  let groupAdmin: GroupAdmin;

  try {
     payload = await validateAll(data, rules);
  } catch(e) {
    console.log(e);
    throw new functions.https.HttpsError('invalid-argument', 'Invalid Payload', e);
  }

  try {
    adminRecord = await admin.auth().createUser({
      email: payload.email,
      emailVerified: false,
      phoneNumber: payload.mobilePhone,
      password: payload.password,
      displayName: `${payload.firstName} ${payload.lastName}`,
      disabled: false,
    });

    groupAdmin = {
      uid: adminRecord.uid,
      email: adminRecord.email,
      displayName: adminRecord.displayName,
      phoneNumber: adminRecord.phoneNumber,
      role: 'group-admin',
    }
  } catch(e) {
    throw new functions.https.HttpsError('internal', 'Admin Authentication Error', e);
  }

  try {
    const groupDocRef = await db.collection('groups')
      .add({ chamaName: payload.chamaName, noOfMembers: payload.noOfMembers });

    groupAdmin.groupId = groupDocRef.id;

    await groupDocRef.collection('members').add(groupAdmin);
  } catch(e) {
    throw new functions.https.HttpsError('internal', 'Failed to register the group and it\'s admin.', e);
  }

  return groupAdmin;
});

exports.sendOTP = functions.https.onCall(async (data: any) => {
  let payload;
  const otp = generateOTP();
  const expiresAt = getExpirationTime();

  try {
    payload = await validateAll(data, {mobilePhone: 'string|required'});
  } catch(e) {
    throw new functions.https.HttpsError('invalid-argument', 'You must enter your mobile phone number.');
  }

  // TODO: can only work on a paid firebase plan
  // try {
  //   await client.messages.create({
  //     body: `Your Chama Online verification code is: ${otp}`,
  //     from: twilioPhoneNo,
  //     to: payload.mobilePhone,
  //   })
  // } catch(e) {
  //   throw new functions.https.HttpsError('unknown', 'Failed to send OTP', e);
  // }

  try {
    await db.collection('otp').add({
      mobilePhone: payload.mobilePhone,
      code: otp,
      expiresAt,
      retries: 3,
      active: true,
    })
  } catch(e) { throw new functions.https.HttpsError('unknown', 'Encountered OTP error')}

  return null;
});

exports.validateOTP = functions.https.onCall(async (data: any) => {
  let payload;
  let querySnapshot;

  try {
    payload = await validateAll(data, {otp: 'string|required', mobilePhone: 'string|required'});
  } catch (e) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid Payload', e);
  }

  try {
    // get the latest otp
    querySnapshot = await db.collection('otp')
      .where('mobilePhone', '==', payload.mobilePhone)
      .orderBy('expiresAt', 'desc')
      .limit(1)
      .get();
  } catch(e) {
    throw new functions.https.HttpsError('unknown', 'Encountered an error while validating OTP', e);
  }

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const docData = docSnapshot.data();
    const expiryTime = new Date(docData.expiresAt.toDate()).getTime();
    const currentTime = new Date().getTime();
    const docRef = db.collection('otp').doc(docSnapshot.id);

    if (!docData.active)
      throw new functions.https.HttpsError('internal', 'OTP has already been used', {
        otpStatus: 'OTP_ALREADY_USED'
      });

    if (expiryTime < currentTime)
      throw new functions.https.HttpsError('internal', 'OTP is expired', {
        otpStatus: 'OTP_EXPIRED'
      });

    if (!docData.retries)
      throw new functions.https.HttpsError('internal', 'You have maxed out your retries', {
        otpStatus: 'OTP_MAX_RETRIES_REACHED'
      });

    if (docData.code !== payload.otp) {
        await docRef.update({retries: docData.retries - 1});
        throw new functions.https.HttpsError('invalid-argument', 'Invalid OTP. Please try again', {
          otpStatus: 'OTP_IS_INVALID'
        });
    }

    await docRef.update({ active: false });
    return { otpStatus: 'OTP_IS_VALID' };
  }

  throw new functions.https.HttpsError('unknown', 'We did not receive any OTP. Try resending.');
});

exports.saveGroupAccounts = functions.https.onCall(async (data: any) => {
  const rules = { accounts: 'required|array', groupId: 'required|string' };
  let payload: { groupId: any; accounts: any[]; };
  let argumentErrors: Array<Object> = [];

  try {
    payload = await validateAll(data, rules);
  } catch(e) {
    console.log(e);
    throw new functions.https.HttpsError('invalid-argument', 'Invalid Payload', e);
  }

  if (data.accounts.length === 0)
    throw new functions.https.HttpsError('invalid-argument', 'You must submit at least 1 account.');

  const accountsRef = db.collection(`groups/${payload.groupId}/accounts`);

  // truncate collection
  const groupAccQuerySnapshot = await accountsRef.get();

  // Delete documents in a batch
  let batch = db.batch();
  groupAccQuerySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  let batchTwo = db.batch();
  for (let i = 0; i < payload.accounts.length; i++) {
    const acc = payload.accounts[i];
    const accountName = acc.name.replace(/\s+/g, '-').toLowerCase();
    const groupDocRef = accountsRef.doc(accountName);

    if (!acc.contributionAmount) {
      argumentErrors.push({
        i,
        fieldName: 'contributionAmount',
        message: 'Contribution Amount must be greater than 0'
      });
      continue;
    }

    batchTwo.create(groupDocRef, acc);
  }
  await batchTwo.commit();

  if (argumentErrors.length)
    throw new functions.https.HttpsError('invalid-argument',
        'Contribution Amount must be greater than 0', argumentErrors);

  return payload.accounts;
});

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function getExpirationTime() {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 3);
  return d;
}
