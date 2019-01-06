import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Authorization': "Bearer " + ACCESS_TOKEN
    }
  });

export default instance;