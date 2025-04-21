import React from 'react'
import PropTypes from 'prop-types'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'
import { BrowserView, MobileView } from 'react-device-detect'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'

import MenuList from './MenuList'

// redux
import { drawerWidth } from '@store/constant'

// services
import AuthService from '@services/AuthService'

const index = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme()
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const drawer = (
    <>
      <BrowserView>
        {/* <PerfectScrollbar
          component='div'
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '5px',
            paddingRight: '5px'
          }}
        >
          <MenuList />
        </PerfectScrollbar> */}
        <MenuList />
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  )

  const container =
    window !== undefined ? () => window.document.body : undefined

  // const pathname = useLocation().pathname

  const handleLogout = () => {
    AuthService.logout()
  }

  return (
    <>
      <Box
        component='nav'
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor='left'
          open={drawerOpen}
          onClose={drawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              color: '#FFFFFF', // color de la fecha
              borderRight: 'none',
              boxShadow: '5px 0 5px -2px #888',
              bgcolor: '#9b0000', // fondo del sidebar, drawer
              [theme.breakpoints.up('md')]: {
                top: '53px'
              }
            }
          }}
          ModalProps={{ keepMounted: true }}
          color='inherit'
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

index.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
}


export default index
