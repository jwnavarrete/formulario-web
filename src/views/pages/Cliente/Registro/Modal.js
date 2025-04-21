import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@utils/Validator/FormRegistro/Cliente'
import ClientCaptcha from 'react-client-captcha'
import { useNavigate } from 'react-router-dom'

// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Link } from '@mui/material'
// LIBRERIAS PARA CAMPOS
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'
import { Typography } from '@mui/material'
import RenovacionList from './Renovacion'

//
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const urlApi = `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario`

const index = () => {
  const axiosPrivate = useAxiosPrivate()
  const [captchaValue, setCaptchaValue] = useState('')
  const [openModal, setOpenModal] = useState(true)
  const [tipIdentificacionList, setTipIdentificacionlist] = useState([])
  const [formularios, setFormularios] = useState()

  const getCaptcha = (code) => {
    setCaptchaValue(code)
  }

  const handleTipPersona = (valor) => {
    let listTipIdenti = []
    //
    if (valor == 'N') {
      listTipIdenti.push({ codigo: 'C', descripcion: 'Cédula' })
      listTipIdenti.push({ codigo: 'P', descripcion: 'Pasaporte' })
      listTipIdenti.push({ codigo: 'U', descripcion: 'Ruc' })
    }
    if (valor == 'J') {
      listTipIdenti.push({ codigo: 'R', descripcion: 'Ruc' })
    }
    // LIMPIAMOS LO QUE SE HAYA SELECCIONADO PREVIAMENTE PARA QUE SE VALIDE NUEVAMENTE
    setValue('tipo_identificacion', '')
    setTipIdentificacionlist(listTipIdenti)
  }

  const grabaDatos = (datos) => {
    if (datos.captcha != captchaValue) {
      alert('El codigo no es valido')
      return
    }

    const jsonData = {
      tip_persona: datos.tip_persona,
      tip_identificacion: datos.tipo_identificacion,
      identificacion: datos.num_identificacion,
      correo_cliente: datos.email,
      correo_agente: datos.email_agente,
      // correo_agente: '',
      // correo_ejecutivo: datos.correo_ejecutivo,
      correo_ejecutivo: '',
      estado: 'P',
      steep: 0,
    }
    callApi(jsonData)
  }

  const callApi = async (jsonData) => {
    const { data } = await axiosPrivate.post(urlApi, jsonData)

    await envioCorreoInicio(data.hash)

    setOpenModal(false)

    swal({
      title: 'Formulario Online',
      text: `Revisa en tu correo el link con el que puedes continuar llenando el Formulario de Vinculación`,
      icon: 'info',
      buttons: {
        continuar: {
          text: 'Aceptar',
          value: 'continue',
        },
      },
    }).then((value) => {
      if (value == 'continue') {
        data.url
          ? (window.location.href = data.url)
          : alert('Se presenta un error, por favor vuelva a intentar')
      }
    })
  }

  const envioCorreoInicio = async (hash) => {
    const { data } = await axiosPrivate.post(
      `formulario/correo-envio-cliente/${hash}`,
    )

    return data
  }

  const methods = useForm({ resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, getValues } = methods

  const handleFindFormulario = async (valor) => {
    const { data } = await axiosPrivate.post(
      `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario/find-formulario`,
      {
        tip_persona: methods.getValues('tip_persona'),
        tip_identificacion: methods.getValues('tipo_identificacion'),
        identificacion: valor,
      },
    )

    console.log(data)

    if (data.length > 0) {
      // Obtener el registro más reciente
      const row = data[0]

      // Extraer los valores de correo_cliente y correo_agente
      const { correo_cliente, correo_agente, correo_ejecutivo } = row

      setValue('email', correo_cliente)
      setValue('email_agente', correo_agente)
      setValue('correo_ejecutivo', correo_ejecutivo ?? '')
    } else {
      setValue('email', '')
      setValue('email_agente', '')
      setValue('correo_ejecutivo', '')
    }

    setFormularios(data)
  }

  useEffect(() => {
    if (methods.getValues('num_identificacion')) {
      handleFindFormulario(methods.getValues('num_identificacion'))
    }
  }, [methods.watch('tip_persona'), methods.watch('tipo_identificacion')])

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider {...methods}>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOption
              name="tip_persona"
              label="Tipo de Persona"
              required
              onChange={(e) => handleTipPersona(e.target.value)}
            >
              <MenuItem value={'N'}>Natural</MenuItem>
              <MenuItem value={'J'}>Jurídico</MenuItem>
            </SelectOption>
          </Grid>

          <Grid item xs={12} md={6} lg={3} pt={1}>
            <SelectOption
              name="tipo_identificacion"
              label="Tipo de identificaci&oacute;n"
              required
            >
              {tipIdentificacionList.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                  {descripcion}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid>

          <Grid item xs={12} md={6} lg={3} pt={1}>
            <Input
              name="num_identificacion"
              label="No.identificaci&oacute;n"
              fullWidth
              required
              onBlur={(e) => handleFindFormulario(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
            <Input name="email" label="E-mail personal" />
          </Grid>

          {/*<Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
            <Input name="correo_ejecutivo" label="E-mail Ejecutivo" />
          </Grid>*/}

          <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
            <Input
              name="email_agente"
              label="E-mail agente (Opcional)"
              helperText="Si usted es agente ingrese su correo aqui..."
            />
          </Grid>

          {/* SI TIENE FORMUARIOS PREVIOS ABRE LISTADO DE RENOVACION */}
          {formularios?.length > 0 ? (
            <>
              <Typography variant="h4" color="black">
                {`Formularios disponibles para renovación`}
              </Typography>

              <div
                className="d-flex justify-content-center mt-4"
                style={{ maxHeight: '30vh', overflowY: 'auto' }}
              >
                <RenovacionList formularios={formularios} />
              </div>
            </>
          ) : (
            <>
              {/* SI NO TIENE FORMULARIOS PREVIOS, SOLICITA INGRESAR INFORMACION */}
              <ClientCaptcha captchaCode={(code) => getCaptcha(code)} />
              <Grid item xs={12} pt={1}>
                <Input
                  name="captcha"
                  label="Ingrese c&oacute;digo de verificaci&oacute;n"
                  required
                />
              </Grid>

              <Grid item sm={12} md={12} lg={12} pt={1}>
                <Button
                  style={{ width: '100%' }}
                  onClick={handleSubmit(grabaDatos)}
                  variant="contained"
                  color="primary"
                >
                  Guardar
                </Button>
              </Grid>
            </>
          )}
        </FormProvider>
      </Box>
    </Modal>
  )
}

export default index
