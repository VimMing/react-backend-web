import MiTable from '../MiTable/MiTable'
import MiSearch, { SearchFormItem } from '../MiTable/MiSearch'
import {
  UserModel,
  columns,
  getUsersAsync,
  selectUsers,
  selectTotal,
} from './userSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useEffect, useRef } from 'react'
export function UsersTable() {
  const rows = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()
  const searchForm = useRef<Array<SearchFormItem>>([])
  const total = useAppSelector(selectTotal)
  useEffect(() => {
      dispatch(getUsersAsync({ page: 1, limit: 20 }))
  }, [dispatch])
  const handleQuery = (searchFormInput: Array<SearchFormItem>) => {
    searchForm.current = searchFormInput
    dispatch(getUsersAsync({ page: 1, limit: 20, __searchForm: searchFormInput }))
  }
  return (
    <>
      <MiSearch<UserModel>  columns={columns} query={handleQuery}></MiSearch>
      <MiTable<UserModel>
        columns={columns}
        rows={rows}
        total={total}
        tableParamsChange={(page, limit) =>
          dispatch(getUsersAsync({ page: page, limit: limit, __searchForm: searchForm.current }))
        }
      ></MiTable>
    </>
  )
}
