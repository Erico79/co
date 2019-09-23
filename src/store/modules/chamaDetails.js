import firebase from '../../initFirebase';

const SUBMIT_CHAMA_DETAILS_REQUEST = "chama-app/SUBMIT_CHAMA_DETAILS_REQUEST";
const SUBMIT_CHAMA_DETAILS_SUCCESS = "chama-app/SUBMIT_CHAMA_DETAILS_SUCCESS";
const SUBMIT_CHAMA_DETAILS_FAILURE = "chama-app/SUBMIT_CHAMA_DETAILS_FAILURE";
const SUBMIT_CHAMA_DETAILS_ERROR = "chama-app/SUBMIT_CHAMA_DETAILS_ERROR";
const ALREADY_SUBMITTED = "chama-app/ALREADY_SUBMITTED";
const SET_GROUP_ID = "chama-app/SET_GROUP_ID";
const ADMIN_EXISTS = "already-exists";

const initialState = {
  isLoading: false,
  errorMessage: "",
  info: {
    chamaName: 'Inuka Youth Group',
    noOfMembers: 3
  },
  stepSuccess: false,
  alreadySubmitted: false,
  groupId: null,
  errors: {},
};

const chamaDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CHAMA_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SUBMIT_CHAMA_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload,
        stepSuccess: true,
        alreadySubmitted: false,
        errors: {},
        errorMessage: ''
      };

    case SUBMIT_CHAMA_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        error: action.payload.error,
        stepSuccess: false,
      };

    case SUBMIT_CHAMA_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
        stepSuccess: false,
      };

    case ALREADY_SUBMITTED:
      return {
        ...state,
        alreadySubmitted: true
      };

    case SET_GROUP_ID:
      return {
        ...state,
        groupId: action.payload.groupId,
      };

    default:
      return state;
  }
};

// action creators
export const checkIfChamaExists = (chamaDetails) => async dispatch => {
  dispatch({ type: SUBMIT_CHAMA_DETAILS_REQUEST });

  try {
    const dedupGroup = firebase.functions().httpsCallable('dedupGroup');
    await dedupGroup(chamaDetails);

    dispatch({
      type: SUBMIT_CHAMA_DETAILS_SUCCESS,
      payload: {
        ...chamaDetails,
      },
    });
  } catch(e) {
    if (e.code && e.code === ADMIN_EXISTS) {
      dispatch({ 
        type: SUBMIT_CHAMA_DETAILS_ERROR, 
        payload: {
          chamaName: "A Chama with the same name already exists",
        }
      });
    }

    dispatch({
      type: SUBMIT_CHAMA_DETAILS_FAILURE,
      payload: {
        errorMessage: "Encountered an error while saving chama details!",
        error: e
      }
    });
  }
};

export const setGroupId = groupId => async dispatch => {
  dispatch({ type: SET_GROUP_ID, payload: { groupId }})
};

export function alreadySubmitted() {
  return dispatch => {
    dispatch({ type: ALREADY_SUBMITTED });
  };
}

export default chamaDetailsReducer;
