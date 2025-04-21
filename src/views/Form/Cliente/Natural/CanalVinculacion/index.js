import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Input from "@components/ui/_Input";
// FORMULARIO ACTIONS REDUX
import { setPeep } from "@reducers/Cliente/formularioNatural/actions";
// Controles nuevos para las validaciones
import SelectOption from "@components/ui/_Select";

const index = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChangePeeps = (valor) => {
    // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    dispatch(setPeep(false));
    if (valor == "S") {
      dispatch(setPeep(true));
    }
  };

  return (
    <>
      <Grid item xs={9}></Grid>
      <Grid item xs={12}>
        <h3>Canal de vinculaci&oacute;n</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tipo_cliente_vinculacion"
          label="Canal de vinculaci&oacute;n"
          fullWidth
        >
          <MenuItem value={"D"}>Directo</MenuItem>
          <MenuItem value={"B"}>Broker</MenuItem>
          <MenuItem value={"C"}>Canal</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
            <Input
              name="nombre_referido"
              label="Nombres y Apellidos de la persona que refirió"
              fullWidth
            />
      </Grid>
    </>
  );
};

export default index;
