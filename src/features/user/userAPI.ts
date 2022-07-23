import axios from "axios";
import {appendToken, tokenIsValid} from '@/utils/token'

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

API.interceptors.request.use(
  appendToken,
  error => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    const response = error.response;
    if (response) {
      const status = response.status;
      tokenIsValid(status)
    }
    return Promise.reject(error);
  }
);

export function loginAPI(payload: {
  username: string;
  password: string;
}): Promise<{data: string, errCode: number}> {
  return API.post(
    "/user/use-password/login",
    payload
  );
}
