import React, { useEffect, useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import { getCatalogo } from '@utils/Api/Catalogo'
import { calcularEdad, getFormattedDate } from '@utils/Api/utils.js'
import { JuridicoContext } from '@modules/Beneficiario/context/JuridicoContext'
// FORMULARIO ACTIONS REDUX

const index = () => {
  const {
    formData,
    getDisableByName,
    handleDependInput,
    handleChangeEstadoCivil,
  } = useContext(JuridicoContext)

  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([])
  const [catalogoProvincia, setCatalogoProvincia] = useState([])
  const [catalogoPais, setCatalogoPais] = useState([])
  const [catalogoCanton, setCatalogoCanton] = useState([])
  const [today, setToday] = useState();

  const formMethods = useFormContext()
  const { reset, setValue, clearErrors, setError } = formMethods // retrieve all hook methods

  useEffect(() => {
    const { solicitante } = formData

    getCatalogo('pais', setCatalogoPais)
    getCatalogo('provincia', setCatalogoProvincia)
    getCatalogo('nacionalidad', setCatalogoNacionalidad)
    getCatalogo(
      `cantones/${solicitante?.provincia_domicilio ?? ''}`,
      setCatalogoCanton,
    )

    var todayDate = getFormattedDate()
    setToday(todayDate)

    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    if (!solicitante) {
      clearData()
    }
  }, [formData])

  const clearData = () => {
    reset()
  }

  const handlePaisChange = (pais) => {
    handleDependInput(
      pais,
      'EC',
      ['provincia_domicilio', 'canton_domicilio'],
      formMethods,
    )
  }

  const handleChangeProvincia = (value) => {
    setValue('canton_domicilio', '')
    getCatalogo(`cantones/${value}`, setCatalogoCanton)
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

  return (
    <>
      <Grid item xs={12}>
        <h3>Informaci&oacute;n del representante legal o apoderado</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_identificacion"
          label="Tipo de identificaci&oacute;n"
        >
          <MenuItem value={'C'}>C&eacute;dula</MenuItem>
          <MenuItem value={'P'}>Pasaporte</MenuItem>
          <MenuItem value={'R'}>Ruc</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion"
          label="No.identificaci&oacute;n"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos" label="Apellidos" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres" label="Nombres" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="sexo" label="Sexo">
          <MenuItem value={'M'}>Masculino</MenuItem>
          <MenuItem value={'F'}>Femenino</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="est_civil"
          label="Estado civil"
          onChange={(e) => handleChangeEstadoCivil(e.target.value)}
        >
          <MenuItem value="01">Soltero</MenuItem>
          <MenuItem value="02">Casado</MenuItem>
          <MenuItem value="05">Divorciado</MenuItem>
          <MenuItem value="04">U/libre</MenuItem>
          <MenuItem value="03">Viudo</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="lugar_nacimiento" label="Lugar de nacimiento" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="fech_nacimiento"
          label="Fecha de nacimiento"
          type="Date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ max: today }}
          onBlur={(e) => handleChangeFecNacimiento(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nacionalidad" label="Nacionalidad">
          {catalogoNacionalidad.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12}>
        <Input name="direccion_domicilio" label="Dirección de domicilio" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="pais_domicilio"
          label="Pa&iacute;s"
          onChange={(e) => handlePaisChange(e.target.value)}
        >
          {catalogoPais.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_domicilio" label="Ciudad" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="provincia_domicilio"
          label="Provincia de domicilio"
          onChange={(e) => handleChangeProvincia(e.target.value)}
          disabled={getDisableByName('provincia_domicilio')}
        >
          {catalogoProvincia.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="canton_domicilio"
          label="Cantón de domicilio"
          disabled={getDisableByName('canton_domicilio')}
        >
          {catalogoCanton.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="profesion" label="Profesión" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="edad" label="Edad" disabled />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_domicilio"
          inputProps={{ maxLength: 13 }}
          label="Tel&eacute;fono domicilio"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_celular"
          inputProps={{ maxLength: 13 }}
          label="Tel&eacute;fono celular"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="email" label="E-mail" />
      </Grid>
    </>
  )
}

export default index
