import { AxiosRequestConfig } from "axios";

const TOKEN_KEY = "TOKEN_KEY";

export function getToken():{Authorization?: string} {
  const data = localStorage.getItem(TOKEN_KEY);
  return data ? JSON.parse(data) : {};
}

export function appendToken(config: AxiosRequestConfig) {
  let res = { ...config };
  Object.assign(res.headers, getToken());
  return res;
}

export function setToken(token: string) {
  const data = {
    Authorization: `${token}`,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function tokenIsValid(status: number) {
  if (status === 401) {
    // 退出登录
    removeToken()
  }
}
