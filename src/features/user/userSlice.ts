import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAPI } from "./userAPI";
export interface UserState {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      loginAPI({
        username: action.payload.email,
        password: action.payload.password,
      }).then((res) => {
        console.log(res);
        state.email = action.payload.email;
        state.password = action.payload.password;
      });
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
