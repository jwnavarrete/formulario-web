import React from 'react'
import { Typography, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'
import AuthService from '@services/AuthService'

const RenovacionList = ({ formularios }) => {
  const { getValues, setError, clearErrors } = useFormContext()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const handleRenovar = async (formulario) => {
    // if(!getValues('correo_ejecutivo')){
    //   setError("correo_ejecutivo", { type: "custom", message: "Requerido" })
    //   return
    // }else{
    //   clearErrors("correo_ejecutivo")
    // }

    let correoCliente = ''
    if (getValues('email')) {
      correoCliente = getValues('email')
    } else {
      correoCliente = formulario.correo_cliente
    }

    let correoAgente = ''
    if (getValues('email_agente')) {
      correoAgente = getValues('email_agente')

    } else {
      correoAgente = formulario.correo_agente
    }

    const { data } = await axiosPrivate.post(
      `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario/renovar`,
      {
        formulario: {
          tip_persona: formulario.tip_persona,
          tip_identificacion: formulario.tip_identificacion,
          identificacion: formulario.identificacion,
          correo_cliente: correoCliente,
          correo_agente: correoAgente,
          correo_ejecutivo: '',
          estado: 'P',
          steep: 0,
        },
        id_parent: formulario.id,
      },
    )

    // UNA VEZ CLONADO EL FORMULARIO ENVIAMOS EL CORREO AL CLIENTE
    await envioCorreoInicio(data.hash)

    console.log('formulario', data)
    navigate(`/${process.env.URL_CLIENTE}/${data.hash}`)
  }

  const envioCorreoInicio = async (hash) => {
    await AuthService.authTokenForm({ tipo: "cliente", hash: hash });    
    const { data } = await axiosPrivate.post(
      `formulario/correo-envio-cliente/${hash}`,
    )
    return data
  }

  const RenovacionItem = ({ formulario }) => {
    return (
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item sm={8} md={8}>
          <Typography
            variant="overline"
            color="black"
            style={{ fontWeight: 'bold' }}
          >
            {`Fecha: `}
          </Typography>
          <Typography variant="caption" color="black">
            {`${
              formulario.created_at ? formulario.created_at.slice(0, 10) : ''
            }`}
          </Typography>
        </Grid>
        <Grid item sm={4} md={4}>
          <Button
            style={{ width: '100%' }}
            onClick={(e) => handleRenovar(formulario)}
            variant="contained"
            color="primary"
            size="small"
          >
            Renovar
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      {formularios.map((formulario, key) => (
        <div className="d-flex flex-row" key={key}>
          <hr style={{ marginTop: '1rem' }} />
          {/* AQUI MOSTRAMOS LOS FORMULARIOS DE RENOVACION */}
          <RenovacionItem formulario={formulario} />
        </div>
      ))}
    </>
  )
}

export default RenovacionList
