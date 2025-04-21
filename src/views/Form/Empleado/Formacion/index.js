import React, { useContext, useEffect, useState } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
//
const index = () => {

  const { handleChangeFormacion, formData } = useContext(EmpleadoContext)
  const [anios, setAnios] = useState([])
  const [aniosCursando, setAniosCursando] = useState([])

  // 
  const {
    register,
    formState: { errors },
  } = useFormContext();


  useEffect(() => {
    generaAniosSalida()
    generaAniosCursando()
  }, []);

const generaAniosCursando = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 90;
    const years = [];
    for (let i = currentYear ; i >= startYear; i--) {
      years.push({ codigo: i, descripcion: i });
    }
    setAniosCursando(years)
  }

  const generaAniosSalida = () => {
    const currentYear = new Date().getFullYear()+5;
    const startYear = currentYear - 90;
    const years = [];
    for (let i = currentYear ; i >= startYear; i--) {
      years.push({ codigo: i, descripcion: i });
    }
    setAnios(years)
  }

  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <h3>Primaria:</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="nombre_inst_primaria"
          label="Nombre Instituci&oacute;n"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="lugar_primaria"
          label="Lugar"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="anio_crusado_primaria" label="&Uacute;ltimo A&ntilde;o cursado" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
            name="anio_salida_primaria"
            label="A&ntilde;o de salida"
            fullWidth
          >
            {anios.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                {descripcion}
                </MenuItem>
            ))}
          </SelectOption>
        {/*<Input name="anio_salida_primaria" label="A&ntilde;o de salida" fullWidth />*/}
      </Grid>

      <Grid item xs={12}>
        <h3>Secundaria:</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="nombre_inst_secundaria"
          label="Nombre Instituci&oacute;n"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="lugar_secundaria"
          label="Lugar"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        
        <Input name="anio_crusado_secundaria" label="&Uacute;ltimo A&ntilde;o cursado" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
            name="anio_salida_secundaria"
            label="A&ntilde;o de salida"
            fullWidth
          >
            {anios.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                {descripcion}
                </MenuItem>
            ))}
          </SelectOption>
        {/*<Input name="anio_salida_secundaria" label="A&ntilde;o de salida" fullWidth />*/}
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tiene_certificaciones"
            label="Incluir certificaciones"
            onChange={handleChangeFormacion("certificaciones")}
          >
            <MenuItem value={"S"}>Si</MenuItem>
            <MenuItem value={"N"}>No</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tiene_idiomas"
            label="Incluir idiomas"
            onChange={handleChangeFormacion("idiomas")}
          >
            <MenuItem value={"S"}>Si</MenuItem>
            <MenuItem value={"N"}>No</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
    </>
  );
};

export default index;
