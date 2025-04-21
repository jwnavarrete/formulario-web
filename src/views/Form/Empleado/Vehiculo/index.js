import React, { useEffect, useState } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
//
const index = () => {
  const [anios, setAnios] = useState([])
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    generaListaAnios()
  }, []);

  const generaListaAnios = () => {
    const currentYear = new Date().getFullYear() + 1;
    const startYear = currentYear - 30;
    const years = [];
    for (let i = startYear; i <= currentYear; i++) {
      years.push({ codigo: i, descripcion: i });
    }
    setAnios(years)
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Secci&oacute;n Veh&iacute;culo</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="placa" label="Placa" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="marca" label="Marca" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="modelo" label="Modelo" />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="anio"
          label="A&ntilde;o"
        >
          {anios.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>
    </>
  );
};

export default index;
