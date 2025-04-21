import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// validacion
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import qs from 'qs'

// services
import AuthService from '@services/AuthService'
import logsService from '@services/LogsService'
// import logsComisionesService from '@services/LogsComisionesService'

// hooks
import { useAuth } from '@hooks/useAuth'

// api
import axios from '@api/axios'

// components'
import Input from '@components/ui/Input'
import Error from '@components/ui/Error'
import Title from '@components/ui/Title'
import {
  AuthContainer,
  Title2,
  Container,
  FormLogin,
  SignInContainer,
  OverlayContainer,
  Overlay,
  OverlayPanelLeft,
  OverlayPanelRight,
  Paragraph,
  Footer,
  Link
} from './components'

// material-ui
import { Button } from '@mui/material'

// sweetalert
import swal from 'sweetalert'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    if (AuthService.isLoggedIn()) {
      navigate('/')
    }
  }, [auth])

  // estructura de la validacion
  const schema = yup
    .object()
    .shape({
      username: yup.string().required('el campo usuario es obligatorio'),
      password: yup.string().required('el campo contrasena es obligatorio')
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const objUser = qs.stringify({
      username: data.username,
      password: data.password
    })

    try {
      const response = await axios.post('/auth/login', objUser, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })

      if (response.status === 200) {
        const { data } = response
        const { access_token, email, perfil_id } = data

        AuthService.setUser({email: email, perfil_id: perfil_id})
        AuthService.setToken(access_token)
        
        logsService.register('Inicio de Sesión', 'Login')

        navigate('/')
      }
    } catch (error) {

      swal({
        title: 'Formulario Online',
        // text: error?.response?.data?.detail,
        text:`Contraseña incorrecta, favor inicia sesión nuevamente`,
        icon: 'error',
        button: 'Aceptar'
        // timer: '2000'
      })
    }
  }

  return (
    <>
      <AuthContainer>
        {/* <Title2>Formulario inicio de sesi&oacute;n</Title2> */}
        <Container>
          <SignInContainer>
            <FormLogin onSubmit={handleSubmit(onSubmit)}>
              <Title>Ingreso</Title>
              <Paragraph>Ingresar usuario y contrase&ntilde;a</Paragraph>
              <Input
                type='username'
                placeholder='Username'
                name='username'
                required
                register={register}
              />
              <ErrorMessage
                errors={errors}
                name='username'
                render={({ message }) => <Error>{message}</Error>}
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                required
                register={register}
              />
              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => <Error>{message}</Error>}
              />
              {/* <Link href='#'>Olvidaste tu contrase&ntilde;a?</Link> */}
              <Button
                type='submit'
                variant='contained'
                color='error'
                sx={{ width: '100%', borderRadius: '50px' }}
              >
                Ingresar
              </Button>
            </FormLogin>
          </SignInContainer>
          <OverlayContainer>
            <Overlay>
              <OverlayPanelLeft>
                <Title>Welcome Back!</Title>
                <Paragraph>
                  To keep connected with us please login with your personal info
                </Paragraph>
                {/* <Button className='ghost' id='signIn'>
                  Sign In
                </Button> */}
              </OverlayPanelLeft>
              <OverlayPanelRight>
                <Title>Formulario de Vinculación</Title>
              </OverlayPanelRight>
            </Overlay>
          </OverlayContainer>
        </Container>

        {/* <Footer>
          <Paragraph>
            � Copyright 2018 - Generali Ecuador Compa&ntilde;ia de Seguros S.A.
            *V.1.0.1.4
          </Paragraph>
        </Footer> */}
      </AuthContainer>
    </>
  )
}

export default Login
