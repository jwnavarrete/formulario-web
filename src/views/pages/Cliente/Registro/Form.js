import React from "react";
// MATERIAL COMPONENTS
import Box from '@mui/material/Box';
// COMPONENTS
import ModalForm from "./Modal";
import ShowSteeps from "@utils/Steep";
import NaturalProvider from "@context/Cliente/NaturalContext"

const steeper = ({ steeps }) => {

    return (
        <Box>
            {/* MOSTRAMOS LOS PASOS DEL FORMULARIO NATURAL PERO EL MODAL VISIBLE */}
            <NaturalProvider>
                <ShowSteeps steeps={steeps} />
            </NaturalProvider>
            
            {/* MODAL VISIBLE */}
            <ModalForm />
        </Box>
    );
};

export default steeper;
