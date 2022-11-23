import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, getUsersAPI } from "./userAPI";
import { getToken, setToken } from "@/utils/token";
import { RootState } from "@/app/store";
import { MiTableProps } from "../MiTable/MiTable";
export interface UserModel{
  id: number;
  mobile: string;
  avatarUrl: string;
  isAdmin: boolean,
  nickname: string,
  createdAt?: Date,
  updatedAt?: Date
}

export const columns:MiTableProps<UserModel>['columns'] = [
  {
    key: 'id',
    label: 'Id',
    type: 'string'
  },
  {
    key: 'nickname',
    label: '昵称',
    type: 'string'
  },
  {
    key: 'mobile',
    label: '手机号',
    type: 'string'
  }
]

export interface UserState {
  Authorization: string;
  list: Array<UserModel>;
  total: number;
}

const initialState: UserState = {
  Authorization: "",
  list: [],
  total: 0
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

export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async (payload: Parameters<typeof getUsersAPI>[0]) => {
    const res = await getUsersAPI(payload);
    if (res.errCode === 0) {
      return res.data;
    }else{
      throw new Error(res.errMsg)
    }
   
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.Authorization = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.Authorization = action.payload;
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      if(Array.isArray(action?.payload?.list)){
        state.list = action.payload.list;
        state.total = action.payload.amount
      }
    });
  },
});

export const selectAuth = (state: RootState): boolean => {
  return Boolean(state.user.Authorization) || Boolean(getToken().Authorization);
};

export const selectUsers = (state: RootState): Array<UserModel> => {
  return state.user.list
}
export const selectTotal = (state: RootState): number => {
  return state.user.total
}
// export const { login } = userSlice.actions;
export default userSlice.reducer;

export const { logout } = userSlice.actions;
