import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { getCatalogo } from "@utils/Api/Catalogo";
import { TipoEmpresa } from "./TipoEmpresa";
import { Sector } from "./Sector";
import { tipoProveedor } from "./catalogoProveedor";
import NumberFormat from "@components/ui/_NumberFormat";
// 
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
//
const index = () => {
  // const [loading, setLoading] = useState(true)
  // , disableProvincia, handleChangePais
  const { isLoading, formData, handleChangePrestador, disableEspecifiqueSector, disableEspecifiqueTipoEmpresa, handleChangeTipoEmpresa, prestador ,handleGranContrib ,isGranContrib,
    handleDependInput,
    getDisableByName,
    tipoPrestador,
    setTipoPrestador,
    setValorAsegurado
  } = useContext(JuridicoContext)
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoProvincia, setCatalogoProvincia] = useState([]);
  const [disableProvincia, setDisableProvincia] = useState(false);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);
  const [disableIdentificacion, setDisableIdentificacion] = useState(true);
  const [catalogoTipoEmpresa,setCatalogoTipoEmpresa] = useState([]);

  const [today, setToday] = useState();

  const formMethods = useFormContext();
  
  const {
    setValue,
    reset,
    register,
    watch,
    getValues,
    formState: { errors },
  } = formMethods;

  useEffect(() => {

    getCatalogo("pais", setCatalogoPais);
    getCatalogo("provincia", setCatalogoProvincia);
    getCatalogo(`actividadeco/`, setCatalogoActividadEco);
    getCatalogo(`tipo_empresa/`, setCatalogoTipoEmpresa);
    //Modificar para q la info no se pierda
    var todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    if (formData) {
      const { info_prestador } = formData
      if (!info_prestador) {
        clearData();
        // setInitialData()
        
      }else{
        setTipoPrestador(info_prestador.tipo_prestador)
      }
      handleChangeSectorEmpresa(info_prestador?.sector_empresa?parseInt(info_prestador.sector_empresa):'')
      handleTipoBeneficiarioJur(info_prestador?.tipo_empresa)
      handleTipoMercado(info_prestador?.tipo_mercado)
    }

    if(getValues('is_contrib_especial') !== 'S' ){
      setValue('gran_contrib','')
    }else{
      handleGranContrib(getValues('is_contrib_especial'))
    }

  }, []);


  useEffect(() =>{
    if(getValues('is_contrib_especial') !== 'S' ){
      setValue('gran_contrib','')
    }
  },[isGranContrib])

  useEffect(()=>{
    if(tipoPrestador == '01'){
      setValue('regimen','')
      setValue('is_contrib_especial','')
      setValue('gran_contrib','')
    }
  },[tipoPrestador])

  const clearData = () => {
    reset();
  }


  useEffect(()=>{
    console.log('catalogoTipoEmpresa',catalogoTipoEmpresa)
    console.log('tipo_empresa',getValues('tipo_empresa'))
  },[,catalogoTipoEmpresa,watch('tipo_empresa')])
 

  // const setInitialData = () => {
  //   const { formulario } = formData
  //   console.log("Aqui..", formulario)
  //   if (formulario) {
  //     setValue("tipo_identificacion_empresa", formulario.tip_identificacion);
  //     setValue("num_identificacion_empresa", formulario.identificacion);
  //     setValue("correo_empresa", formulario.correo_prestador);
  //   }
  // }

  const handleTipoBeneficiarioJur = (value)=> {
    handleDependInput(
      value,
      '36',
      ['tipo_empresa_especifique'],
      formMethods
    )
  };

  
  const handleChangeSectorEmpresa=(value)=>{
    handleDependInput(
      value,
      '7',
      ['sector_empresa_especifique'],
      formMethods
  )

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

  const handleTipoMercado = (value) => {
    handleDependInput(
      value,
      'O',
      ['tipo_mercado_especifique'],
      formMethods
    )
  }

  if (isLoading) {
    return "Cargando datos, seccion solicitante."
  }

  return (
    <>
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
        <h3>Informaci&oacute;n del prestador de servicios</h3>
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
          label="Número de identificacion"
          fullWidth
          // onBlur={(e) => handleChangeIdentificacion(e)}
          disabled={disableIdentificacion}
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

      <Grid item xs={12} md={6} lg={6}>
        <Input name="razon_social_empresa" label="Razón Social" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="objeto_social_empresa" label="Objeto Social" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="tipo_inversion" label="Tipo de Inversión" />
      </Grid>

      {/*<Grid item xs={12} md={6} lg={3}>
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
        disabled ={getDisableByName('tipo_empresa_especifique')}/>
      </Grid>*/}

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

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_mercado"
          label="Tipo de Mercado:"
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

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Input name="direccion_empresa" label="Dirección de empresa" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="pais_empresa"
          label="Pa&iacute;s"
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

      <Grid item xs={12} md={6} lg={6}>
        <Input name="correo_empresa" label="Correo electrónico" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_empresa" inputProps={{ maxLength: 13 }} label="Teléfono" />
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
        <Input name="tipo_empresa_especifique" label="Especifique" disabled ={getDisableByName('tipo_empresa_especifique')} />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="sector_empresa" label="Sector" onChange={(e) => handleChangeSectorEmpresa(e.target.value)}>
          {Sector.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="sector_empresa_especifique" label="Especifique" 
        disabled={getDisableByName('sector_empresa_especifique')}
         />
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
                <MenuItem value={"S"}>Si</MenuItem>
                <MenuItem value={"N"}>No</MenuItem>
                
              </SelectOption>
            </Box>
          </Grid>
          <>
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
          </>
        }
        
      <Grid item xs={12} md={6} lg={3}>
        {/* onChange={handleChangeValorAsegurado()} */}
        <NumberFormat 
          name="val_asegurado"
          label="Suma Asegurada"
          inputProps={{ maxLength: 23}}
          onChange={handleChangeValorAsegurado()}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
 