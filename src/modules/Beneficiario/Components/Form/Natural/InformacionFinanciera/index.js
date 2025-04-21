import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import NumberFormat from '@components/ui/_NumberFormat'
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from '@utils/Api/Catalogo'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
//
const index = () => {
  const { _tieneOtrosIngresos, handleChangeOtrosIngresos } =
    useContext(NaturalContext)

  useEffect(() => {}, [])

  const {
    setValue,
    getValues,
    unregister,
    formState: { errors },
  } = useFormContext()

  const handleChangeIngresos = (valor) => {
    if (valor == 'N') {
      // Deregister otros_info, fuente_ingreso_info
      // unregister('otros_info')
      // unregister('fuente_ingreso_info')
      setValue('otros_info', 0)
    }
    handleChangeOtrosIngresos(valor)
  }

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
      <Grid item xs={12}>
        <>
          <p>
            <small>
              Detalle de ingresos mensuales de la actividad declarada
            </small>
          </p>
        </>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat
          name="ingreso_mensuales"
          label="Ingresos mensuales USD"
          inputProps={{ maxLength: 23 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="otro_ingreso"
          label="Tiene otros ingresos diferentes"
          onChange={(e) => handleChangeIngresos(e.target.value)}
        >
          <MenuItem value={'S'}>Si</MenuItem>
          <MenuItem value={'N'}>No</MenuItem>
        </SelectOption>
      </Grid>

      {_tieneOtrosIngresos && (
        <>
          <Grid item xs={12}>
            <p>
              <small>
                Otros ingresos diferentes de la actividad económica principal
              </small>
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <NumberFormat
              name="otros_info"
              label="Ingresos mensuales USD"
              inputProps={{ maxLength: 23 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Input
              name="fuente_ingreso_info"
              label="Fuente otros ingresos"
              fullWidth
            />
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <>
          <h3>Situaci&oacute;n financiera</h3>
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
