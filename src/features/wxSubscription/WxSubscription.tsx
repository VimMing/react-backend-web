import MiTable from '../MiTable/MiTable'
import MiSearch, { SearchFormItem } from '../MiTable/MiSearch'
import {
  Model,
  columns,
  getListAsync,
  selectList,
  selectTotal,
} from './wxSubscriptionSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useEffect, useState } from 'react'
export function SearchTable() {
  const rows = useAppSelector(selectList)
  const dispatch = useAppDispatch()
  const total = useAppSelector(selectTotal)
  const [searchForm, setSearchForm] = useState<Array<SearchFormItem>>([])
  useEffect(() => {
      dispatch(getListAsync({ page: 1, limit: 20 }))
  }, [dispatch])
  const handleQuery = (searchForm: Array<SearchFormItem>) => {
    dispatch(getListAsync({ page: 1, limit: 20, __searchForm: searchForm }))
    setSearchForm(searchForm)
  }
  return (
    <>
      <MiSearch<Model> columns={columns} query={handleQuery}></MiSearch>
      <MiTable<Model>
        columns={columns}
        rows={rows}
        total={total}
        tableParamsChange={(page, limit) =>
          dispatch(getListAsync({ page: page, limit: limit, __searchForm: searchForm }))
        }
      ></MiTable>
    </>
  )
}
