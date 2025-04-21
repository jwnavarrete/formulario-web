import React,{useState,useEffect} from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import Box from "@mui/material/Box";

import { getCatalogo } from "@utils/Api/Catalogo";
//
const index = () => {

  
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);

  useEffect(() =>{

    getCatalogo("nacionalidad", setCatalogoNacionalidad);

  },[])

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
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_cony"
          label="No.identificaci&oacute;n"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres_cony" label="Nombres" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="apellidos_cony" label="Apellidos" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="nacionalidad_cony" label="Nacionalidad">
            {catalogoNacionalidad.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="separacion_bienes_cony"
          label="Separación de Bienes"
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="email_cony" label="Email" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="domicilio_cony" label="Domicilio" fullWidth />
      </Grid>
    </>
  );
};

export default index;
