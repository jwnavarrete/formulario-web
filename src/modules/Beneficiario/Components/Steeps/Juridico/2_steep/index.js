import React, { useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { validationSchema } from '@modules/Beneficiario/Validator/Juridico/PasoDos'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
// COMPONENTES
import InformacionRepresentanteLegalApoderado from '@modules/Beneficiario/Components/Form/Juridico/InformacionRepresentanteLegalApoderado'
import ActionsButtons from '@modules/Beneficiario/Components/Form/Juridico/ActionsButtons'
import ConyugueConviviente from '@modules/Beneficiario/Components/Form/Juridico/ConyugueConviviente'
//
import { JuridicoContext } from '@modules/Beneficiario/context/JuridicoContext'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import swal from 'sweetalert'
import { formatDate } from '@utils/Api/utils'

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
    _tieneConyugeConviviente,
    _hash,
    handleChangeEstadoCivil,
    handleDependInput,
  } = useContext(JuridicoContext)

  const axiosPrivate = useAxiosPrivate()

  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (formData) {
      const { representante_apoderado } = formData
      cargarDatos(representante_apoderado)
      setDatosIniciales(representante_apoderado)
      // Cargar estado del civil
      if (representante_apoderado?.est_civil) {
        handleChangeEstadoCivil(representante_apoderado?.est_civil)
      }

      if (representante_apoderado?.pais) {
        handleDependInput(
          representante_apoderado?.pais,
          'EC',
          ['provincia_domicilio', 'canton_domicilio'],
          methods,
        )
      }
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

  const grabaDatos = async (param) => {
    try {
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento)
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!_completed[_activeStep]) {
        //
        const { data } = await axiosPrivate.post(
          `beneficiario-juridico/representante-apoderado/${_hash}`,
          param,
        )
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, representante_apoderado: data })

          swal({
            title: 'Paso 2/3',
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
          `beneficiario-juridico/representante-apoderado/${_hash}`,
          param,
        )

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, representante_apoderado: data })
          // solicitante
          swal({
            title: 'Paso 2/3',
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
            <InformacionRepresentanteLegalApoderado />
            {_tieneConyugeConviviente && <ConyugueConviviente />}
            <ActionsButtons grabaDatos={grabaDatos} />
          </Grid>
        </FormProvider>
      </Grid>
    </>
  )
}
export default index
