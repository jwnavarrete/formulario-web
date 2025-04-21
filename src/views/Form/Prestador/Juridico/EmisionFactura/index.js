import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"

// FORMULARIO ACTIONS REDUX
const index = () => {
  const {  
    handleDependInput,
    getDisableByName,
     handleChangeTipSolic, emiFactSolicitante ,formData
} = useContext(JuridicoContext)

  const formMethods = useFormContext();
  const { formState: { errors } } = formMethods; // retrieve all hook methods

  useEffect(()=>{
    
    const {cuestionario} = formData
    if(cuestionario?.solicitante){
      handleChangeTipSolic(cuestionario?.solicitante)
    }
  },[])

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Emisi&oacute;n de factura</h3>
        </>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="solicitante"
          label="Tipo de solicitante"
          onChange={(e) => handleChangeTipSolic(e.target.value)}
        >
          <MenuItem value={"S"}>Solicitante</MenuItem>
          <MenuItem value={"O"}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      
      <Grid item xs={12}>
        <></>
      </Grid>
      {!emiFactSolicitante && (
      
        <>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="nombre_razonsocial"
              label="Nombre o raz&oacute;n social"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOption name="tipoid" label="Tipo de ID" fullWidth>
              <MenuItem value={"C"}>C&eacute;dula</MenuItem>
              <MenuItem value={"R"}>Ruc</MenuItem>
              <MenuItem value={"P"}>Pasaporte</MenuItem>
            </SelectOption>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="num_identificacion_emi_factura"
              label="N&uacute;mero de ID"
              inputProps={{ maxLength: 13 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input name="telefono_sol" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono" fullWidth />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input name="direccion_sol" label="Direcci&oacute;n" fullWidth />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input name="relacionsolicitante" label="Relaci&oacute;n con el solicitante" fullWidth />
          </Grid>
        </>
      )}
      
    </>
  );
};

export default index;
