import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useNavigate, useMatch } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import CakeIcon from '@mui/icons-material/Cake'
import MessageIcon from '@mui/icons-material/Message';

export const MainListItems = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <ListItemButton
        selected={!!useMatch('/user-list')}
        onClick={() => navigate('/user-list')}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="微信用户" />
      </ListItemButton>
      <ListItemButton
        selected={!!useMatch('/friend-birthday')}
        onClick={() => navigate('/friend-birthday')}
      >
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText primary="朋友生日" />
      </ListItemButton>{' '}
      <ListItemButton
        selected={!!useMatch('/wx-subscription')}
        onClick={() => navigate('/wx-subscription')}
      >
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="消息订阅" />
      </ListItemButton>
    </React.Fragment>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
)
