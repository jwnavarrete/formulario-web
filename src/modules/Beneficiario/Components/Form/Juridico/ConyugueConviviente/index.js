import React, { useEffect, useState } from 'react'
// COMPONENTES DE MATERIAL UI
import { MenuItem, Box, Grid } from '@mui/material'
import { getCatalogo } from '@utils/Api/Catalogo'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'

const index = () => {
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([])
  const [catalogoPais, setCatalogoPais] = useState([])
  //
  useEffect(() => {
    getCatalogo('nacionalidad', setCatalogoNacionalidad)
    getCatalogo('pais', setCatalogoPais)
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <h3>Cónyuge o Conviviente:</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres_cony" label="Apellidos y Nombres" required />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="actividad_eco_cony" label="Actividad Economica" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="domicilio_cony" label="Domicilio" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="nacionalidad_cony" label="Nacionalidad">
            {catalogoNacionalidad.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="pais_domicilio_cony" label="Pa&iacute;s">
            {catalogoPais.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="email_cony" label="Correo" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion_cony"
            label="Tipo de identificaci&oacute;n"
          >
            <MenuItem value={'C'}>C&eacute;dula</MenuItem>
            <MenuItem value={'P'}>Pasaporte</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_cony"
          label="No.identificaci&oacute;n"
          fullWidth
        />
      </Grid>
    </>
  )
}

export default index
