import React, { useEffect, useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// VALIDACIONES
import { validationSchema } from '@modules/Beneficiario/Validator/Natural/PasoUno'
import { yupResolver } from '@hookform/resolvers/yup'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
// COMPONENTES
import InformaciondelBeneficiario from '@modules/Beneficiario/Components/Form/Natural/InformaciondelBeneficiario'
import PersonaDeContacto from '@modules/Beneficiario/Components/Form/Natural/PersonaContacto'
import ConyugueConviviente from '@modules/Beneficiario/Components/Form/Natural/ConyugueConviviente'
import VinculoConSolicitante from '@modules/Beneficiario/Components/Form/Natural/VinculoConSolicitante'
import ActionsButtons from '@modules/Beneficiario/Components/Form/Natural/ActionsButtons'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'
import { formatDate } from '@utils/Api/utils'

const index = () => {
  const {
    formData,
    validaCambiosFormulario,
    setDatosIniciales,
    handleSetCompleted,
    handleSetActiveStepForm,
    handleSetNext,
    setFormData,
    handleChangeEstadoCivil,
    handleValidaLista,
    _activeStep,
    _completed,
    _hash,
    _tieneConyugeConviviente,
  } = useContext(NaturalContext)

  const axiosPrivate = useAxiosPrivate()

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (formData) {
      const { info_beneficiario } = formData
      cargarDatos(info_beneficiario)
      setDatosIniciales(info_beneficiario)
      handleChangeEstadoCivil(info_beneficiario?.est_civil || '')
      //
      setInitialData()
    }
  }, [formData])

  const { setValue, reset, watch } = methods

  const setInitialData = () => {
    const { formulario } = formData
    if (formulario) {
      setValue('tipo_identificacion', formulario.tip_identificacion)
      setValue('num_identificacion', formulario.identificacion)
      setValue('email', formulario.correo_beneficiario)
      setValue('email_recibir', formulario.correo_beneficiario)
    }
  }

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch()

  useEffect(() => {
    validaCambiosFormulario(watchedValues)
  }, [watchedValues])
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const clearData = (data) => {
    reset()
  }

  const validaListaPeps = (param) => {
    console.log('validaListaPeps', param)
    handleValidaLista(
      param.tipo_identificacion,
      param.num_identificacion,
      param.apellidos,
      param.nombres,
    )
  }

  const cargarDatos = (data) => {
    if (data) {
      handleSetCompleted(_activeStep)
      Object.keys(data).map(function (name, index) {
        var value = data[name]
        if (value === undefined || value === null) {
          value = ''
        }
        setValue(name, value)
      })
    } else {
      clearData()
    }
  }

  const grabaDatos = async (param) => {
    try {
      // AQUI HACEMOS EL LLAMADO A LA VALIDACION DE LA LISTA PEPS
      validaListaPeps(param)

      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento)
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!_completed[_activeStep]) {
        //
        const { data } = await axiosPrivate.post(
          `beneficiario-natural/info-beneficiario/${_hash}`,
          param,
        )
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, info_beneficiario: data })

          swal({
            title: 'Paso 1/4',
            text: `Registrado con éxito!`,
            icon: 'success',
            buttons: {
              aceptar: 'Aceptar',
            },
          }).then((value) => {
            if (value) {
              // SETEAMOS EL NUMERO DE hash QUE ESTAMOS PROCESANDO
              handleSetActiveStepForm()
            }
          })
        }
      } else {
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `beneficiario-natural/info-beneficiario/${_hash}`,
          param,
        )

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, info_beneficiario: data })
          // solicitante
          swal({
            title: 'Paso 1/4',
            text: `Actualizado con éxito!`,
            icon: 'success',
            buttons: {
              cerrar: 'Cerrar',
              continuar: {
                text: 'Continuar',
                value: 'continue',
              },
            },
          }).then((value) => {
            if (value == 'continue') {
              handleSetNext()
            }
          })
        }
      }
      //
    } catch (error) {
      swal({
        title: 'Formulario Online',
        text: `Error ${error}`,
        icon: 'error',
        buttons: {
          cerrar: 'Aceptar',
        },
      })
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <InformaciondelBeneficiario />
            <PersonaDeContacto />

            {_tieneConyugeConviviente && <ConyugueConviviente />}

            <VinculoConSolicitante />

            <ActionsButtons grabaDatos={grabaDatos} />
          </Grid>
        </FormProvider>
      </Grid>
    </>
  )
}
export default index
