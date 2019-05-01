import axios from 'axios';
import tokenAxios from '../../axios';
import {
  OAUTH_BASE_URL
} from '../../constants';

const GENERATE_ACCESS_TOKEN_REQUEST = "@chama-app/GENERATE_ACCESS_TOKEN_REQUEST";
const GENERATE_ACCESS_TOKEN_SUCCESS = "@chama-app/GENERATE_ACCESS_TOKEN_SUCCESS";
const GENERATE_ACCESS_TOKEN_FAILURE = "@chama-app/GENERATE_ACCESS_TOKEN_FAILURE";
const VALIDATE_OTP_REQUEST = '@chama-app/VALIDATE_OTP_REQUEST';
const VALIDATE_OTP_SUCCESS = '@chama-app/VALIDATE_OTP_SUCCESS';
const VALIDATE_OTP_FAILURE = '@chama-app/VALIDATE_OTP_FAILURE';

const OTP_EXPIRED = 'OTP_EXPIRED';
const OTP_IS_VALID = 'OTP_IS_VALID';

const initialState = {
  isLoading: false,
  accessToken: null,
  expiresIn: null,
  refreshToken: null,
  otp: {
    validating: false,
    valid: false,
    errorMessage: null,
    retries: null,
  },
};

const {
  REACT_APP_CLIENT_ID: client_id,
  REACT_APP_CLIENT_SECRET: client_secret
} = process.env;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case GENERATE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.access_token,
        expiresIn: action.payload.expires_in,
        refreshToken: action.payload.refresh_token,
      }
      
    case GENERATE_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        error: action.payload.error,
      }

    case VALIDATE_OTP_REQUEST:
      return {
        ...state,
        otp: {
          ...state.otp,
          validating: true,
        },
      }

    case VALIDATE_OTP_SUCCESS:
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
          retries: action.payload.retries,
        }

      }

    default:
      return state;
  }
};

// action creators
export const generateAccessToken = (username, password) => async dispatch => {
  dispatch({
    type: GENERATE_ACCESS_TOKEN_REQUEST
  });

  try {
    const response = await axios.post(`${OAUTH_BASE_URL}/oauth/token`, {
      username,
      password,
      client_id: parseInt(client_id),
      client_secret,
      grant_type: "password",
    });

    dispatch({
      type: GENERATE_ACCESS_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GENERATE_ACCESS_TOKEN_FAILURE,
      payload: {
        errorMessage: 'Encountered an error while generating access token',
        error: e
      }
    });
  }
}

export const validateOTP = (otp, token) => async dispatch => {
  dispatch({ type: VALIDATE_OTP_REQUEST });

  try {
    const response = await tokenAxios(token).post('/validate/otp', { otp });

    const { otp_status_code: otpStatus, retries } = response.data;

    switch(otpStatus) {
      case OTP_IS_VALID:
        dispatch({
          type: VALIDATE_OTP_SUCCESS,
          payload: { validOTP: true },
        });
        break;

      case OTP_EXPIRED:
        dispatch({ 
          type: VALIDATE_OTP_FAILURE,
          payload: { 
            errorMessage: 'OTP has expired',
            retries,
          },
        });
        break;

      default:
        break;
    }
      
  } catch(e) {
    dispatch({
      type: VALIDATE_OTP_FAILURE,
      payload: {
        errorMessage: 'Invalid OTP',
        error: e,
        retries: e.response.data.retries,
      },
    });
  }
}

export default authReducer;