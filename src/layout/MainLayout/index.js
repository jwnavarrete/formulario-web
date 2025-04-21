// project imports
import react, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'

import navigation from '@menu-items'

import { BiChevronRightCircle } from 'react-icons/bi'

// store
import { SET_MENU } from '@store/actions'

// services
import AuthService from '@services/AuthService'

import Breadcrumbs from '@components/ui/extended/Breadcrumbs'
import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'
import Footer from './Footer'

import PerfectScrollbar from 'react-perfect-scrollbar'

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

  // Handle left drawer
  const leftDrawerOpened = useSelector(state => state.customization.opened)
  const dispatch = useDispatch()
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened })
  }

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd })
  }, [matchDownMd])

  const navigate = useNavigate()

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      navigate('auth/login')
    }
  }, [])

  return (
    <>
      <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />
        <Main theme={theme} open={leftDrawerOpened} sx={{ paddingLeft: '10px', width: '100%' }}>
          {/* breadcrumb */}
          <Breadcrumbs
            separator={BiChevronRightCircle}
            navigation={navigation}
            icon
            title
            rightAlign
          />

          <Outlet />
          {/* <PerfectScrollbar
            component='div'
            style={{
              height: 'calc(100vh - 56px)',
              paddingLeft: '5px',
              paddingRight: '5px'
            }}
          >
          </PerfectScrollbar> */}
        </Main >
      </Box>
    </>
  )
}

export default MainLayout
