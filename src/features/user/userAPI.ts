import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

export function loginAPI(payload: {
  username: string;
  password: string;
}): Promise<any> {
  return API.post(
    "/user/use-password/login",
    payload
  );
}
