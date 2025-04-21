import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate();
  const instance = () => {
    
  }

  useEffect(() => {
    const setAuth = token => {
      window.localStorage.setItem('tarificador_token', token)
      window.localStorage.setItem('isLoggedIn', true)
    }
  
    const getToken = () => {
      return window.localStorage.getItem('tarificador_token')
    }
  
    const logOut = () => {
      window.localStorage.removeItem('tarificador_token')
      window.localStorage.removeItem('isLoggedIn')
    }
  
    const isLoggedIn = () => {
      return window.localStorage.getItem('isLoggedIn')
    }

    return () => {
      setAuth, getToken, logOut, isLoggedIn
    }
  }, [])
}

export { useAuth }