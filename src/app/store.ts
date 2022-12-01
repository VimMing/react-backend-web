import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import friendBirthdayReducer from "@/features/friendBirthday/friendBirthdaySlice";
import wxSubscriptionReducer from "@/features/wxSubscription/wxSubscriptionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    friendBirthday: friendBirthdayReducer,
    wxSubscription: wxSubscriptionReducer
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
