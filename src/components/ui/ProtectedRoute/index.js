import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute ({ component: Component, ...restOfProps }) {
  const isAuthenticated = windows.localStorage.getItem('isLoggedIn')

  return (
    <Route
      {...restOfProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth/login' />
        )
      }
    />
  )
}

export default ProtectedRoute
