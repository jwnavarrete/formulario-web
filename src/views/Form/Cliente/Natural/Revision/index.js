import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import { NaturalContext } from "@context/Cliente/NaturalContext"

// import { NaturalContext } from "@context/Prestador/NaturalContext"
// FORMULARIO ACTIONS REDUX
const index = () => {
   const { formData } = useContext(NaturalContext)

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(()=>{
    const {declaracion_ejecutivo} = formData;

    if(declaracion_ejecutivo){
      loadDeclaracion(declaracion_ejecutivo)
    }
  },[])

  const loadDeclaracion=(data)=>{
    Object.keys(data).map(function (name, index) {
      var value = data[name];
      if (value !== undefined && value !== null) {
        setValue(name, value);
      }
    });
  }

  return (
    <>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="h3">
          SOLO PARA USO EXCLUSIVO DE LA COMPAÑÍA:
          </Typography>
        </>
      </Grid>
      
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
              Complete los campos de revisión.
            </small>
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
            Confirmo que el formulario está correctamente lleno y firmado
           y se adjunta la documentación requerida en el mismo. Se ha
           revisado la razonabilidad de la información proporcionada por
           el cliente o contratante y he verificado la documentación e
           información solicitada de acuerdo con lo establecido en la
           Política "Conozca a su Cliente".
            </small>
          </Typography>
        </>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="nombre_ejecutivo"
          label="Nombre del ejecutivo encargado"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="lugar_ejecutivo"
          label="Lugar y fecha"
          fullWidth
        />
      </Grid>
      
      <Grid item xs={12}></Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Input
          name="observaciones"
          label="Detalle de Observaciones"
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
