import axios from "axios";
import {appendToken, tokenIsValid} from '@/utils/token'
import { UserModel } from "./userSlice";
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

export function getUsersAPI(payload: {
  page: number;
  limit: number;
}): Promise<{data: Array<UserModel>, errCode: number, errMsg: string}> {
  return API.post(
    "/admin/user/list",
    payload
  );
}
