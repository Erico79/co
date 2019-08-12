import * as admin from 'firebase-admin';

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chama-online-d992e.firebaseio.com"
});

export default admin;
