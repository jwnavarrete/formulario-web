import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";

// import { NaturalContext } from "@context/Prestador/NaturalContext"
// FORMULARIO ACTIONS REDUX
const index = () => {
  // const { handleReferidoCompania } = useContext(NaturalContext)

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="h3">
          DATOS DEL PRESTADOR DE SEVICIOS DE SEGUROS (BRÓKER)
          </Typography>
        </>
      </Grid>
      
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
              Complete los campos de revision.
            </small>
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
            Confirmo que el formulario está correctamente lleno y firmado y se adjunta
         la documentación requerida en el mismo. Se ha revisado la razonabilidad de la
         información proporcionada por el cliente o contratante y he verificado la documentación
         e información solicitada de acuerdo con lo establecido en la Política "Conocimiento del
          Prestador de Servicios de Seguros y Proveedor "
            </small>
          </Typography>
        </>
      </Grid>
      
      <Grid item xs={12} md={6} lg={3}>
        <></>
        <Input
          name="nombre_razonsocial"
          label="Nombre o Razón Social"
          fullWidth
        />
      </Grid>


      <Grid item xs={12} md={6} lg={3}>
        
        <Input
          name="identificacion_asesor"
          label="Identificaci&oacute;n del ejecutivo"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="nombre_asesor"
          label="Nombre del ejecutivo encargado"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Input
          name="lugar_asesor"
          label="Lugar y fecha"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}></Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Input
          name="observaciones_asesor"
          label="Detalle de Observaciones"
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
