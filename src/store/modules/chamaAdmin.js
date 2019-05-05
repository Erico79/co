import axios from "axios";

import { BASE_URL } from "../../constants";

const SUBMIT_CHAMA_ADMIN_REQUEST = "@chama-app/SUBMIT_CHAMA_ADMIN_REQUEST";
const SUBMIT_CHAMA_ADMIN_SUCCESS = "@chama-app/SUBMIT_CHAMA_ADMIN_SUCCESS";
const SUBMIT_CHAMA_ADMIN_FAILURE = "@chama-app/SUBMIT_CHAMA_ADMIN_FAILURE";
const SUBMIT_CHAMA_ADMIN_ERROR = "@chama-app/SUBMIT_CHAMA_ADMIN_ERROR";
const ALREADY_SUBMITTED = "@chama-app/ALREADY_SUBMITTED";
const OTP_IS_VALID = "@chama-app/OTP_IS_VALID";
const ADMIN_ALREADY_EXISTS = "@chama-app/ADMIN_ALREADY_EXISTS";
const ADMIN_EXISTS = "ADMIN_EXISTS";

const initialState = {
  info: {
    firstName: "Eric",
    lastName: "Murimi",
    email: "emurinyo@gmail.com",
    mobilePhone: "254712883777",
    password: "pass123",
    confirmPassword: "pass123"
  },
  stepSuccess: false,
  isLoading: false,
  errorMessage: "",
  alreadySubmitted: false,
  errors: null,
  otpIsValid: false,
  adminExists: false,
};

const chamaAdminReducer = (state = initialState, action) => {
  switch (action.type) {
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
        errors: null,
        errorMessage: "",
      };

    case SUBMIT_CHAMA_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        error: action.payload.error,
        stepSuccess: false,
      };

    case SUBMIT_CHAMA_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
        stepSuccess: false
      };

    case ALREADY_SUBMITTED:
      return {
        ...state,
        alreadySubmitted: true
      };

    case OTP_IS_VALID:
      return {
        ...state,
        otpIsValid: true
      };

    case ADMIN_ALREADY_EXISTS:
      return {
        ...state,
        adminExists: true,
        isLoading: false,
        info: {
          ...state.info,
          mobilePhone: action.payload.mobilePhone,
        }
      }

    default:
      return state;
  }
};

// action creators
export function submitChamaAdminDetails(adminDetails, group_id) {
  return async dispatch => {
    dispatch({ type: SUBMIT_CHAMA_ADMIN_REQUEST });

    const {
      firstName,
      lastName,
      email,
      mobilePhone,
      password,
      confirmPassword
    } = adminDetails;

    try {
      const response = await axios.post(`${BASE_URL}/register/admin`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: confirmPassword,
        mobile_phone: mobilePhone,
        group_id
      });

      if (response.data.error_code && response.data.error_code === ADMIN_EXISTS) {
        return dispatch({
          type: ADMIN_ALREADY_EXISTS,
          payload: { mobilePhone },
        })
      }

      dispatch({
        type: SUBMIT_CHAMA_ADMIN_SUCCESS,
        payload: {
          data: adminDetails,
          message: "Chama Details have been saved."
        }
      });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        dispatch({
          type: SUBMIT_CHAMA_ADMIN_ERROR,
          payload: {
            errors: e.response.data.errors
          }
        });
      }

      dispatch({
        type: SUBMIT_CHAMA_ADMIN_FAILURE,
        payload: {
          errorMessage:
            "Encountered an error while saving Chama Admin details!",
          error: e
        }
      });
    }
  };
}

export default chamaAdminReducer;
