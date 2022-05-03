import axios from "axios";
export function loginAPI(payload: {
  username: string;
  password: string;
}): Promise<any> {
  return axios.post(
    "https://birthday.codehub.store/api/user/use-password/login",
    payload
  );
}
