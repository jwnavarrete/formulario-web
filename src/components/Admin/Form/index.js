import React from "react"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Header from "./Header"
import Actions from "./Actions"
import Campos from "./Campos"
import ModalLoading from "./ModalLoading"

const Form = (props) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Header {...props}/>
            </Grid>

            <Grid container spacing={2} mt={2}>
                {/* CAMPOS */}
                <Campos {...props}/>
                {/* BOTONES */}
                <Actions {...props}/>
                
                <ModalLoading {...props}/>
            </Grid>            
        </Box>
    )
}

export default Form
