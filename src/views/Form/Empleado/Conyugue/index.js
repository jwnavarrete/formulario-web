import React from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
//
const index = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <h3>Secci&oacute;n de C&oacute;nyuge</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_identificacion_cony"
          label="Tipo de identificaci&oacute;n"
        >
          <MenuItem value={"C"}>C&eacute;dula</MenuItem>
          <MenuItem value={"P"}>Pasaporte</MenuItem>
          {/* <MenuItem value={"R"}>Ruc</MenuItem> */}
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_cony"
          label="No.identificaci&oacute;n"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres_cony" label="Nombres" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos_cony" label="Apellidos" fullWidth />
      </Grid>
    </>
  );
};

export default index;
