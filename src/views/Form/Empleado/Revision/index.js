import React from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
// FORMULARIO ACTIONS REDUX
const index = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="h3">
            Uso exclusivo de Recursos Humanos
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
              Complete los campos de revision interna.
            </small>
          </Typography>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="identificacion_ejecutivo"
          label="Identificacion ejecutivo"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="nombre_ejecutivo"
          label="Nombre ejecutivo"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}></Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Input
          name="perfil_cargo"
          label="Perfil del cargo"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Input
          name="perfil_competencias"
          label="Perfil de competencias"
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
