import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListAPI } from "./wxSubscriptionAPI";
import { RootState } from "@/app/store";
import { MiTableProps } from "../MiTable/MiTable";
export interface Model{
  id: number;
  userId: number;
  name: string;
  when: Date;
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
    label: '类型',
    type: 'string'
  },
  {
    key: 'when',
    label: '推送时间',
    type: 'string'
  },
  {
    key: 'createdAt',
    label: '创建时间',
    type: 'date'
  }
]

export interface WxSubscription {
  list: Array<Model>;
  total: number;
}

const initialState: WxSubscription = {
  list: [],
  total: 0
};


export const getListAsync = createAsyncThunk(
  "wxSubscription/getList",
  async (payload: Parameters<typeof getListAPI>[0]) => {
    const res = await getListAPI(payload);
    if (res.errCode === 0) {
      return res.data;
    }else{
      throw new Error(res.errMsg)
    }
   
  }
);

export const wxSubscriptionSlice = createSlice({
  name: "wxSubscription",
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
  return state.wxSubscription.list
}
export const selectTotal = (state: RootState): number => {
  return state.wxSubscription.total
}

export default wxSubscriptionSlice.reducer;
