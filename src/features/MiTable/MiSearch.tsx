import { Box, Grid, Stack, Button } from '@mui/material'
import { Columns } from './MiTable'
type MiSearchProps<T> = {
  columns: Columns<T>
}
export default function MiSearch<T>(props: MiSearchProps<T>) {
  return (
    <Box pb={2}>
      <Grid container>
        <Grid xs={12} md={10}></Grid>
        <Grid xs={12} md={2}>
          <Stack spacing={2} direction="row">
            <Button variant="contained">
              查询
            </Button>
            <Button variant="outlined">重置</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
