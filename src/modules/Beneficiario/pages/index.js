import React, { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import { useParams, useNavigate } from 'react-router-dom'
import AuthService from '@services/AuthService'
import { jwtDecode } from 'jwt-decode'
// COMPONENTES
import FormNatural from './Natural'
import FormJuridico from './Juridico'
import FrmRegistro from './Registro'

import Loading from '@components/ui/Loading'
// PROVIDER
import swal from 'sweetalert'
// FORMULARIO ACTIONS REDUX
const index = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [tipoPersona, setTipPersona] = useState('')
  const [hash, setHast] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setHast(id)
      setIsLoading(false)
      // SI PASA LA VALIDACION DE LA URL PROCEDEMOS A BUSCAR EL FORMULARIO.
      validaTokenSeguridad(id)
    }

    setIsLoading(false)
  }, [])

  const authToken = async (param) => {
    const { data } = await axiosPrivate.post(`/auth/token-form`, {
      tipo: param.tipo,
      hash: param.hash,
    })
    if (data) {
      AuthService.setToken(data.access_token)
    } else {
      window.alert('Error al generar token de acceso')
    }
    return data
  }

  const validaTokenSeguridad = async (hash) => {
    try {
      const dataToken = await authToken({ tipo: 'beneficiario', hash: hash })

      if (dataToken.access_token) {
        // Decodifica el token
        const decodedToken = jwtDecode(dataToken.access_token)

        console.log('decodedToken:', decodedToken)
        if (decodedToken) {
          setTipPersona(decodedToken.tip_persona)
        }
      }
    } catch (error) {
      handleErrorFormulario()
    } finally {
      setIsLoading(false)
    }
  }

  const handleErrorFormulario = () => {
    swal({
      title: 'Formulario Online',
      text: `No se pudo encontrar el formulario`,
      icon: 'info',
      buttons: {
        continuar: {
          text: 'Aceptar',
          value: 'continue',
        },
      },
    }).then((value) => {
      if (value == 'continue') {
        // SI HAY UN ERROR AL CARGAR EL FORMULARIO, LO ENVIAMOS AL ENLACE PRINCIPAL PARA CREAR UN NUEVO REGISTRO
        navigate(`/${process.env.URL_BENEFICIARIOS}`)
      }
    })
  }

  if (isLoading) {
    return <Loading />
  }

  // SI NO TIENE (ID) O (TIPO PERSONA) ENVIE A LLENAR EL FORMULARIO CREAR EL VINCULACION
  if (!id || tipoPersona === '') {
    return <FrmRegistro />
  }

  if (tipoPersona == 'N') {
    return <FormNatural hash={hash} />
  }

  if (tipoPersona == 'J') {
    return <FormJuridico hash={hash} />
  }
}

export default index
