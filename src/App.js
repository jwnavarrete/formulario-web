import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '@services/AuthService.js'

import Routes from '@routes'
import themes from '@themes'
import NavigationScroll from '@layout/NavigationScroll'
import '@assets/scss/main.scss'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const customization = useSelector((state) => state.customization)

  useEffect(() => {
    const URL = location.pathname.split('/')[1]

    switch (URL) {
      case process.env.URL_CLIENTE:
      case process.env.URL_PRESTADOR:
      case process.env.URL_EMPLEADO:
      case process.env.URL_BENEFICIARIOS:
        break
      default:
        if (!authService.isLoggedIn()) {
          navigate('/auth/login')
        }
        break
    }
  }, [])

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
