import React from 'react'
import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase, Typography } from '@mui/material'

// Style
import './style.css'

import Img from '@components/ui/Img'

// Importar logo del directorio assets/imagen/icon/
import Logo from '@assets/images/icons/icono-header.svg'

import styled from '@emotion/styled'

import config from '@/config'


export const Brand_Logo = styled.span`
  img {
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '35px')};
  }
`

const index = () => {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={''}
      sx={{ maxWidth: '200px' }}
    >
      <Brand_Logo>
        {/* el valor {Logo} hace referencia al icono */}
        <Img src={Logo} alt='logo' style={{width: '100%', heigth: '100%', minWidth:'50px' }}/> 
      </Brand_Logo>
      <Typography className='app-header__logo'>GENERALI</Typography>
    </ButtonBase>
  )
}

export default index
