import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
import {calcularEdad, getFormattedDate} from "@utils/Api/utils.js"

// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
const index = () => {
  const { handleChangePrestador/*, handleChangePais*/ ,formData,loadData,hash,
  handleDependInput ,
  getDisableByName
} = useContext(JuridicoContext)
  const {info_prestador,representante} = formData||{}
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoProvincia, setCatalogoProvincia] = useState([]);
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const [disableProvincia, setDisableProvincia] = useState(false);
  const [today, setToday] = useState();
  const [catalogoCantones,setCatalogoCantones] = useState([]);
  //
  const formMethods =useFormContext(); 

  const {
    watch,setValue,getValues,setError,clearErrors,
    formState: { errors }
  } = formMethods; // retrieve all hook methods


  useEffect(() => {

    
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("provincia", setCatalogoProvincia);
    getCatalogo("nacionalidad", setCatalogoNacionalidad);
    getCatalogo(`cantones/${info_prestador?.provincia_domicilio??''}`,setCatalogoCantones)
    var todayDate = getFormattedDate();
    setToday(todayDate);
    if(getValues('pais_domicilio') !='EC'){
      setValue('provincia_domicilio','')
      setDisableProvincia(true)
    }
    setValue('tipo_prestador',info_prestador.tipo_prestador??'')
    handleChangeFecNacimiento(representante?.fech_nacimiento??'')
    handleChangePais(representante?.pais_domicilio??'')
  }, []);


  const handleChangePais = (value) => {

    handleDependInput(
      value,
      'EC',
      ['canton_domicilio','provincia_domicilio'],
      formMethods
    )

  };

  const handleChangeProvincia = (value) =>{
    setValue('canton_domicilio','');
    getCatalogo(`cantones/${value}` ,setCatalogoCantones)
  }

  const handleChangeFecNacimiento = (value) => {
    const edad = calcularEdad(value)
    if(edad > 17 && edad < 150 && !isNaN(edad) && value){
      setValue("edad",edad)
      clearErrors("fech_nacimiento")
      clearErrors("edad")
    }else{
      setValue("edad",'')
      setValue("fech_nacimiento",'')
      setError("fech_nacimiento" ,{ type: "custom", message: "Debe ser mayor de edad"})
    }
}

  return (
    <>
      <Grid item xs={12}>
        <h3>Informaci&oacute;n del Representante legal o Apoderado</h3>
      </Grid>
      <Input
          name="tipo_prestador"
          label=""
          style={{display:'none'}}
          type='hidden'
          fullWidth
        />
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_identificacion"
          label="Tipo de identificaci&oacute;n"
        >
          <MenuItem value={"C"}>C&eacute;dula</MenuItem>
          <MenuItem value={"P"}>Pasaporte</MenuItem>
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
        <Input name="nombres" label="Nombres" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos" label="Apellidos" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="sexo" label="Sexo">
          <MenuItem value={"M"}>Masculino</MenuItem>
          <MenuItem value={"F"}>Femenino</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="est_civil"
          label="Estado civil"
          onChange={handleChangePrestador("est_civil")}
        >
          <MenuItem value="01">Soltero</MenuItem> 
          <MenuItem value="02">Casado</MenuItem> 
          <MenuItem value="05">Divorciado</MenuItem> 
          <MenuItem value="04">Uni&oacute;n de Hecho</MenuItem> 
          <MenuItem value="03">Viudo</MenuItem> 
        </SelectOption>
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
        <Input name="edad" label="Edad" type="number" disabled={true}/>
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
      <Grid item xs={12} md={6} lg={6}>
        <Input name="profesion" label="Profesión" />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
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
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="provincia_domicilio"
          label="Provincia de domicilio"
          onChange={(ev)=>handleChangeProvincia(ev.target.value)}
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
          label="Cantón domicilio"
          disabled={getDisableByName('canton_domicilio')}
        >
          {catalogoCantones.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_domicilio" label="Ciudad  de domicilio" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="telefono_domicilio" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono de domicilio" />
      </Grid>

      <Grid item xs={12}>
        <Input
          name="direccion_domicilio"
          label="Direcci&oacute;n del domicilio"
        />
      </Grid>

      {/* <Grid item xs={12} md={6} lg={6}>
        <Input name="lugar_nacimiento" label="Lugar de nacimiento" />
      </Grid> */}

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="email" label="E-mail personal" />
      </Grid>

      {/* <Grid item xs={12} md={6} lg={6}>
        <Input
          name="email_recibir"
          label="E-mail para recibir su factura / formulario de retenci&oacute;n"
        />
      </Grid> */}
    </>
  );
};

export default index;
