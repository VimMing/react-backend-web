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
  // const mounted = useRef(false)
  const searchRef = useRef()
  const total = useAppSelector(selectTotal)
  useEffect(() => {
    // if (mounted.current === false) {
      dispatch(getUsersAsync({ page: 1, limit: 20 }))
      console.log(searchRef)
      // mounted.current = true
    // }
  }, [dispatch])
  const handleQuery = (searchForm: Array<SearchFormItem>) => {
    dispatch(getUsersAsync({ page: 1, limit: 20, __searchForm: searchForm }))
  }
  return (
    <>
      <MiSearch<UserModel> ref={searchRef} columns={columns} query={handleQuery}></MiSearch>
      <MiTable<UserModel>
        columns={columns}
        rows={rows}
        total={total}
        tableParamsChange={(page, limit) =>
          dispatch(getUsersAsync({ page: page, limit: limit }))
        }
      ></MiTable>
    </>
  )
}
