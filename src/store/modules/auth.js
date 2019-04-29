import axios from 'axios';
import {
  OAUTH_BASE_URL
} from '../../constants';

const GENERATE_ACCESS_TOKEN_REQUEST = "chama-app/GENERATE_ACCESS_TOKEN_REQUEST";
const GENERATE_ACCESS_TOKEN_SUCCESS = "chama-app/GENERATE_ACCESS_TOKEN_SUCCESS";
const GENERATE_ACCESS_TOKEN_FAILURE = "chama-app/GENERATE_ACCESS_TOKEN_FAILURE";

const initialState = {
  isLoading: false,
  accessToken: null,
  expiresIn: null,
  refreshToken: null,
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

export default authReducer;