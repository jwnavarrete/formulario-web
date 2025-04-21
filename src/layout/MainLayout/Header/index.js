import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { AppBar, Toolbar, Box, IconButton } from '@mui/material'

// icons
import { TbMenu2 } from 'react-icons/tb'
// import Profile from './Profile'

import LogoSection from './LogoSection'
import ProfileSection from './ProfileSection'

const index = ({ handleLeftDrawerToggle }) => {
  return (
    <>
      <AppBar position='fixed' color='inherit'>
        <Toolbar sx={{ height: '50px' }}>
          <Box component='span' sx={{ display: { xs: 'none', md: 'flex' } }}>
            <LogoSection />
          </Box>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{
              mr: 2,
              marginLeft: '5px'
            }}
            onClick={handleLeftDrawerToggle}
          >
            <TbMenu2 />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <ProfileSection />
        </Toolbar>
      </AppBar>
    </>
  )
}

index.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
}

export default index
