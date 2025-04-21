import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Input from "@components/ui/_Input"
import SelectOption from "@components/ui/_Select"

const Campos = ({ contexto }) => {

    const { handleInputTipPersona, arrTipPersona, handleInputTipo, handleInputBusqueda, handleResetClick } = useContext(contexto);

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
        <>
            <Grid item xs={6} md={6} lg={2}>
                <SelectOption
                    name="tip_persona"
                    label="Tipo Persona"
                    onChange={handleInputTipPersona}
                >
                    {arrTipPersona.map((opcion) => (
                        <MenuItem key={opcion.value} value={opcion.value}>
                            {opcion.label}
                        </MenuItem>
                    ))}
                </SelectOption>
            </Grid>
            <Grid item xs={6} md={6} lg={2}>
                <SelectOption
                    name="tip_busqueda"
                    label="Tipo"
                    onChange={handleInputTipo}
                >
                    <MenuItem value={"x"}>Todos</MenuItem>
                    <MenuItem value={"I"}>Identificación</MenuItem>
                    <MenuItem value={"N"}>Nombres</MenuItem>

                </SelectOption>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <Input name="busqueda" required label="Buscar" onBlur={handleInputBusqueda} />
            </Grid>
        </>
    )
}

export default Campos
