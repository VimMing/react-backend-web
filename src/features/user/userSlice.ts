import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./userAPI";
import { getToken, setToken } from "@/utils/token";
import { RootState } from "@/app/store";
export interface UserState {
  Authorization: string;
}

const initialState: UserState = {
  Authorization: "",
};

export const loginAsync = createAsyncThunk(
  "user/login",
  async (payload: Parameters<typeof loginAPI>[0]) => {
    const res = await loginAPI(payload);
    if (res.errCode === 0) {
      setToken(res.data);
    }
    return res.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.Authorization = action.payload;
    });
  },
});

export const selectAuth = (state: RootState): boolean => {
  return Boolean(state.user.Authorization) || Boolean(getToken().Authorization);
};

// export const { login } = userSlice.actions;
export default userSlice.reducer;
