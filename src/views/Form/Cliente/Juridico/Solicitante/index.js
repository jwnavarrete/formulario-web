import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import NumberFormat from "@components/ui/_NumberFormat";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
import {calcularEdad, getFormattedDate} from "@utils/Api/utils.js"

const index = () => {
  // const [loading, setLoading] = useState(true)
  const {isLoading, formData, catalogoActividadEco, setCatalogoActividadEco, handleDependInput ,getDisableByName,setValorAsegurado} = useContext(JuridicoContext)
  const [disableIdentificacion, setDisableIdentificacion] = useState(false)
  const [catalogoRamo, setCatalogoRamo] = useState([]);
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoProvincia, setCatalogoProvincia] = useState([]);
  const [catalogoSector, setCatalogoSector] = useState([]);
  const [catalogoTipoEmpresa,setCatalogoTipoEmpresa] = useState([]);
  const [today, setToday] = useState();
  const [catalogoCantones,setCatalogoCantones] = useState([]);
  const formMethods =useFormContext(); 

  const {
      setValue,
      reset
  } = formMethods// retrieve all hook methods

  const handleTipoBeneficiarioJur = (value) => {

    handleDependInput(
      value,
      '36',
      ['tipo_empresa_especifique'],
      formMethods
    )

  };

  const handleTipoMercado = (value) => {
    handleDependInput(
      value,
      'O',
      ['tipo_mercado_especifique'],
      formMethods
    )
  }

  useEffect(() => {
    const { solicitante } = formData
    // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
    setDisableIdentificacion(true)
    // 
    getCatalogo("ramo", setCatalogoRamo);
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("provincia", setCatalogoProvincia);
    getCatalogo(`cantones/${solicitante?.provincia_empresa??''}`,setCatalogoCantones)
    // 
    getCatalogo("sector", setCatalogoSector);
    // getCatalogo(`actividadeco/`, setCatalogoActividadEco);
    getCatalogo(`tipo_empresa/`, setCatalogoTipoEmpresa);
    
    //Modificar para q la info no se pierda
    var todayDate = getFormattedDate();
    setToday(todayDate);

    handleTipoBeneficiarioJur(solicitante?.tipo_empresa)
    handleTipoMercado(solicitante?.tipo_mercado)
    if (!solicitante) {

      if(solicitante?.sector_empresa){
        loadActividadBySector(solicitante?.sector_empresa)
      }
      clearData();
    }
  }, [formData]);

  const clearData = () => {
    reset();
  }



  const handleChangePais = (value) => {
    handleDependInput(
      value,
      'EC',
      ['canton_empresa','provincia_empresa'],
      formMethods
    )
  };

  const loadActividadBySector = (value) =>{
    setValue('actividad_empresa', '')
    getCatalogo(`actividadeco/${value}`, setCatalogoActividadEco);
  }

  const handleChangeSector = (value) => {
    // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    if(value){
      loadActividadBySector(value)
    }
  };

  const handleChangeProvincia = (value) =>{
    setValue('canton_empresa','');
    if(value){
      getCatalogo(`cantones/${value}` ,setCatalogoCantones)
    }
  }

  const handleChangeValorAsegurado = (prop) => (e) => {
    let valor = replaceCurrencySymbol(e.target.value);
    setValue("val_asegurado", valor);
    setValorAsegurado(valor)
  };

  const replaceCurrencySymbol = (value) => {
    if (value) {
      return value.replace(/$|,|/g, "");
    }
    return value;
  };
  
  const handleChangeFecha = (value) =>{
    const edad = calcularEdad(value)
   
    if(edad < 150 && !isNaN(edad) && value){
      
    }else{
      setValue("fecha_constitucion_empresa",'')
    }
  }

  if (isLoading ) {
    return "Cargando datos, seccion solicitante."
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>
          FORMULARIO "CONOCIMIENTO DEL CLIENTE" (Persona Jur&iacute;dica B1-normal)
        </h3>
      </Grid>
      <Grid item xs={12}>
        <h3>Secci&oacute;n de solicitante</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_identificacion_empresa"
          label="Tipo de identificaci&oacute;n"
          defaultValue={"R"}
          disabled={disableIdentificacion}
        >
          <MenuItem value={"R"}>Ruc</MenuItem>
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
        <SelectOption name="sector_empresa" label="Sector" onChange={(e) => handleChangeSector(e.target.value)}>
          {catalogoSector.map(({ id, descripcion }) => (
            <MenuItem key={id} value={id}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
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
        <Input name="objeto_social_empresa" label="Objeto Social" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="tipo_inversion" label="Tipo de Inversión" />
      </Grid>
     

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="direccion_empresa" label="Dirección de empresa" />
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
        <SelectOption
          name="provincia_empresa"
          label="Provincia empresa"
          onChange={(ev)=>handleChangeProvincia(ev.target.value)}
          disabled={getDisableByName('provincia_empresa')}
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
          name="canton_empresa"
          label="Cantón empresa"
          disabled={getDisableByName('canton_empresa')}
        >
          {catalogoCantones.map(({ codigo, descripcion }) => (
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
        <Input
          name="fecha_constitucion_empresa"
          label="Fecha de Constituci&oacute;n"
          type="Date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={(e) => handleChangeFecha(e.target.value)}
          // inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
          inputProps={{ max: today }}
        // maxDate={new Date()}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="correo_empresa" label="Correo electrónico" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_empresa" inputProps={{ maxLength: 13 }} label="Teléfono"/>
      </Grid>

      

      {/*<Grid item xs={12}>
        <Divider />
          </Grid>*/}

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
        <Input name="tipo_empresa_especifique" label="Especifique" 
        disabled ={getDisableByName('tipo_empresa_especifique')}
      
      />

      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_mercado"
          label="Sector Mercado:"
          onChange={(ev) => handleTipoMercado(ev.target.value)}
        >
         
           <MenuItem value={"C"}>Comercial</MenuItem>
           <MenuItem value={"I"}>Industrial</MenuItem>
           <MenuItem value={"S"}>Servicios</MenuItem>
           <MenuItem value={"F"}>Financiero</MenuItem>
           <MenuItem value={"A"}>Agrícola</MenuItem>
           <MenuItem value={"SL"}>Soc. sin fines de lucro  </MenuItem>
           <MenuItem value={"O"}>Otros</MenuItem>
       
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="tipo_mercado_especifique" label="Especifique" 
        disabled ={getDisableByName('tipo_mercado_especifique')}
      />
      </Grid>


      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="situacion_legal"
          label="Situación legal de la compañía:"
        >
         
           <MenuItem value={"A"}>Activa</MenuItem>
           <MenuItem value={"D"}>Disuelta y Liquidada</MenuItem>
           <MenuItem value={"C"}>Cancelada</MenuItem>
           <MenuItem value={"I"}>Inactiva</MenuItem>
       
        </SelectOption>
      </Grid>
    


      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="mail_empresa" label="E-mail para recibir su factura / formulario de retenci&oacute;n" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="contacto_empresa"
          label="Persona de Contacto (Nombre y Apellido)"
        />
      </Grid>

      <Grid item xs={12}>
        <Divider />
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
          <SelectOption name="tipo_seguro" label="Ramo">
            {catalogoRamo.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        {/* onChange={handleChangeValorAsegurado()} */}
        <NumberFormat 
          name="val_asegurado"
          label="Suma Asegurada"
          inputProps={{ maxLength: 13 }}
          onChange={handleChangeValorAsegurado()}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
