import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from '@utils/Api/Catalogo'
//
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'

const index = () => {
  const [catalogoPais, setCatalogoPais] = useState([])
  const { formData, handleDependInput, getDisableByName, _isDisabled } =
    useContext(NaturalContext)
  const [catalogoActividad, setCatalogoActividad] = useState([]);

  const formMethods = useFormContext()
  const {
    setValue,
    formState: { errors },
  } = formMethods

  useEffect(() => {
    const { actividad_economica } = formData
    getCatalogo('pais', setCatalogoPais)
    // SI EXISTE INFORMACION PRECARGADA
    handleChangeOcupacion(actividad_economica?.ocupacion || '')
    getCatalogo("actividadeco", setCatalogoActividad);
    procesaAcciones(actividad_economica)
  }, [])

  const handleChangeOcupacion = (value) => {
    handleDependInput(value, '0034', ['ocupacion_especifique'], formMethods)
  }

  const procesaAcciones = (data) => {
    if (data) {
      const { ocupacion, actividad_economica } = data
      setValue('ocupacion', ocupacion)
      setValue('actividad_economica', actividad_economica)
      handleChangeOcupacion(ocupacion)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Datos actividad econ&oacute;mica</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="ocupacion"
          label="Ocupaci&oacute;n"
          onChange={(e) => handleChangeOcupacion(e.target.value)}
        >
          <MenuItem value={'0059'}>Empleado p&uacute;blico</MenuItem>
          <MenuItem value={'0094'}>Empleado privado</MenuItem>
          <MenuItem value={'0054'}>Negocio propio</MenuItem>
          <MenuItem value={'0100'}>Jubilado</MenuItem>
          <MenuItem value={'0106'}>Estudiante</MenuItem>
          <MenuItem value={'0020'}>Tareas dom&eacute;sticas</MenuItem>
          <MenuItem value={'0034'}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="ocupacion_especifique"
          label="Especifique"
          fullWidth
          disabled={getDisableByName('ocupacion_especifique')}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Input
          name="razon_social"
          label="Nombre o raz&oacute;n social del lugar del trabajo"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        {/* <Input
          name="actividad_economica"
          label="Actividad econ&oacute;mica"
          fullWidth
        /> */}
        <SelectOption
          name="actividad_economica"
          label="Actividad econ&oacute;mica"
        >
          {catalogoActividad.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <Input name="cargo" label="Cargo que desempe&ntilde;a" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <h3>Dirección de trabajo</h3>
      </Grid>
      <Grid item xs={6}>
        <Input
          name="direccion_trabajo"
          label="Direcci&oacute;n del trabajo"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="email" label="Correo Eletr&oacute;nico" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_trabajo"
          label="Tel&eacute;fono de trabajo"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="barrio_sector" label="Barrio / Sector" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_trabajo" label="Ciudad de trabajo" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="fax"
          label="Fax"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="pais_trabajo" label="Pa&iacute;s de trabajo">
          {catalogoPais.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>
    </>
  )
}

export default index
