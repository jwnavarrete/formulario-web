import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@mui/material/Button"
import { BiSearch, BiReset } from 'react-icons/bi';

const Form = ({ contexto }) => {
    const { handleBuscarClick, handleResetClick } = useContext(contexto);

    const {
        handleSubmit,
        formState: { errors, dirtyFields },
        reset
    } = useFormContext()

    const handleRestablecer = () => {
        reset()
        handleResetClick();
    }

    return (
        <Grid item xs={12} md={12} lg={4}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ float: 'right' }}>
                <Button
                    color="success"
                    size="sm"
                    onClick={handleSubmit(handleBuscarClick)}
                    endIcon={<BiSearch style={{ fontSize: "24px" }} />}
                >
                    Buscar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={handleSubmit(handleRestablecer)}
                    endIcon={<BiReset style={{ fontSize: "24px" }} />}
                >
                    Restablecer
                </Button>
            </ButtonGroup>
        </Grid>
    )
}

export default Form
