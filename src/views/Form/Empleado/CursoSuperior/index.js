import React, { useContext, useEffect, useState } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// 
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
//
const index = () => {
  const { handleChangeFormacion, infoSuperior } = useContext(EmpleadoContext)
  const [anios, setAnios] = useState([])
  const [aniosCursando, setAniosCursando] = useState([])

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    generarAnios()
    generaAniosSalida()
  }, []);

const generarAnios = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 90;
    const years = [];
    for (let i = currentYear ; i >= startYear; i--) {
      years.push({ codigo: i, descripcion: i });
    }
    setAniosCursando(years)
  }

  const generaAniosSalida = () => {
    const currentYear = new Date().getFullYear()+10;
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
        <h3>Superior:</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tiene_superior"
            label="Superior"
            onChange={handleChangeFormacion("CursoSuperior")}
          >
            <MenuItem value={"S"}>Si</MenuItem>
            <MenuItem value={"N"}>No</MenuItem>
          </SelectOption>
        </Box>
      </Grid>

      {infoSuperior &&
        <>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="nombre_inst_superior"
              label="Nombre Instituci&oacute;n"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="lugar_superior"
              label="Lugar"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
        
            <Input name="anio_crusado_superior" label="&Uacute;ltimo A&ntilde;o cursado" fullWidth />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <SelectOption
              name="anio_salida_superior"
              label="A&ntilde;o de salida"
              fullWidth
            >
              {anios.map(({ codigo, descripcion }) => (
                  <MenuItem key={codigo} value={codigo}>
                  {descripcion}
                  </MenuItem>
              ))}
            </SelectOption>
            {/*<Input name="anio_salida_superior" label="A&ntilde;o de salida" fullWidth />*/}
          </Grid>
        </>}

    </>
  );
};

export default index;
