import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { getCatalogo } from "@utils/Api/Catalogo";
import { tipoProveedor } from "./catalogoProveedor";
import { calcularEdad, getFormattedDate } from "@utils/Api/utils.js"
import { NaturalContext } from "@context/Prestador/NaturalContext"
//
const index = () => {
  const [today, setToday] = useState();
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoProvincia, setCatalogoProvincia] = useState([]);
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catalogoCanton, setCatalogoCanton] = useState([]);
  const [disableIdentificacion, setDisableIdentificacion] = useState(false)
  const { handleChangePrestador, handleChangeTipIdentificacionPrestador, formData, handleGranContrib, isGranContrib,
    handleDependInput,
    getDisableByName,
    tipoPrestador,
    setTipoPrestador
  } = useContext(NaturalContext)

  const formMethods = useFormContext();

  const {
    register,
    reset,
    setValue,
    getValues,
    setError, clearErrors,
    formState: { errors },
    watch,
  } = formMethods;

  useEffect(() => {
    const { info_prestador, formulario } = formData
    console.log('formData', JSON.stringify(formData))
    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    setDisableIdentificacion(true)
    // CARGAMOS LOS CATALOGOS
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("provincia", setCatalogoProvincia);
    getCatalogo("nacionalidad", setCatalogoNacionalidad);
    getCatalogo(`cantones/${info_prestador?.provincia_domicilio ?? ''}`, setCatalogoCanton)
    var todayDate = getFormattedDate();
    setToday(todayDate);

    if (formulario) {
      setTipoPrestador(formulario.tipo_prestador)
    }

    if (!info_prestador) {
      clearData();
      setInitialData()
    } else {
      setTipoPrestador(info_prestador.tipo_prestador)
      handleChangePrestador(info_prestador.est_civil)
    }
    if (getValues('is_contrib_especial') !== 'S') {
      setValue('gran_contrib', '')
    } else {
      handleGranContrib(getValues('is_contrib_especial'))
    }
    handleChangeFecNacimiento(info_prestador?.fech_nacimiento)
    setLoading(false)

    handleChangePais(info_prestador?.pais_domicilio)

  }, []);

  useEffect(() => {
    if (getValues('is_contrib_especial') !== 'S') {
      setValue('gran_contrib', '')
    }
  }, [isGranContrib])

  useEffect(() => {
    const { info_prestador } = formData
    if (info_prestador?.email) {
      setValue("email", info_prestador.email);
      setValue("email_recibir", info_prestador.email);
    }

  }, [formData])

  useEffect(() => {
    if (tipoPrestador == '01') {
      setValue('regimen', '')
      setValue('is_contrib_especial', '')
      setValue('gran_contrib', '')
    } else {
      if (getValues('is_contrib_especial') !== 'S') {
        setValue('gran_contrib', '')
      } else {
        handleGranContrib(getValues('is_contrib_especial'))
      }
    }
  }, [tipoPrestador])

  const clearData = () => {
    reset();
  }

  const setInitialData = () => {
    const { formulario } = formData
    if (formulario) {
      setValue("tipo_identificacion", formulario.tip_identificacion);
      setValue("tipo_prestador", formulario.tipo_prestador);
      setValue("num_identificacion", formulario.identificacion);
      setValue("email", formulario.correo_cliente);
      setValue("email_recibir", formulario.correo_cliente);
    }
  }


  const handleChangePais = (pais) => {
    handleDependInput(
      pais,
      'EC',
      ['provincia_domicilio', 'canton_domicilio'],
      formMethods
    )
  }

  const handleChangeProvincia = (value) => {
    setValue('canton_domicilio', '');
    getCatalogo(`cantones/${value}`, setCatalogoCanton)
  }

  const handleChangeFecNacimiento = (value) => {
    const edad = calcularEdad(value)
    if (edad > 17 && edad < 150 && !isNaN(edad) && value) {
      setValue("edad", edad)
      clearErrors("fech_nacimiento")
      clearErrors("edad")
    } else {
      setValue("edad", '')
      setValue("fech_nacimiento", '')
      setError("fech_nacimiento", { type: "custom", message: "Debe ser mayor de edad" })
    }

  }

  if (loading) {
    return "Cargando datos, seccion prestador."
  }

  return (
    <>
      <Grid item xs={12}>
        <h2>Formulario de Prestadores de Servicios de Seguros y Proveedores P. Natural</h2>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_prestador"
          label="Prestador"
          onChange={handleChangePrestador("tipo_prestador")}
        >
          {tipoProveedor.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12}>
        <h3>Informaci&oacute;n del prestador de servicios de seguros</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion"
            label="Tipo de identificaci&oacute;n"
            onChange={(e) => handleChangeTipIdentificacionPrestador(e.target.value)}
            disabled={disableIdentificacion}
          >
            <MenuItem value={"C"}>C&eacute;dula</MenuItem>
            <MenuItem value={"P"}>Pasaporte</MenuItem>
            <MenuItem value={"U"}>Ruc</MenuItem>
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
        <Input name="nombres" label="Nombres" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos" label="Apellidos" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="sexo" label="Sexo">
            <MenuItem value={"M"}>Masculino</MenuItem>
            <MenuItem value={"F"}>Femenino</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="est_civil"
            label="Estado civil"
            onChange={handleChangePrestador("est_civil")}
          >
            <MenuItem value="01">Soltero</MenuItem>
            <MenuItem value="02">Casado</MenuItem>
            <MenuItem value="05">Divorciado</MenuItem>
            <MenuItem value="04">Unión de hecho</MenuItem>
            <MenuItem value="03">Viudo</MenuItem>
          </SelectOption>
        </Box>
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
          onBlur={(e) => handleChangeFecNacimiento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}

          inputProps={{ max: today }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="edad" label="Edad" type="number" disabled={true} />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="profesion" label="Profesión" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
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

      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="direccion_domicilio"
          label="Direcci&oacute;n del domicilio"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_domicilio" label="Ciudad  de domicilio" />
      </Grid>



      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="pais_domicilio"
            label="Pa&iacute;s de domicilio"
            onChange={(ev) => handleChangePais(ev.target.value)}

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
        <Box sx={{ minWidth: 120 }}>
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
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
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
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_convencional" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono convencional" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_celular" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono celular" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="email" label="E-mail personal" />
      </Grid>
      {
        tipoPrestador != '01' &&
        <>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption
                name="regimen"
                label="Régimen"
              >
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"rimpe_emprendedor"}>RIMPE Emprendedor</MenuItem>
                <MenuItem value={"rimpe_negocio_popular"}>RIMPE Negocio Popular</MenuItem>

              </SelectOption>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption
                name="is_contrib_especial"
                label="Es contribuyente especial?"
                onChange={(ev) => handleGranContrib(ev.target.value)}
              >
                <MenuItem value={"S"}>SI</MenuItem>
                <MenuItem value={"N"}>NO</MenuItem>

              </SelectOption>
            </Box>
          </Grid>
          {
            isGranContrib &&
            <Grid item xs={12} md={6} lg={3}>
              <Box sx={{ minWidth: 120 }}>
                <SelectOption
                  name="gran_contrib"
                  label="Es gran contribuyente?"
                >
                  <MenuItem value={"S"}>SI</MenuItem>
                  <MenuItem value={"N"}>NO</MenuItem>
                </SelectOption>
              </Box>
            </Grid>
          }
        </>
      }
      <Grid item xs={12}>
        <h3>Persona de contacto</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="celular_contacto" inputProps={{ maxLength: 13 }} label="Número de teléfono persona de contacto" />
      </Grid>

    </>
  );
};

export default index;
