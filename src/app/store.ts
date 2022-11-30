import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import friendBirthdayReducer from "@/features/friendBirthday/friendBirthdaySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    friendBirthday: friendBirthdayReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
