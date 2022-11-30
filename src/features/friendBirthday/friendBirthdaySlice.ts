import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFriendsAPI } from "./friendBirthdayAPI";
import { RootState } from "@/app/store";
import { MiTableProps } from "../MiTable/MiTable";
export interface Model{
  id: number;
  userId: number;
  name: string;
  birthday: Date;
  isLunar: boolean;
  zodiac: number;
  shareCode?: string;
  solarBirthday?: { year: number; month: number; day: number };
  createdAt?: Date;
  updatedAt?: Date;
}

export const columns:MiTableProps<Model>['columns'] = [
  {
    key: 'id',
    label: '生日Id',
    type: 'string'
  },
  {
    key: 'userId',
    label: '用户Id',
    type: 'string'
  },
  {
    key: 'name',
    label: '朋友',
    type: 'string'
  },
  {
    key: 'shareCode',
    label: '分享码',
    type: 'string'
  },
  {
    key: 'createdAt',
    label: '创建时间',
    type: 'date'
  }
]

export interface FriendBirthday {
  list: Array<Model>;
  total: number;
}

const initialState: FriendBirthday = {
  list: [],
  total: 0
};


export const getListAsync = createAsyncThunk(
  "friendBirthday/getList",
  async (payload: Parameters<typeof getFriendsAPI>[0]) => {
    const res = await getFriendsAPI(payload);
    if (res.errCode === 0) {
      return res.data;
    }else{
      throw new Error(res.errMsg)
    }
   
  }
);

export const friendBirthdaySlice = createSlice({
  name: "friendBirthday",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getListAsync.fulfilled, (state, action) => {
      if(Array.isArray(action?.payload?.list)){
        state.list = action.payload.list;
        state.total = action.payload.amount
      }
    });
  },
});


export const selectList = (state: RootState): Array<Model> => {
  return state.friendBirthday.list
}
export const selectTotal = (state: RootState): number => {
  return state.friendBirthday.total
}

export default friendBirthdaySlice.reducer;
