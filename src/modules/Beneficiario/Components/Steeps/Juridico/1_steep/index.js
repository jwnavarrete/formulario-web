import React, { useEffect, useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// VALIDACIONES
import { validationSchema } from '@modules/Beneficiario/Validator/Juridico/PasoUno'
import { yupResolver } from '@hookform/resolvers/yup'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
// COMPONENTES
import InformaciondelBeneficiario from '@modules/Beneficiario/Components/Form/Juridico/InformaciondelBeneficiario'
import ActionsButtons from '@modules/Beneficiario/Components/Form/Juridico/ActionsButtons'
import InformacionFinanciera from '@modules/Beneficiario/Components/Form/Juridico/InformacionFinanciera'
import DeclaracionPEP from "@modules/Beneficiario/Components/Form/Juridico/DeclaracionPEP"
// Contexto
import { JuridicoContext } from '@modules/Beneficiario/context/JuridicoContext'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'

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
  } = useContext(JuridicoContext)

  const axiosPrivate = useAxiosPrivate()

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (formData) {
      const { solicitante } = formData
      cargarDatos(solicitante)
      setDatosIniciales(solicitante)
      handleChangeEstadoCivil(solicitante?.est_civil || '')
      setInitialData()
    }
  }, [formData])

  const { setValue, reset, watch } = methods

  const setInitialData = () => {
    const { formulario } = formData
    if (formulario) {
      setValue('tipo_identificacion', formulario.tip_identificacion)
      setValue('num_identificacion_empresa', formulario.identificacion)
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
    handleValidaLista(
      param.tipo_identificacion,
      param.num_identificacion_empresa,
      "",
      param.razon_social_empresa,
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

      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!_completed[_activeStep]) {
        //
        const { data } = await axiosPrivate.post(
          `beneficiario-juridico/solicitante/${_hash}`,
          param,
        )
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, solicitante: data })

          swal({
            title: 'Paso 1/3',
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
          `beneficiario-juridico/solicitante/${_hash}`,
          param,
        )

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, solicitante: data })
          // solicitante
          swal({
            title: 'Paso 1/3',
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
            <InformacionFinanciera />
            <DeclaracionPEP />
            <ActionsButtons grabaDatos={grabaDatos} />
          </Grid>
        </FormProvider>
      </Grid>
    </>
  )
}
export default index
