import React, { useContext, useEffect } from 'react'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { useFormContext } from 'react-hook-form'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'

const index = () => {
  const { formData, getDisableByName, handleDependInput } =
    useContext(NaturalContext)

  const formMethods = useFormContext()
  //
  useEffect(() => {
    const { info_beneficiario } = formData
    if (info_beneficiario?.vinculo_sol_aseg) {
      handleTipoAsegurado(info_beneficiario?.vinculo_sol_aseg)
    }
  }, [])

  const handleTipoAsegurado = (value) => {
    handleDependInput(value, 'O', ['otro_asegurado'], formMethods)
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>V&iacute;nculo entre el solicitante y asegurado</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="vinculo_sol_aseg"
          label="Vínculo"
          onChange={(e) => handleTipoAsegurado(e.target.value)}
        >
          <MenuItem value={'C'}>Familiar</MenuItem>
          <MenuItem value={'P'}>Comercial</MenuItem>
          <MenuItem value={'L'}>Laboral</MenuItem>
          <MenuItem value={'N'}>Ninguna</MenuItem>
          <MenuItem value={'O'}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="otro_asegurado"
          label="Especifique"
          disabled={getDisableByName('otro_asegurado')}
          fullWidth
        />
      </Grid>
    </>
  )
}

export default index
