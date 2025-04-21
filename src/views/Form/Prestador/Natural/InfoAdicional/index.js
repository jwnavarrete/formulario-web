import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { NaturalContext } from "@context/Prestador/NaturalContext"
// FORMULARIO ACTIONS REDUX
const index = () => {
  const { formData, referencias, disableTipoinfoadicional, handleTipoAsegurado, handleReferidoCompania } = useContext(NaturalContext)

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(()=>{
    const{cuestionario} = formData

    if(cuestionario){
      handleTipoAsegurado(cuestionario.vinculo)
    }
  },[formData])

  useEffect(()=>{

    if(getValues('vinculo')!='O'){
      setValue('especifique','')
    }
  },[watch('vinculo')])

  useEffect(()=>{


    handleReferidoCompania(getValues('referido'))
    

  },[,watch('referido')])

  return (
    <>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="h3">
            Informaci&oacute;n Adicional
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
              Si usted fue referido por la compa&ntilde;&iacute;a, favor
              se&ntilde;ale la referencia:
            </small>
          </Typography>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="referido"
          label="Referido por la compa&ntilde;&iacute;a"
          onChange={(e) => handleReferidoCompania(e.target.value)}
        >
          <MenuItem value={"S"}>SI</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12}></Grid>

      {!referencias.esReferido && (
        <>
          <Grid item xs={12} md={6} lg={6}>
            <Input
              name="nombre_apellido"
              label="Nombres y Apellidos"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <SelectOption
              name="vinculo"
              label="Vínculo"
              onChange={(e) => handleTipoAsegurado(e.target.value)}
            >
              <MenuItem value={"F"}>Familiar</MenuItem>
              <MenuItem value={"B"}>Broker</MenuItem>
              <MenuItem value={"O"}>Otro</MenuItem>
            </SelectOption>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="especifique"
              label="Especifique"
              disabled={disableTipoinfoadicional}
              fullWidth
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default index;
