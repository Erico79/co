import axios from 'axios';

import { BASE_URL } from '../../constants';

const SUBMIT_CHAMA_ADMIN_REQUEST = 'chama-app/SUBMIT_CHAMA_ADMIN_REQUEST';
const SUBMIT_CHAMA_ADMIN_SUCCESS = 'chama-app/SUBMIT_CHAMA_ADMIN_SUCCESS';
const SUBMIT_CHAMA_ADMIN_FAILURE = 'chama-app/SUBMIT_CHAMA_ADMIN_FAILURE';
const SUBMIT_CHAMA_ADMIN_ERROR = 'chama-app/SUBMIT_CHAMA_ADMIN_ERROR';
const ALREADY_SUBMITTED = 'chama-app/ALREADY_SUBMITTED';
const OTP_REQUEST = 'chama-app/OTP_REQUEST';
const OTP_IS_VALID = 'chama-app/OTP_IS_VALID';
const OTP_IS_INVALID = 'chama-app/OTP_IS_INVALID';
const OTP_REQUEST_FAILURE = 'chama-app/OTP_REQUEST_FAILURE';

const initialState = {
    info: {
        firstName: 'Eric',
        lastName: 'Murimi',
        email: 'emurinyo@gmail.com',
        mobilePhone: '254712883777',
        password: 'pass123',
        confirmPassword: 'pass123',
    },
    stepSuccess: false,
    isLoading: false,
    errorMessage: '',
    alreadySubmitted: false,
    errors: {},
    otpIsValid: false,
};

const chamaAdminReducer = (state = initialState, action) => {
    switch(action.type) {
        case SUBMIT_CHAMA_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case SUBMIT_CHAMA_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload.data,
        message: action.payload.message,
        stepSuccess: true,
        alreadySubmitted: false,
        errors: {},
        errorMessage: ''
      };

    case SUBMIT_CHAMA_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        error: action.payload.error,
        stepSuccess: false,
        errors: {},
      };

    case SUBMIT_CHAMA_ADMIN_ERROR:
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

    case OTP_IS_VALID:
      return {
        ...state,
        otpIsValid: true,
      }

    default:
      return state;
    }
}

// action creators
export function submitChamaAdminDetails(adminDetails) {
    return async dispatch => {
        dispatch({ type: SUBMIT_CHAMA_ADMIN_REQUEST });

        try {
            const response = axios.post(`${BASE_URL}/register/admin`, { 
              ...adminDetails,
              password_confirmation: adminDetails.confirmPassword,
            });

            if (response.success) {
                dispatch({
                    type: SUBMIT_CHAMA_ADMIN_SUCCESS,
                    payload: {
                        data: adminDetails,
                        message: "Chama Details have been saved.",
                    }
                })
            } else {
                dispatch({
                    type: SUBMIT_CHAMA_ADMIN_ERROR,
                    payload: {
                        errors: response.data.errors
                    }
                })
            }
        } catch(e) {
            dispatch({
                type: SUBMIT_CHAMA_ADMIN_FAILURE,
                payload: {
                    errorMessage: "Encountered an error while saving Chama Admin details!",
                    error: e
                }
            })
        }
    }
}

export default chamaAdminReducer;