import {
  Box,
  Grid,
  Stack,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Columns } from './MiTable'

const logics = [
  {
    value: 'AND',
    label: '并且',
  },
  {
    value: 'OR',
    label: '或者',
  },
]
function LogicSelect() {
  return (<BasicSelect label='逻辑' options={logics}></BasicSelect>)
}
const opts = [
  {
    value: 'contain',
    label: '包含',
  },
  {
    value: 'eq',
    label: '等于',
  },
  {
    value: 'neq',
    label: '不等于',
  },
  {
    value: 'gt',
    label: '大于',
  },
  {
    value: 'lt',
    label: '小于',
  },
  {
    value: 'gte',
    label: '大于等于',
  },
  {
    value: 'lte',
    label: '小于等于',
  },
]
function OperatorSelect() {
  return (<BasicSelect label='操作符' options={opts}></BasicSelect>)
}

type BasicSelectProps = {
  label: string,
  value?: string,
  options: Array<{value: string | number, label: string | number}>
}

function BasicSelect(props:BasicSelectProps){
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    if(props.value != null){
      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={value}
        label={props.label}
        onChange={handleChange}
      >
        {props.options.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}


type MiSearchProps<T> = {
  columns: Columns<T>
}
export default function MiSearch<T>(props: MiSearchProps<T>) {
  let x: { b?: string; a?: number } = { b: 'hello world', a: 1 }
  const [templateSearchForm, setTemplateSearchForm] = useState(x)
  useEffect(() => {
    console.log('Mi Search', props.columns)
    console.log(templateSearchForm)
  })
  const columnOptions = props.columns.map(i => ({label: i.label, value: i.key}))
  return (
    <Box pb={2} pt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Stack spacing={1} direction="row">
            <BasicSelect label="搜索列" options={columnOptions}></BasicSelect>
            <OperatorSelect></OperatorSelect>
            <TextField
              size="small"
              fullWidth
              label="搜索值"
              variant="outlined"
            />
            <LogicSelect></LogicSelect>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => setTemplateSearchForm({ a: Math.random() })}
            >
              查询
            </Button>
            <Button variant="outlined">重置</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
