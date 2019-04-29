import axios from 'axios';

import { BASE_URL } from '../../constants';

const SUBMIT_CHAMA_DETAILS_REQUEST = "chama-app/SUBMIT_CHAMA_DETAILS_REQUEST";
const SUBMIT_CHAMA_DETAILS_SUCCESS = "chama-app/SUBMIT_CHAMA_DETAILS_SUCCESS";
const SUBMIT_CHAMA_DETAILS_FAILURE = "chama-app/SUBMIT_CHAMA_DETAILS_FAILURE";
const SUBMIT_CHAMA_DETAILS_ERROR = "chama-app/SUBMIT_CHAMA_DETAILS_ERROR";
const ALREADY_SUBMITTED = "chama-app/ALREADY_SUBMITTED";

const initialState = {
  isLoading: false,
  errorMessage: "",
  info: {
    // chamaName: 'Inuka Youth Group',
    // noOfMembers: 3
  },
  stepSuccess: false,
  alreadySubmitted: false,
  group: null,
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
        info: action.payload.data,
        message: action.payload.message,
        stepSuccess: true,
        group: action.payload.group,
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
        errors: {},
      };

    case SUBMIT_CHAMA_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
        stepSuccess: false,
      };

    case ALREADY_SUBMITTED:
      return {
        ...state,
        alreadySubmitted: true
      };

    default:
      return state;
  }
};

// action creators
export function submitChamaDetails(chamaDetails, group_id) {
  return async (dispatch) => {
    dispatch({ type: SUBMIT_CHAMA_DETAILS_REQUEST });

    try {
      const { chamaName, noOfMembers } = chamaDetails;
      const response = await axios.post(`${BASE_URL}/register/group`, {
        name: chamaName,
        no_of_members: noOfMembers,
        group_id,
      });

      if (response.data.success) {
        dispatch({
          type: SUBMIT_CHAMA_DETAILS_SUCCESS,
          payload: {
            data: chamaDetails,
            message: "Chama Details have been saved.",
            group: response.data.group,
          }
        });
      } else {
        dispatch({
          type: SUBMIT_CHAMA_DETAILS_ERROR,
          payload: {
            errors: response.data.errors,
          }
        });
      }
    } catch (e) {
      dispatch({
        type: SUBMIT_CHAMA_DETAILS_FAILURE,
        payload: {
          errorMessage: "Encountered an error while saving chama details!",
          error: e
        }
      });
    }
  };
}

export function alreadySubmitted() {
  return dispatch => {
    dispatch({ type: ALREADY_SUBMITTED });
  };
}

export default chamaDetailsReducer;
