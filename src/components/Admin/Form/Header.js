import React, { useContext } from "react"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Typography from '@mui/material/Typography'
import SelectOption from "@components/ui/_Select"

const Form = ({ contexto, title, tipo }) => {

    const { handleInputEstado } = useContext(contexto);

    return (
        <>
            <Grid item xs={6} md={10} lg={10}>
                <Typography variant='h3' style={{ color: 'black' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={6} md={2} lg={2}>
                <SelectOption
                    name="estado"
                    label="Estados"
                    size="small"
                    defaultValue={"x"}
                    onChange={handleInputEstado}
                >
                    <MenuItem value={"x"}>Todos</MenuItem>
                    <MenuItem value={"P"}>Pendiente</MenuItem>
                    {(tipo === 'Prestador' || tipo === 'Empleado') && (
                        <MenuItem value={"A"}>Revisión</MenuItem>
                    )}
                    <MenuItem value={"T"}>Terminado</MenuItem>
                </SelectOption>
            </Grid>
        </>
    )
}

export default Form
