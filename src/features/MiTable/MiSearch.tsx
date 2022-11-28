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
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
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
type BasicInputProps = {
  label: string
  value?: string | number
  onChange?: (val: string | number) => void
}

function BasicInput(props: BasicInputProps) {
  const [value, setValue] = useState<string | number>('')
  useEffect(() => {
    if (props.value != null) {
      setValue(props.value)
    }
  }, [props.value])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string)
    props.onChange && props.onChange(event.target.value as string)
  }
  return (
    <TextField
      size="small"
      fullWidth
      value={value}
      label={props.label}
      onChange={handleChange}
      variant="outlined"
    />
  )
}

type MiSearchProps<T> = {
  columns: Columns<T>,
  query?: (forms: Array<SearchFormItem>)=> void,
  ref?: any
}
export type SearchFormItem ={
  fieldValue: string | number
  fieldCode: string
  operator: string
  logic: string
}
export default function MiSearch<T>(props: MiSearchProps<T>) {
  const columnOptions = props.columns.map((i) => ({
    label: i.label,
    value: i.key,
  }))
  const [templateSearchForm, setTemplateSearchForm] = useState<
    Array<SearchFormItem>
  >([
    {
      fieldValue: '',
      fieldCode: columnOptions[0].value as string,
      operator: opts[0].value,
      logic: logics[0].value,
    },
  ])
  useEffect(() => {
    console.log('组件刷新', templateSearchForm)
  })
  const handleChange = (
    index: number,
    field: keyof SearchFormItem,
    value: number | string
  ): void => {
    templateSearchForm[index][field] = value as string
  }
  const addTemplate = (isReset = false) => {
    let template =  {
      fieldValue: '',
      fieldCode: '',
      operator: opts[0].value,
      logic: logics[0].value,
    }
    if(isReset){
      template.fieldCode = columnOptions[0].value as string
      setTemplateSearchForm([template])
    }else{
      setTemplateSearchForm([...templateSearchForm, template])
    }
    return template
  }
  const handleAddTemplate = () => {
    addTemplate()
  }
  const handleReset = () => {
    addTemplate(true)
    props.query && props.query([])
  }
  const handleQuery = () => {
    props.query && props.query(templateSearchForm)
  }
  const handleDeleteTemplate = (i: number) => {
    templateSearchForm.splice(i, 1)
    setTemplateSearchForm([...templateSearchForm])
  }
  return (
    <Box pb={2} pt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          {templateSearchForm.map((template, templateIndex) => {
            return (
              <Stack spacing={1} direction="row" mb={2}>
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
                <BasicInput
                  label="搜索值"
                  value={template.fieldValue}
                  onChange={(val) =>
                    handleChange(templateIndex, 'fieldValue', val)
                  }
                ></BasicInput>
                <LogicSelect
                  value={template.logic}
                  onChange={(val) => handleChange(templateIndex, 'logic', val)}
                ></LogicSelect>
                {templateIndex === 0 && (
                  <IconButton
                    onClick={handleAddTemplate}
                    aria-label="add"
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                )}
                {templateIndex !== 0 && (
                  <IconButton
                    onClick={() => handleDeleteTemplate(templateIndex)}
                    aria-label="delete"
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Stack>
            )
          })}
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleQuery}>查询</Button>
            <Button variant="outlined" onClick={handleReset}>重置</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
