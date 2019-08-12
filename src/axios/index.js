import axios from "axios";
import { BASE_URL } from '../constants';

const instance = (accessToken) => axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Authorization': accessToken ? `Bearer ${accessToken}` : undefined
    }
  });

export default instance;