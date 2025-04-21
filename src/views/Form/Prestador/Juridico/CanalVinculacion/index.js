import React from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import SelectOption from "@components/ui/_Select";
import { useFormContext } from "react-hook-form";
import Input from "@components/ui/_Input";
// 
const index = () => {
    const { formState: { errors } } = useFormContext();

    return (
        <>
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
            <Grid item xs={12} md={6} lg={3}>
        <Input name="nombre_referido" label="Nombres y Apellidos de la persona que lo refirió" fullWidth />
      </Grid>
        </>
    )
}

export default index