import React, { useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@mui/material/Button"
import { BiSearch, BiReset,BiDownload} from 'react-icons/bi';

import MenuItem from "@mui/material/MenuItem"
import Input from "@components/ui/_Input"
import SelectOption from "@components/ui/_Select"
import InputDate from "@components/ui/_InputDate"

const Form = ({ contexto }) => {
    const { handleBuscarClick, handleResetClick,handleDownloadPeps,searchClientesPeps } = useContext(contexto);
    const [fechaDesde,setFechaDesde] = useState();
    const [fechaHasta,setFechaHasta] = useState();
    const {
        getValues,
        handleSubmit,
        formState: { errors, dirtyFields },
        reset
    } = useFormContext()

    const handleRestablecer = () => {
        reset()
        handleResetClick();
    }
    const handleDescargar=()=>{
        
        handleDownloadPeps({
            'name':'ReporteClientePEP',
            'inicio': fechaDesde,
            'fin' : fechaHasta
        });

    }

    const handleChangeDesde = (date) => {
        setFechaDesde(date)
    }

    const handleChangeHasta = (date) => {
        setFechaHasta(date)
    }

    const handleSearch =()=>{
        searchClientesPeps({
            'name':'ReporteClientePEP',
            'inicio': fechaDesde,
            'fin' : fechaHasta
        })
    }

    return (
        <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={6} lg={6}>
            <ButtonGroup spacing="16px" aria-label="primary button group">
                <Grid item xs={3} md={3} lg={6}>
                    <InputDate
                        name="fecha_desde"
                        label="Desde"
                        //value={fecha_desde}
                        onChange={e => handleChangeDesde(e)}
                    />
                </Grid>
                <Grid item xs={3} md={3} lg={6}>
                    <InputDate
                        name="fecha_hasta"
                        label="Hasta"
                        //value={fecha_hasta}
                        onChange={e => handleChangeHasta(e)}
                    />
                </Grid>
            </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ float: 'right' }}>
                <Button
                    color="success"
                    size="sm"
                    onClick={(handleSearch)}
                    endIcon={<BiSearch style={{ fontSize: "24px" }} />}
                >
                    Buscar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="sm"
                    onClick={(handleDescargar)}
                    endIcon={<BiDownload style={{ fontSize: "24px" }} />}
                >
                    Descargar
                </Button>
            </ButtonGroup>
        </Grid>
        </Grid>
    )
}

export default Form