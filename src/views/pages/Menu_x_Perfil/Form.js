import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";

// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

// CONTEXT
import { MenuPerfilContext } from "@context/MenuPerfilContext";

// NUEVOS CONTROLES
import { Card } from "@components/ui/Card";
import SelectOption from "@components/ui/_Select";

// Service
import logsService from "@services/LogsService";

// sweetalert
import swal from "sweetalert";

const initialState = {
    perfil_id: "",
    menu_id: "",
    orden: 0,
    lectura: true,
    escritura: true
}

const Form = () => {
    const {
        perfiles,
        loadMenus
    } = useContext(MenuPerfilContext);

    const {
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors },
    } = useFormContext({ defaultValues: initialState });

    // eventos
    const handleChangePerfil = (e) => {
        setValue("perfil_id", e.target.value)
        const perfil_id = getValues("perfil_id");
        loadMenus(e.target.value)
    }

    

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p>Men&uacute; x Perfil</p>
                    </Grid>
                    <Grid item xs={12} md={12} lg={3}>
                        <SelectOption
                            name="perfil_id"
                            label="Perfil"
                            onChange={handleChangePerfil}
                        >
                            {perfiles?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.descripcion}
                                </MenuItem>
                            ))}
                        </SelectOption>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default Form