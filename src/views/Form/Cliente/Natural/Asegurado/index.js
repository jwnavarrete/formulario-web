import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
import { getCatalogo } from "@utils/Api/Catalogo";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import {calcularEdad, getFormattedDate} from "@utils/Api/utils.js"

const index = () => {
  const { formData } = useContext(NaturalContext)

  const [disableTipAseguradoEspecif, setDisableTipAseguradoEspecif] = useState(true);
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const [today, setToday] = useState();
  // OBTENEMOS LAS VALIDACIONES DEL (USEFORMCONTEXT)
  const { setValue,formState: { errors } } = useFormContext();

  useEffect(() => {
    // reset();
    var todayDate = getFormattedDate();
    setToday(todayDate);

    getCatalogo("nacionalidad", setCatalogoNacionalidad);

    const{solicitante} = formData;
    if(solicitante){
      validateTipoAseg(solicitante?.tipo_asegurado)
    }
  }, []);

  const handleTipoAsegurado = (prop) => (event) => {
    validateTipoAseg(event.target.value);
  };

  const validateTipoAseg=(valor)=>{
    if (valor == "O") {
      setDisableTipAseguradoEspecif(false);
    } else {
      setDisableTipAseguradoEspecif(true);
      setValue('otro_asegurado','')
    }
  }

  const handleChangeFecha = (value) =>{
    const edad = calcularEdad(value)
   
    if(edad < 150 && !isNaN(edad) && value){
      
    }else{
      setValue("fech_nacimiento_aseg",'')
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>V&iacute;nculo entre el solicitante y asegurado</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_asegurado"
            label="Vínculo"
            onChange={handleTipoAsegurado()}
          >
            <MenuItem value={"C"}>Familiar</MenuItem>
            <MenuItem value={"P"}>Comercial</MenuItem>
            <MenuItem value={"L"}>Laboral</MenuItem>
            <MenuItem value={"N"}>Ninguna</MenuItem>
            <MenuItem value={"O"}>Otros</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="otro_asegurado"
          label="Especifique"
          disabled={disableTipAseguradoEspecif}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <h3>Datos del asegurado:</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion_aseg"
            label="Tipo de identificaci&oacute;n"
          >
            <MenuItem value={"C"}>C&eacute;dula</MenuItem>
            <MenuItem value={"P"}>Pasaporte</MenuItem>
            <MenuItem value={"R"}>Ruc Jurídico</MenuItem>
            <MenuItem value={"U"}>Ruc Natural</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_aseg"
          label="No.identificaci&oacute;n"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres_aseg" label="Nombres" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos_aseg" label="Apellidos" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="sexo_aseg" label="Sexo">
            <MenuItem value={"M"}>Masculino</MenuItem>
            <MenuItem value={"F"}>Femenino</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="est_civil_aseg" label="Estado civil">
            <MenuItem value={"01"}>Soltero</MenuItem>
            <MenuItem value={"02"}>Casado</MenuItem>
            <MenuItem value={"05"}>Divorciado</MenuItem>
            <MenuItem value={"04"}>U/libre</MenuItem>
            <MenuItem value={"03"}>Viudo</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="lugar_nacimiento_aseg"
          label="Lugar de nacimiento"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="fech_nacimiento_aseg"
          type="Date"
          label="Fecha de nacimiento"
          InputLabelProps={{
            shrink: true,
          }}
          onBlur = {(ev) => handleChangeFecha(ev.target.value)}
          inputProps={{ max: today }}

          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="nacionalidad_aseg" label="Nacionalidad">
            {catalogoNacionalidad.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Input
          name="direccion_domicilio_aseg"
          label="Direcci&oacute;n del domicilio"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_domicilio_aseg"
          label="Tel&eacute;fono de domicilio"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="email_aseg" label="E-mail personal" fullWidth />
      </Grid>
    </>
  );
};

export default index;
