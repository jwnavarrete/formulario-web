import React, { useState, useEffect, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectOption from "@components/ui/_Select";
import MenuItem from "@mui/material/MenuItem";
import { NaturalContext } from "@context/Prestador/NaturalContext"

const index = () => {
  const { handleChangePeeps,estadoDisabled } = useContext(NaturalContext)

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Personas Expuestas Pol&iacute;ticamente</h3>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography align="justify">
            &iquest;Usted o sus familiares (c&oacute;nyuge, padres, hijos,
            abuelos, suegros, hijos del c&oacute;nyuge) o colaboradores
            cercanos desempe&ntilde;an o han desempe&ntilde;ado funciones
            p&uacute;blicas de alto grado en el &uacute;ltimo a&ntilde;o?
          </Typography>
        </>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="seleccionar_pep"
          label="Seleccionar"
          onChange={(e) => handleChangePeeps(e.target.value)}
          disabled={estadoDisabled}
          fullWidth
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
    </>
  );
};

export default index;
