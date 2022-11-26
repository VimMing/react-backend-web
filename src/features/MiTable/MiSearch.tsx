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
function LogicSelect(props: Omit<BasicSelectProps, 'label' | 'options'>) {
  return <BasicSelect label="逻辑" options={logics} {...props}></BasicSelect>
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
function OperatorSelect(props: Omit<BasicSelectProps, 'label' | 'options'>) {
  return <BasicSelect label="操作符" options={opts} {...props}></BasicSelect>
}

type BasicSelectProps = {
  label: string
  value?: string
  onChange?: (val: string | number) => void
  options: Array<{ value: string | number; label: string | number }>
}

function BasicSelect(props: BasicSelectProps) {
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    if (props.value != null) {
      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
    props.onChange && props.onChange(event.target.value as string)
  }
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select value={value} label={props.label} onChange={handleChange}>
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
  const [templateSearchForm, setTemplateSearchForm] = useState<
    Array<{
      fieldValue: string | number
      fieldCode: string
      operator: string
      logic: string
    }>
  >([])
  const columnOptions = props.columns.map((i) => ({
    label: i.label,
    value: i.key,
  }))
  useEffect(() => {
    console.log('Mi Search', props.columns)
    console.log(templateSearchForm)
    setTemplateSearchForm([
      {
        fieldValue: '',
        fieldCode: columnOptions[0].value as string,
        operator: opts[0].value,
        logic: logics[0].value,
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.columns.length])
  useEffect(() => {
    console.log('组件刷新', templateSearchForm);
  })
  const handleChange = (
    index: number,
    field: 'fieldValue' | 'fieldCode' | 'operator' | 'logic',
    value: number | string
  ): void => {
    // console.log(templateSearchForm)
    templateSearchForm[index][field] = value as any
    console.log(templateSearchForm)
    setTemplateSearchForm([...templateSearchForm])
  }
  return (
    <Box pb={2} pt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          {templateSearchForm.map((template, templateIndex) => {
            return (
              <Stack spacing={1} direction="row">
                <BasicSelect
                  label="搜索列"
                  options={columnOptions}
                  value={template.fieldCode}
                  onChange={(val) =>
                    handleChange(templateIndex, 'fieldCode', val)
                  }
                ></BasicSelect>
                <OperatorSelect
                  value={template.operator}
                  onChange={(val) =>
                    handleChange(templateIndex, 'operator', val)
                  }
                ></OperatorSelect>
                <TextField
                  size="small"
                  fullWidth
                  label="搜索值"
                  value={template.fieldValue}
                  onChange={event => handleChange(templateIndex, 'fieldValue', event.target.value as string)}
                  variant="outlined"
                />
                <LogicSelect
                  value={template.logic}
                  onChange={(val) =>
                    handleChange(templateIndex, 'logic', val)
                  }
                ></LogicSelect>
              </Stack>
            )
          })}
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack spacing={2} direction="row">
            <Button variant="contained">查询</Button>
            <Button variant="outlined">重置</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
