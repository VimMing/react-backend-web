import { UsersTable } from '@/features/user/User'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { removeToken } from '@/utils/token'
export default function UserList() {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={removeToken}>测试权限判断</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <UsersTable></UsersTable>
    </>
  )
}
