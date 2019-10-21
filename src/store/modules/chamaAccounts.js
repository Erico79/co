import firebase from '../../initFirebase';

const SUBMIT_CHAMA_ACCOUNTS_REQUEST = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_REQUEST';
const SUBMIT_CHAMA_ACCOUNTS_SUCCESS = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_SUCCESS';
const SUBMIT_CHAMA_ACCOUNTS_FAILURE = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_FAILURE';
const SUBMIT_CHAMA_ACCOUNTS_ERROR = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_ERROR';
const MODIFY_ACCOUNTS = '@chama-app/MODIFY_ACCOUNTS';

const INVALID_ARGUMENT = 'INVALID_ARGUMENT';

const initialState = {
  info: {
    accounts: [
      {},
      // {
      //   name: 'Savings',
      //   contributionAmount: 400,
      // },
      // {
      //   name: 'Account 2',
      //   contributionAmount: 1400,
      // },
      // {
      //   name: 'Fixed',
      //   contributionAmount: 2000,
      // },
      // {
      //   name: 'Account 4',
      //   contributionAmount: 1400,
      // },
      // {
      //   name: 'Account 5',
      //   contributionAmount: 400,
      // }
    ],
  },
  isLoading: false,
  stepSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case MODIFY_ACCOUNTS:
      return {
        ...state,
        info: action.payload
      };

    case SUBMIT_CHAMA_ACCOUNTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    
    case SUBMIT_CHAMA_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload,
        stepSuccess: true,
      };

    case SUBMIT_CHAMA_ACCOUNTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'Encountered an error while submitting Chama Accounts!',
        stepSuccess: false,
      };

    case SUBMIT_CHAMA_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    
    default:
      return state;
  }
};

export const submitChamaAccounts = (accountsInfo, groupId) => async dispatch => {
  dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_REQUEST });

  try {
    const saveGroupAccounts = firebase.functions().httpsCallable('saveGroupAccounts');
    await saveGroupAccounts({ ...accountsInfo, groupId });

    dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_SUCCESS, payload: accountsInfo });
  } catch(e) {
    if (e.code && e.code === INVALID_ARGUMENT) {
      dispatch({ 
        type: SUBMIT_CHAMA_ACCOUNTS_ERROR, 
        payload: e.details
      });
    }

    dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_FAILURE, payload: e });
  }
};

export const addAccount = accounts => async dispatch => {
  accounts.push({});
  dispatch({ type: MODIFY_ACCOUNTS, payload: { accounts }});
};

export const removeAccount = (index, accounts) => async dispatch => {
  accounts.splice(index, 1);

  dispatch({ type: MODIFY_ACCOUNTS, payload: { accounts }});
};

export default reducer;
