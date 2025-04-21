import React, { useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { Box, Divider } from "@mui/material";

import { getCatalogo } from "@utils/Api/Catalogo";
//
const index = () => {
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(()  => {
    getCatalogo("pais", setCatalogoPais);

    
    getCatalogo(`actividadeco/`, (catalogo) =>{
      console.log("AQUI...")
      const catalogo_conyugue = getValues('actividad_eco_cony')
      // const catalogo_conyugue = "036002002"
      // console.log(catalogo_conyugue)
      // console.log(catalogo)

      const noEstaEnLista = !catalogo.some(actividad => actividad.codigo === catalogo_conyugue);
      if(noEstaEnLista){
        setValue('actividad_eco_cony', '')
      }

      setCatalogoActividadEco(catalogo)
    });
    
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <Divider textAlign="left">Datos del c&oacute;nyuge del solicitante</Divider>
      </Grid>
      {/* <Grid item xs={12}>
        <h3>Secci&oacute;n de C&oacute;nyuge</h3>
      </Grid> */}
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
      <Grid item xs={12} md={6} lg={6}>
        <Input name="email_cony" label="Email" fullWidth />
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
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="pais_domicilio_cony"
            label="Pa&iacute;s de domicilio"

          >
            {catalogoPais.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        {/* <Input name="actividad_eco_cony" label="Actividad Económica" fullWidth /> */}
        <SelectOption
          name="actividad_eco_cony"
          label="Actividad econ&oacute;mica"
        >
          {catalogoActividadEco.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="domicilio_cony" label="Domicilio" fullWidth />
      </Grid>



    </>
  );
};

export default index;
