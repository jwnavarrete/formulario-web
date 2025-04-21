import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import { Divider, MenuItem, Box, Grid } from '@mui/material'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import { getCatalogo } from '@utils/Api/Catalogo'
import { calcularEdad } from '@utils/Api/utils.js'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'

const index = () => {
  const {
    formData,
    handleChangeEstadoCivil,
    getDisableByName,
    handleDependInput,
  } = useContext(NaturalContext)
  const [loading, setLoading] = useState(true)
  const [disableIdentificacion, setDisableIdentificacion] = useState(false)
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([])
  const [catalogoPais, setCatalogoPais] = useState([])
  const [catalogoProvincia, setCatalogoProvincia] = useState([])
  const [catalogoCanton, setCatalogoCanton] = useState([])
  const [today, setToday] = useState()
  const formMethods = useFormContext()

  const { setValue, reset, setError, clearErrors } = formMethods

  useEffect(() => {
    const { info_beneficiario } = formData
    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    setDisableIdentificacion(true)
    // CARGAMOS LOS CATALOGOS
    getCatalogo('nacionalidad', setCatalogoNacionalidad)
    getCatalogo('pais', setCatalogoPais)
    getCatalogo('provincia', setCatalogoProvincia)

    getCatalogo(
      `cantones/${info_beneficiario?.provincia_domicilio ?? ''}`,
      setCatalogoCanton,
    )

    handleChangePais(info_beneficiario?.pais_domicilio ?? '')

    var todayDate = new Date().toISOString().slice(0, 10)
    setToday(todayDate)

    setLoading(false)
  }, [])

  const clearData = () => {
    reset()
  }

  const handleChangeFecNacimiento = (value) => {
    const edad = calcularEdad(value)

    if (edad > 17 && edad < 150 && !isNaN(edad) && value) {
      setValue('edad', edad)
      clearErrors('edad')
      clearErrors('fech_nacimiento')
    } else {
      setValue('edad', '')
      setValue('fech_nacimiento', '')
      setError('fech_nacimiento', {
        type: 'custom',
        message: 'Debe ser mayor de edad',
      })
    }
  }

  const handleChangePais = (value) => {
    handleDependInput(value, 'EC', ['provincia_domicilio'], formMethods)
    handleDependInput(value, 'EC', ['canton_domicilio'], formMethods)
  }

  const handleChangeProvincia = (value) => {
    setValue('canton_domicilio', '')
    getCatalogo(`cantones/${value}`, setCatalogoCanton)
  }

  if (loading) {
    return 'Cargando datos, seccion solicitante.'
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Persona Natural / Beneficiario</h3>
      </Grid>
      <Grid item xs={12}>
        <h3>Información del Beneficiario</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion"
            label="Tipo de identificaci&oacute;n"
            disabled={disableIdentificacion}
          >
            <MenuItem value={'C'}>C&eacute;dula</MenuItem>
            <MenuItem value={'P'}>Pasaporte</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion"
          label="No.identificaci&oacute;n"
          fullWidth
          disabled={disableIdentificacion}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="apellidos"
          label="Apellidos"
          helperText="Llenar dos apellidos si es posible."
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="nombres"
          label="Nombres"
          helperText="Llenar dos nombres si es posible."
          required
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="sexo" label="Sexo">
            <MenuItem value={'M'}>Masculino</MenuItem>
            <MenuItem value={'F'}>Femenino</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="est_civil"
            label="Estado civil"
            onChange={(e) => handleChangeEstadoCivil(e.target.value)}
          >
            <MenuItem value="01">Soltero</MenuItem>
            <MenuItem value="02">Casado</MenuItem>
            <MenuItem value="05">Divorciado</MenuItem>
            <MenuItem value="04">Unión de hecho</MenuItem>
            <MenuItem value="03">Viudo</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="lugar_nacimiento" label="Lugar de nacimiento" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="fech_nacimiento"
          label="Fecha de nacimiento"
          type="Date"
          fullWidth
          onBlur={(e) => handleChangeFecNacimiento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ max: today }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="nacionalidad" label="Nacionalidad">
            {catalogoNacionalidad.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Divider textAlign="left">Direcci&oacute;n</Divider>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="direccion_domicilio" label="Domicilio" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="pais_domicilio"
            label="Pa&iacute;s"
            onChange={(e) => handleChangePais(e.target.value)}
          >
            {catalogoPais.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_domicilio" label="Ciudad" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="provincia_domicilio"
            label="Provincia de domicilio"
            disabled={getDisableByName('provincia_domicilio')}
            onChange={(e) => handleChangeProvincia(e.target.value)}
          >
            {catalogoProvincia.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="canton_domicilio" label="Cantón de domicilio" disabled={getDisableByName('canton_domicilio')}>
            {catalogoCanton.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="profesion" label="Profesión" />
      </Grid>

      <Grid item xs={12} md={6} lg={1}>
        <Input name="edad" label="Edad" disabled={true} />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_domicilio"
          inputProps={{ maxLength: 13 }}
          label="Tel&eacute;fono de domicilio"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="celular" inputProps={{ maxLength: 13 }} label="Celular" />
      </Grid>
    </>
  )
}

export default index
