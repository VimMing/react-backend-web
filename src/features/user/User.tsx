import MiTable from "../MiTable/MiTable";
import { UserModel, columns, getUsersAsync, selectUsers, selectTotal } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useRef } from "react";
export function UsersTable() {
  const rows = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const mounted = useRef(false)
  const total = useAppSelector(selectTotal)
  useEffect(() => {
    if(mounted.current === false){
      dispatch(getUsersAsync({ page: 1, limit: 20 }))
      mounted.current = true
    }
  })
  return (
    <MiTable<UserModel>
      columns={columns}
      rows={rows}
      total={total}
      tableParamsChange={(page, limit) =>
        dispatch(getUsersAsync({ page: page, limit: limit }))
      }></MiTable>
  );
}
