import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import { Button, Grid, Divider } from '@mui/material'
import Input from '@components/ui/_Input'
// ALERTAS
import swal from 'sweetalert'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
//
const Form = ({ onSubmit, editMode, clearData, DelefeRef }) => {
  const { _estado } = useContext(NaturalContext)

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext()

  const handleDelect = () => {
    swal({
      title: 'Formulario Online',
      text: `Seguro desea eliminar este registro?`,
      icon: 'info',
      buttons: {
        cerrar: 'No',
        continuar: {
          text: 'Si',
          value: 'continue',
        },
      },
    }).then((value) => {
      if (value == 'continue') {
        DelefeRef()
      }
    })
  }
  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Referencias</h3>
        </>
      </Grid>

      <Grid item xs={12}>
        <Divider textAlign="left">Referencias personales:</Divider>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="nombres_apellidos" label="Nombres y Apellidos" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="parentesco" label="Parentesco" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono"
          label="Tel&eacute;fono"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        {_estado == 'P' && (
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
            size="small"
          >
            Agregar
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={clearData}
          sx={{ ml: 1 }}
          size="small"
        >
          Cancelar
        </Button>

        {editMode && (
          <>
            {_estado == 'P' && (
              <Button
                onClick={handleDelect}
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
                size="small"
              >
                Eliminar
              </Button>
            )}
          </>
        )}
      </Grid>
    </>
  )
}

export default Form
