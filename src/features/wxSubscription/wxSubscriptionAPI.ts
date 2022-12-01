import axios from "axios";
import {appendToken, tokenIsValid} from '@/utils/token'
import { Model } from "./wxSubscriptionSlice";
import { SearchFormItem } from "../MiTable/MiSearch";
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


export function getListAPI(payload: {
  page: number;
  limit: number;
  __searchForm?: Array<SearchFormItem>
}): Promise<{data: {list: Array<Model>, amount: number}, errCode: number, errMsg: string}> {
  return API.post(
    "/admin/wxSubscription/list",
    payload
  );
}
