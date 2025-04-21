import React, { useEffect, useContext, useState } from 'react'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
// VALIDACIONES
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@modules/Beneficiario/Validator/Natural/Referencias'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
// COMPONENTE DE VISTA
import Form from './Form'
import Table from './Table'
import { initialData } from './InitialData'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'

// ALERTAS
import swal from 'sweetalert'
//
const index = ({ countReferencias }) => {
  const { _hash } = useContext(NaturalContext)

  const [rows, setRows] = useState([])
  const [editMode, setEditMode] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    getRows();
  }, [])

  const getRows = async () => {
    // identificacion
    const { data } = await axiosPrivate.get(
      `beneficiario-natural/referencias/${_hash}`,
    )

    if (data) {
      setRows(data)
      countReferencias()
    }
  }

  const prepareData = (data) => {
    // INCLUIMOS EL NUMERO DE INDENTIFICACION EN LOS CAMPOS A GUARDAR
    data.hash = _hash
    return data
  }

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(validationSchema),
  })

  const {
    reset,
    getValues,
    formState: { errors },
  } = methods

  const onSubmit = async (param) => {
    try {
      param = prepareData(param)

      if (param.id === undefined) {
        // SI NO EXISTE PROCEDEMOS A CREAR EL REGISTRO
        const { data } = await axiosPrivate.post(
          `beneficiario-natural/referencias/`,
          param,
        )

        clearData()

        if (data) {
          await getRows()
        }
      } else {
        // SI EXISTE LO ACTUALIZAMOS CON EL CODIGO ID
        const { data } = await axiosPrivate.patch(
          `beneficiario-natural/referencias/${_hash}`,
          param,
        )

        clearData()

        if (data) {
          await getRows()
        }
      }
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

  useEffect(() => {}, [])

  const clearData = () => {
    reset()
    setEditMode(false)
  }

  const DelefeRef = async () => {
    let codigo = getValues('id')

    const { data } = await axiosPrivate.delete(
      `beneficiario-natural/referencias/${codigo}`,
    )
    //
    getRows()
    clearData()
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        editMode={editMode}
        clearData={clearData}
        DelefeRef={DelefeRef}
      />

      <Grid item xs={12}>
        <Table rows={rows} setEditMode={setEditMode} />
      </Grid>
    </FormProvider>
  )
}

export default index
