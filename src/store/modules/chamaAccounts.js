import axios from '../../axios';

const SUBMIT_CHAMA_ACCOUNTS_REQUEST = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_REQUEST';
const SUBMIT_CHAMA_ACCOUNTS_SUCCESS = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_SUCCESS';
const SUBMIT_CHAMA_ACCOUNTS_FAILURE = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_FAILURE';
const SUBMIT_CHAMA_ACCOUNTS_ERROR = '@chama-app/SUBMIT_CHAMA_ACCOUNTS_ERROR';

const initialState = {
  info: {
    accounts: [],
  },
  isLoading: false,
  stepSuccess: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SUBMIT_CHAMA_ACCOUNTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    
    case SUBMIT_CHAMA_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload,
        stepSuccess: true,
      }

    case SUBMIT_CHAMA_ACCOUNTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'Encountered an error while submitting Chama Accounts!',
        stepSuccess: false,
      }

    case SUBMIT_CHAMA_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      }
    
    default:
      return state;
  }
};

export const submitChamaAccounts = (accountsInfo, group_id, token) => async dispatch => {
  dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_REQUEST });

  try {
    const response = await axios(token).post(`/register/accounts/${group_id}`, accountsInfo);

    dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_SUCCESS, payload: response.data });
  } catch(e) {
    if (e.response && e.response.data && e.response.data.errors)
      dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_ERROR, payload: e.response.data.errors })

    dispatch({ type: SUBMIT_CHAMA_ACCOUNTS_FAILURE, payload: e });
  }
}

export default reducer;