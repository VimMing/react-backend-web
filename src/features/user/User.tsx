import MiTable from "../MiTable/MiTable";
import { UserModel, columns, getUsersAsync, selectUsers } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function UsersTable() {
  const rows = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  return (
    <MiTable<UserModel>
      columns={columns}
      rows={rows}
      tableParamsChange={(page, limit) =>
        dispatch(getUsersAsync({ page: page, limit: limit }))
      }></MiTable>
  );
}
