import React ,{useState,useEffect} from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { getCatalogo } from "@utils/Api/Catalogo";
//
const index = () => {
  const [catalogoActividadEco,setCatalogoActividadEco] = useState([]);
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(()=>{
    getCatalogo(`actividadeco/`, setCatalogoActividadEco);
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
          {/* <MenuItem value={"R"}>Ruc</MenuItem> */}
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_cony"
          inputProps={{ maxLength: 13 }}
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
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="actividad_eco_cony"
            label="Actividad Económica"
            
          >
            {catalogoActividadEco.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="domicilio_cony" label="Domicilio" fullWidth />
      </Grid>
    </>
  );
};

export default index;
