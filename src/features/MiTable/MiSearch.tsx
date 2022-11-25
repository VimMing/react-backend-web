import {
  Box,
  Grid,
  Stack,
  Button,
  FormControl,
  MenuItem,
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
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event)
    setAge(event.target.value as string)
  }
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="logic-select-label">Age</InputLabel>
      <Select
        labelId="logic-select-label"
        id="logic-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
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
type MiSearchProps<T> = {
  columns: Columns<T>
}
export default function MiSearch<T>(props: MiSearchProps<T>) {
  let x: { b?: string; a?: number } = { b: 'hello world', a: 1 }
  const [templateSearchForm, setTemplateSearchForm] = useState(x)
  useEffect(() => {
    console.log('Mi Search')
    console.log(templateSearchForm)
  })
  return (
    <Box pb={2} pt={2}>
      <Grid container>
        <Grid xs={12} md={10}>
        <Stack spacing={1} direction="row">
          <LogicSelect></LogicSelect> 
          <LogicSelect></LogicSelect> 
        </Stack>
        </Grid>
        <Grid xs={12} md={2}>
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
