import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// CONTEXT
import { MenuPerfilContext } from "@context/MenuPerfilContext";
//ICONOS
import { FaSave } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

// NUEVOS CONTROLES
import { Card } from "@components/ui/Card";
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// import InputCurrency from "@components/ui/_InputCurrency";

// Service
import logsService from "@services/LogsService";
// sweetalert
import swal from "sweetalert";

import MenuItem from './MenuItem'

const MenuList = () => {
    const {
        menus
    } = useContext(MenuPerfilContext);

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p>Menú</p>
                    </Grid>
                    <Grid item xs={12}>
                        {menus.map(item => (
                           <MenuItem key={item.id} item={item}/>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Card>

    );
};

export default MenuList;
