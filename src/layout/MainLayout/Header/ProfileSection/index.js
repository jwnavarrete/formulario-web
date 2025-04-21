import { useState, useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from '@components/ui/cards/MainCard'
import Transitions from '@components/ui/extended/Transitions'
import User1 from '@assets/images/avatar.png'

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons'

import authService from '@services/AuthService.js'

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme()
  const customization = useSelector((state) => state.customization)
  const navigate = useNavigate()

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  /**
    * anchorRef is used on different componets and specifying one type leads to other components throwing an error
    * */
  const anchorRef = useRef(null)
  const handleLogout = async (event) => {
    authService.logOut()
    navigate('/auth/login')
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index)
    handleClose(event)

    if (route && route !== '') {
      navigate(route)
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center'
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            color='inherit'
          />
        }
        label={<IconSettings stroke={1.5} size='1.5rem' color={theme.palette?.primary?.light} />}
        variant='outlined'
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='primary'
      />
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <List
                        component='nav'
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0, '/account')}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size='1.3rem' />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography variant='body2'>Cuenta</Typography>}
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, '/profile')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size='1.3rem' />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography variant='body2'>Perfil</Typography>}
                          />
                        </ListItemButton> */}
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 2}
                          onClick={(event) => handleLogout(event)}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size='1.5rem' />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography variant='#ffffff'>{'Cerrar Sesión'}</Typography>}
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

export default ProfileSection
