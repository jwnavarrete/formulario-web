import React, { useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import SelectOption from "@components/ui/_Select";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"

const index = () => {
  const { handleChangePeeps } = useContext(JuridicoContext)
  const { formState: { errors } } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Personas Expuestas Pol&iacute;ticamente</h3>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <p>
            <small>
              &iquest;Usted o sus familiares (c&oacute;nyuge, padres, hijos,
              abuelos, suegros, hijos del c&oacute;nyuge) o colaboradores
              cercanos desempe&ntilde;an o han desempe&ntilde;ado funciones
              p&uacute;blicas de alto grado en el &uacute;ltimo a&ntilde;o?
            </small>
          </p>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="seleccionar_pep"
          label="Seleccionar"
          onChange={(e) => handleChangePeeps(e.target.value)}
          fullWidth
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={9}></Grid>
    </>
  );
};

export default index;
