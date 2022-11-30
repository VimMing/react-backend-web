import MiTable from '../MiTable/MiTable'
import MiSearch, { SearchFormItem } from '../MiTable/MiSearch'
import {
  Model,
  columns,
  getListAsync,
  selectList,
  selectTotal,
} from './friendBirthdaySlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useEffect } from 'react'
export function SearchTable() {
  const rows = useAppSelector(selectList)
  const dispatch = useAppDispatch()
  const total = useAppSelector(selectTotal)
  useEffect(() => {
      dispatch(getListAsync({ page: 1, limit: 20 }))
  }, [dispatch])
  const handleQuery = (searchForm: Array<SearchFormItem>) => {
    dispatch(getListAsync({ page: 1, limit: 20, __searchForm: searchForm }))
  }
  return (
    <>
      <MiSearch<Model> columns={columns} query={handleQuery}></MiSearch>
      <MiTable<Model>
        columns={columns}
        rows={rows}
        total={total}
        tableParamsChange={(page, limit) =>
          dispatch(getListAsync({ page: page, limit: limit }))
        }
      ></MiTable>
    </>
  )
}
