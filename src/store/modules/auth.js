import axios from 'axios';
import { BASE_URL } from '../../constants';

const GENERATE_ACCESS_TOKEN_REQUEST = "chama-app/GENERATE_ACCESS_TOKEN_REQUEST";
const GENERATE_ACCESS_TOKEN_SUCCESS = "chama-app/GENERATE_ACCESS_TOKEN_SUCCESS";
const GENERATE_ACCESS_TOKEN_FAILURE = "chama-app/GENERATE_ACCESS_TOKEN_FAILURE";

const initialState = {
  isLoading: false,
};

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
        isLoading: true,
      }

    default:
      return state;
  }
};

// action creators
export const generateAccessToken = (username, password) => async dispatch => {
  dispatch({ type: GENERATE_ACCESS_TOKEN_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/oauth/token`, {
      username,
      password,
    });

    dispatch({ 
      type: GENERATE_ACCESS_TOKEN_SUCCESS, 
      payload: response.data,
    });
  } catch(e) {

  }
}

export default authReducer;
