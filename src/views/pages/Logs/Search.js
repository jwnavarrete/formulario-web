import React, { useContext } from 'react'
import { useFormContext } from "react-hook-form"
import { LogsContext } from "@context/LogsContext"
import { MenuItem, Box, Grid, Button, Stack } from "@mui/material"
// icons
import { BiSearch } from 'react-icons/bi'

import { Card } from "@components/ui/Card"
import InputDate from "@components/ui/_InputDate"

const initialState = {
    fecha_desde: "",
    fecha_hasta: ""
}

const Search = () => {
    // Context
    const {
        fecha_desde,
        setFechaDesde,
        fecha_hasta,
        setFechaHasta,
        rows,
        setRows,
        disabled,
        setDisabled,
        loadLogs
    } = useContext(LogsContext)

    // FormContext
    const {
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors },
    } = useFormContext({ defaultValues: initialState })

    const handleSearch = () => {
        loadLogs()
    }

    const handleChangeDesde = (date) => {
        setFechaDesde(date)
    }

    const handleChangeHasta = (date) => {
        setFechaHasta(date)
    }

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p>Registros del Sistema</p>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <InputDate
                            name="fecha_desde"
                            label="Desde"
                            value={fecha_desde}
                            onChange={e => handleChangeDesde(e)}
                        />
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <InputDate
                            name="fecha_hasta"
                            label="Hasta"
                            value={fecha_hasta}
                            onChange={e => handleChangeHasta(e)}
                        />
                    </Grid>
                    <Grid item xs={1} lg={1}>
                        <Button variant='contained' color='primary' onClick={() => handleSearch()}>
                            <BiSearch />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default Search