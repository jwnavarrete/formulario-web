import React, { useEffect, useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { validationSchema } from '@modules/Beneficiario/Validator/Natural/PasoTres'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
// COMPONENTES
import InformacionFinanciera from '@modules/Beneficiario/Components/Form/Natural/InformacionFinanciera'
import ActionsButtons from '@modules/Beneficiario/Components/Form/Natural/ActionsButtons'
import Referencias from '@modules/Beneficiario/Components/Form/Natural/Referencias'
import CanalVinculacion from '@modules/Beneficiario/Components/Form/Natural/CanalVinculacion'
import PersonaExpuestaPoliticamente from '@modules/Beneficiario/Components/Form/Natural/PersonaExpuestaPoliticamente'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'
import FormHelperText from "@mui/material/FormHelperText";

// CONTEXTO
const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })

  const {
    formData,
    validaCambiosFormulario,
    setDatosIniciales,
    handleSetCompleted,
    handleSetActiveStepForm,
    handleSetNext,
    setFormData,
    _activeStep,
    _completed,
    _hash,
  } = useContext(NaturalContext)

  const axiosPrivate = useAxiosPrivate()

  const { reset, setValue, watch, formState: { errors } } = methods;


  useEffect(() => {
    if (formData) {
      const { informacion_financiera } = formData
      cargarDatos(informacion_financiera)
      setDatosIniciales(informacion_financiera)
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

  const countReferencias = async () => {
    const { data } = await axiosPrivate.get(
      `beneficiario-natural/referencias/${_hash}`,
    )

    if (data) {
      setValue('referencias', data.length)
    }
  }

  const grabaDatos = async (param) => {
    try {
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!_completed[_activeStep]) {
        //
        const { data } = await axiosPrivate.post(
          `beneficiario-natural/informacion-financiera/${_hash}`,
          param,
        )
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, informacion_financiera: data })

          swal({
            title: 'Paso 3/4',
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
          `beneficiario-natural/informacion-financiera/${_hash}`,
          param,
        )

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, informacion_financiera: data })
          // solicitante
          swal({
            title: 'Paso 3/4',
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
            <InformacionFinanciera />
            <Referencias countReferencias={countReferencias} />
            <Grid item xs={12}>
              <FormHelperText error>
                {errors.referencias?.message}
              </FormHelperText>
            </Grid>
            <CanalVinculacion />
            <PersonaExpuestaPoliticamente />
            <ActionsButtons grabaDatos={grabaDatos} />
          </Grid>
        </FormProvider>
      </Grid>
    </>
  )
}
export default index
