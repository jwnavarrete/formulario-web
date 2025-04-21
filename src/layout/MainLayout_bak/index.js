// project imports
import react, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import navigation from '@layout/MainLayout/MenuItems'
import { BiChevronRightCircle } from 'react-icons/bi'
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
      <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* {JSON.stringify(navigation)} */}
        {/* <Main theme={theme} open={leftDrawerOpened} sx={{ paddingLeft: '10px', width: '100%' }}>
          <Breadcrumbs
            separator={BiChevronRightCircle}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          <Outlet />
        </Main > */}
      </Box>
    </>
  )
}

export default MainLayout
