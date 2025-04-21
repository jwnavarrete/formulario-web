import React, { useState, useContext, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@modules/Beneficiario/Validator/registro'
import ClientCaptcha from 'react-client-captcha'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
// LIBRERIAS PARA CAMPOS
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
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

const index = () => {
  const { openModalRegistro, setOpenModalRegistro, grabarFormulario } =
    useContext(NaturalContext)
  const [captchaValue, setCaptchaValue] = useState('')
  const [tipIdentificacionList, setTipIdentificacionlist] = useState([])

  const getCaptcha = (code) => {
    setCaptchaValue(code)
  }

  //creame un useEfect que se ejecute cuando se abra el modal
  useEffect(() => {
    console.log('NaturalContext', NaturalContext)
  }, [])

  useEffect(() => {
    setOpenModalRegistro(true)
  }, [openModalRegistro])

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

    console.log(datos)

    const jsonData = {
      tip_persona: datos.tip_persona,
      tip_identificacion: datos.tipo_identificacion,
      identificacion: datos.num_identificacion,
      correo_beneficiario: datos.email,
      // correo_agente: datos.email_ejecutivo,
      correo_ejecutivo: datos.email_ejecutivo,
      estado: 'P',
      steep: 0,
    }

    // esto es un ejemplo de como se envia la informacion al context
    grabarFormulario(jsonData)
  }

  const methods = useForm({ resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue } = methods

  return (
    <Modal
      open={openModalRegistro}
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
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
            <Input name="email" label="E-mail personal" />
          </Grid>

          <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
            <Input
              name="email_ejecutivo"
              label="E-mail ejecutivo"
              helperText="Si usted es ejecutivo ingrese su correo aqui..."
            />
          </Grid>

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
        </FormProvider>
      </Box>
    </Modal>
  )
}

export default index
