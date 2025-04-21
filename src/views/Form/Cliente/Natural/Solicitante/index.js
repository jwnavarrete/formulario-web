import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import {Typography, Divider, MenuItem, Box, Grid} from "@mui/material";
import Asegurado from "@views/Form/Cliente/Natural/Asegurado";
import Beneficiario from "@views/Form/Cliente/Natural/Beneficiario";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import NumberFormat from "@components/ui/_NumberFormat";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import { getCatalogo } from "@utils/Api/Catalogo";
import {calcularEdad} from "@utils/Api/utils.js"

const index = () => {
  const [loading, setLoading] = useState(true)
  const { formData, solicitante,  handleChangeSolicitante, setValorAsegurado, handleDependInput ,getDisableByName} = useContext(NaturalContext)
  const [disableIdentificacion, setDisableIdentificacion] = useState(false)
  const [catalogoRamo, setCatalogoRamo] = useState([]);
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoProvincia, setCatalogoProvincia] = useState([]);
  const [catalogoCanton, setCatalogoCanton] = useState([]);
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const [today, setToday] = useState();
  //
  const formMethods = useFormContext();
  
  const {
    setValue,
    reset,
    setError,
    clearErrors,
  }  = formMethods;

  useEffect(() => {
    const { solicitante } = formData
    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    setDisableIdentificacion(true)
    // CARGAMOS LOS CATALOGOS
    getCatalogo("ramo", setCatalogoRamo);
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("provincia", setCatalogoProvincia);
    getCatalogo("nacionalidad", setCatalogoNacionalidad);
    getCatalogo(`cantones/${solicitante?.provincia_domicilio??''}`,setCatalogoCanton)
    var todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    
    if (!solicitante) {
      clearData();
    }
    
    //loadInputsDepend(['provincia_domicilio','canton_domicilio'])
    handlePaisChange(solicitante?.pais_domicilio)
    handleChangeFecNacimiento(solicitante?.fech_nacimiento)
    setLoading(false)
  }, [formData]);
  const clearData = () => {
    reset();
  }

  const replaceCurrencySymbol = (value) => {
    if (value) {
      return value.replace(/$|,|/g, "");
    }
    return value;
  };

  const handleChangeValorAsegurado = (prop) => (e) => {
    let valor = replaceCurrencySymbol(e.target.value);
    setValue("val_asegurado", valor);
    setValorAsegurado(valor)
  };

  
  const handleChangeFecNacimiento = (value) => {
    const edad = calcularEdad(value)
   
    if(edad > 17 && edad < 150 && !isNaN(edad) && value){
      setValue("edad",edad)
      clearErrors('edad');
      clearErrors("fech_nacimiento")
    }else{
      setValue("edad",'')
      setValue("fech_nacimiento",'')
      setError("fech_nacimiento" ,{ type: "custom", message: "Debe ser mayor de edad"})
    }
  }


  const handlePaisChange = (pais) =>{

    handleDependInput(
        pais,
        'EC',
        ['provincia_domicilio','canton_domicilio'],
        formMethods
    )

  }

  const handleChangeProvincia = (value) =>{
    setValue('canton_domicilio','');
    getCatalogo(`cantones/${value}` ,setCatalogoCanton)
  }

  if (loading) {
    return "Cargando datos, seccion solicitante."
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>
          Persona Natural A1-normal
        </h3>
      </Grid>
      <Grid item xs={12}>
        <h3>Secci&oacute;n de solicitante</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion"
            label="Tipo de identificaci&oacute;n"
            disabled={disableIdentificacion}
          >
            <MenuItem value={"C"}>C&eacute;dula</MenuItem>
            <MenuItem value={"P"}>Pasaporte</MenuItem>
            <MenuItem value={"R"}>Ruc</MenuItem>
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
        <Input name="nombres" label="Nombres" helperText="Llenar dos nombres si es posible." required/>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos" label="Apellidos" helperText="Llenar dos apellidos si es posible." required/>
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
            onChange={handleChangeSolicitante("est_civil")}
          >
            <MenuItem value="01">Soltero</MenuItem>
            <MenuItem value="02">Casado</MenuItem>
            <MenuItem value="05">Divorciado</MenuItem>
            <MenuItem value="04">U/libre</MenuItem>
            <MenuItem value="03">Viudo</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
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
      <Grid item xs={12} md={6} lg={1}>
        <Input name="edad" label="Edad" disabled={true}/>
      </Grid>

      
      <Grid item xs={12}>
        <Divider textAlign="left">Direcci&oacute;n</Divider>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="pais_domicilio"
            label="Pa&iacute;s de domicilio"
            onChange = {(e) => handlePaisChange(e.target.value)}
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
            onChange = {(e) => handleChangeProvincia(e.target.value)}
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
        <Input name="ciudad_domicilio" label="Ciudad  de domicilio" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_domicilio" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono de domicilio" />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="celular" inputProps={{ maxLength: 13 }} label="Celular"  />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="profesion" label="Profesión" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="direccion_domicilio"
          label="Direcci&oacute;n del domicilio"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="lugar_nacimiento" label="Lugar de nacimiento" />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="email" label="E-mail personal" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="email_recibir"
          label="E-mail para recibir su factura / formulario de retenci&oacute;n"
        />
      </Grid>
      
{/* 
      
      <Grid item xs={12}>
        <Divider />
      </Grid> */}

      


      <Grid item xs={12}>
        <h3>Persona de contacto</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="persona_contacto" label="Persona de contacto" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="celular_contacto" inputProps={{ maxLength: 13 }} label="Celular"/>
      </Grid>

      <Grid item xs={12}>
        <h3>Datos de la relaci&oacute;n comercial</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="tipo_cliente" label="Cliente">
            <MenuItem value={"N"}>Nuevo</MenuItem>
            <MenuItem value={"R"}>Renovado</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="tipo_seguro" label="Tipo de Seguro">
            {catalogoRamo.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat 
        name="val_asegurado"
        inputProps={{ maxLength: 23}}
        label="Suma Asegurada" fullWidth onChange={handleChangeValorAsegurado()} 
        
        />
      </Grid>
{/* 
      <Grid item xs={12}>
        <Divider />
      </Grid> */}

      <Grid item xs={12}>
        <Divider textAlign="left">Sección Asegurado</Divider>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="select_asegurado"
            label="Es asegurado"
            onChange={handleChangeSolicitante("esasegurado")}
          >
            <MenuItem value={"S"}>SI</MenuItem>
            <MenuItem value={"N"}>NO</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      {/* Datos del Asegurado */}
      {solicitante.esAsegurado && <Asegurado />}


      <Grid item xs={12}>
        <Divider textAlign="left">Sección Beneficiario</Divider>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="select_beneficiario"
            label="Es beneficiario"
            onChange={handleChangeSolicitante("esbeneficiario")}
          >
            <MenuItem value={"S"}>SI</MenuItem>
            <MenuItem value={"N"}>NO</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
     

        {/* Datos del Beneficiario */}
        {solicitante.esBeneficiario && <Beneficiario />}

    </>
  );
};

export default index;
