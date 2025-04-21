import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import { JuridicoContext } from '@modules/Beneficiario/context/JuridicoContext'

// FORMULARIO ACTIONS REDUX
import { getCatalogo } from '@utils/Api/Catalogo'

const index = () => {
  const { formData, getDisableByName, handleDependInput } =
    useContext(JuridicoContext)

  const [disableIdentificacion, setDisableIdentificacion] = useState(false)
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([])
  const [catalogoPais, setCatalogoPais] = useState([])
  const [catalogoTipoEmpresa, setCatalogoTipoEmpresa] = useState([])
  const formMethods = useFormContext()

  const { reset } = formMethods // retrieve all hook methods

  const handleTipoBeneficiarioJur = (value) => {
    handleDependInput(value, '34', ['tipo_empresa_especifique'], formMethods)
  }

  const handleTipoMercado = (value) => {
    handleDependInput(value, 'O', ['tipo_mercado_especifique'], formMethods)
  }

  useEffect(() => {
    const { solicitante } = formData
    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    setDisableIdentificacion(true)
    //
    getCatalogo('pais', setCatalogoPais)
    getCatalogo(`actividadeco/`, setCatalogoActividadEco)
    getCatalogo(`tipo_empresa/`, setCatalogoTipoEmpresa)
    handleTipoBeneficiarioJur(solicitante?.tipo_empresa)
    handleTipoMercado(solicitante?.tipo_mercado)
    //
    if (!solicitante) {
      if (solicitante?.sector_empresa) {
        loadActividadBySector(solicitante?.sector_empresa)
      }
      clearData()
    }
  }, [formData])

  const clearData = () => {
    reset()
  }

  const handleChangePais = (value) => {
    handleDependInput(
      value,
      'EC',
      ['canton_empresa', 'provincia_empresa'],
      formMethods,
    )
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Secci&oacute;n de solicitante</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_identificacion_empresa"
          label="Tipo de identificaci&oacute;n"
          defaultValue={'R'}
          disabled={disableIdentificacion}
        >
          <MenuItem value={'R'}>Ruc</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_empresa"
          label="Número de RUC"
          fullWidth
          // onBlur={(e) => handleChangeIdentificacion(e)}
          disabled={disableIdentificacion}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="razon_social_empresa" label="Razón Social" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="tipo_inversion" label="Tipo de Inversión" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="objeto_social_empresa" label="Objeto Social" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="direccion_empresa" label="Dirección de empresa" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="correo_empresa" label="Correo electrónico" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_empresa"
          inputProps={{ maxLength: 13 }}
          label="Teléfono"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="actividad_empresa" label="Actividad">
          {catalogoActividadEco.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="pais_empresa"
          label="Pa&iacute;s"
          onChange={(ev) => handleChangePais(ev.target.value)}
        >
          {catalogoPais.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_empresa" label="Ciudad empresa" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_empresa"
          label="La empresa es:"
          onChange={(ev) => handleTipoBeneficiarioJur(ev.target.value)}
        >
          {catalogoTipoEmpresa.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="tipo_empresa_especifique"
          label="Especifique"
          disabled={getDisableByName('tipo_empresa_especifique')}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_mercado"
          label="Sector Mercado:"
          onChange={(ev) => handleTipoMercado(ev.target.value)}
        >
          <MenuItem value={'C'}>Comercial</MenuItem>
          <MenuItem value={'I'}>Industrial</MenuItem>
          <MenuItem value={'S'}>Servicios</MenuItem>
          <MenuItem value={'F'}>Financiero</MenuItem>
          <MenuItem value={'A'}>Agrícola</MenuItem>
          <MenuItem value={'SL'}>Soc. sin fines de lucro </MenuItem>
          <MenuItem value={'O'}>Otros</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="tipo_mercado_especifique"
          label="Especifique"
          disabled={getDisableByName('tipo_mercado_especifique')}
        />
      </Grid>
    </>
  )
}

export default index
