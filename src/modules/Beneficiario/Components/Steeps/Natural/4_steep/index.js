import React, { useEffect, useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { validationSchema } from '@modules/Beneficiario/Validator/Natural/PasoCuatro'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
// COMPONENTES
import Documentos from '@modules/Beneficiario/Components/Form/Natural/Documentos'
import Declaracion from '@modules/Beneficiario/Components/Form/Natural/Declaracion'
import ActionsButtons from '@modules/Beneficiario/Components/Form/Natural/ActionsButtons'
import Revision from '@modules/Beneficiario/Components/Form/Natural/Revision'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
import swal from 'sweetalert'

// CONTEXTO
const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })

  const {
    formData,
    validaCambiosFormulario,
    setDatosIniciales,
    handleSetActiveStepForm,
    setFormData,
    _activeStep,
    _revisionInterna,
    _hash,
    _steeps,
  } = useContext(NaturalContext)

  const axiosPrivate = useAxiosPrivate()

  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (formData) {
      const { declaracion } = formData
      cargarDatos(declaracion)
      setDatosIniciales(declaracion)
    }
  }, [formData])

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch()

  useEffect(() => {
    validaCambiosFormulario(watchedValues)
  }, [watchedValues])
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const clearData = () => {
    reset()
  }

  const cargarDatos = (data) => {
    if (data) {
      // handleSetCompleted(_activeStep)
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
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (_activeStep !== _steeps.length) {
        //
        const { data } = await axiosPrivate.post(
          `beneficiario-natural/declaracion/${_hash}`,
          param,
        )
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, declaracion: data })

          swal({
            title: 'Paso 4/4',
            text: `Registrado con éxito! Se ha enviado un correo para la aceptación y firma del formulario.`,
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
          `beneficiario-natural/declaracion/${_hash}`,
          param,
        )

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, declaracion: data })
          // solicitante
          swal({
            title: 'Paso 4/4',
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
              handleSetActiveStepForm()
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
            <Documentos />
            <Declaracion />

            {_revisionInterna && <Revision />}
            <ActionsButtons grabaDatos={grabaDatos} />
          </Grid>
        </FormProvider>
      </Grid>
    </>
  )
}
export default index
