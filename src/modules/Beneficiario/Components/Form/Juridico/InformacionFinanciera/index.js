import React from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
// Controles nuevos para las validaciones
import NumberFormat from '@components/ui/_NumberFormat'

// FORMULARIO ACTIONS REDUX
const index = () => {
  const {
    setValue,
    getValues,
    unregister,
    formState: { errors },
  } = useFormContext()

  const replaceCurrencySymbol = (value) => {
    if (value) {
      return value.replace(/$|,|/g, '')
    }
    return value
  }

  const handleChangeFinanciera = (prop) => (event) => {
    setValue(prop, replaceCurrencySymbol(event.target.value))
    const activos = getValues('activos')
    const pasivos = getValues('pasivos')
    let patrimonio = activos - pasivos
    setValue('patrimonio', replaceCurrencySymbol(patrimonio.toFixed(2)))
  }

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Informaci&oacute;n financiera </h3>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat
          name="activos"
          label="Total de activos"
          inputProps={{ maxLength: 23 }}
          onChange={handleChangeFinanciera('activos')}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat
          name="pasivos"
          label="Total de pasivos"
          inputProps={{ maxLength: 23 }}
          onChange={handleChangeFinanciera('pasivos')}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat
          name="patrimonio"
          label="Patrimonio"
          fullWidth
          disabled={true}
        />
      </Grid>
    </>
  )
}

export default index
