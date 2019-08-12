import firebase from 'firebase';

const VALIDATE_OTP_REQUEST = '@chama-app/VALIDATE_OTP_REQUEST';
const VALIDATE_OTP_FAILURE = '@chama-app/VALIDATE_OTP_FAILURE';
const SEND_OTP_REQUEST = '@chama-app/SEND_OTP_REQUEST';
const SEND_OTP_SUCCESS = '@chama-app/SEND_OTP_SUCCESS';
const SEND_OTP_FAILURE = '@chama-app/SEND_OTP_FAILURE';
const OTP_IS_VALID = 'OTP_IS_VALID';

const initialState = {
  isLoading: false,
  otp: {
    validating: false,
    valid: false,
    errorMessage: null,
    retries: null,
    sending: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_OTP_REQUEST:
      return {
        ...state,
        otp: {
          ...state.otp,
          validating: true,
          errorMessage: null,
        },
      }

    case OTP_IS_VALID:
      return {
        ...state,
        otp: {
          ...state.otp,
          validating: false,
          valid: true,
          errorMessage: null,
        },
      }

    case VALIDATE_OTP_FAILURE:
      return {
        ...state,
        otp: {
          ...state.otp,
          valid: false,
          validating: false,
          errorMessage: action.payload.errorMessage,
        }
      }

    case SEND_OTP_REQUEST:
      return {
        ...state,
        otp: {
          ...state.otp,
          sending: true,
          errorMessage: null,
        }
      }

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        otp: {
          ...state.otp,
          sending: false,
          errorMessage: null,
        }
      }

    case SEND_OTP_FAILURE:
      return {
        ...state,
        otp: {
          ...state.otp,
          sending: false,
          errorMessage: action.payload.errorMessage,
        }
      }

    default:
      return state;
  }
};

// action creators
export const sendOTP = mobilePhone => async dispatch => {
  dispatch({ type: SEND_OTP_REQUEST });
  
  try {
    const sendOTP = firebase.functions().httpsCallable('sendOTP');
    await sendOTP({ mobilePhone });

    dispatch({ type: SEND_OTP_SUCCESS });
  } catch(e) {
    dispatch({ 
      type: SEND_OTP_FAILURE, 
      payload: {
        errorMessage: 'Encountered an error while sending code',
      }
    });
  }
}

export const validateOTP = (otp, mobilePhone) => async dispatch => {
  dispatch({ type: VALIDATE_OTP_REQUEST });

  try {
    const validateOTP = firebase.functions().httpsCallable('validateOTP');
    await validateOTP({ otp, mobilePhone });

    dispatch({ type: OTP_IS_VALID });
  } catch(e) {
    if (e.details)
      return dispatch({ type: VALIDATE_OTP_FAILURE, payload:{ errorMessage: e.message } });

    dispatch({
      type: VALIDATE_OTP_FAILURE,
      payload: {
        errorMessage: 'Invalid OTP',
        error: e,
      },
    });
  }
}

export default authReducer;