import React, { useState, useEffect } from 'react'
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
// ALERTAS
import swal from "sweetalert";
// 
const style = {
    // display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Form = ({ onSubmit, editMode, clearData, DelefeRef, setOpenModal, openModal }) => {
    const [today, setToday] = useState();

    useEffect(() => {
        var todayDate = new Date().toISOString().slice(0, 10);
        setToday(todayDate);
    }, []);

    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    const handleDelect = () => {
        swal({
            title: "Formulario Online",
            text: `Seguro desea eliminar este registro?`,
            icon: "info",
            buttons: {
                cerrar: "No",
                continuar: {
                    text: "Si",
                    value: "continue",
                },
            },
        }).then((value) => {
            if (value == "continue") {
                DelefeRef();
            }
        });
    }

    const handleCloseModal = () => {
        clearData()
        setOpenModal(false)
    }

    return (
        <>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} pt={1}>
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 1 }}
                    size="small"
                >
                    + Experiencia Laboral
                </Button>
            </Grid>

            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="nombre_empresa"
                            label="Nombre Empresa"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="cargo"
                            label="Cargo"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="motivo_salida"
                            label="Motivo de salida"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} pt={1}>
                        <Input
                            name="fecha_ingreso"
                            label="Fecha de ingreso"
                            type="Date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ max: today }}
                        />
                    </Grid>

                    <Grid item xs={12} pt={1}>
                        <Input
                            name="fecha_salida"
                            label="Fecha de salida"
                            type="Date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ max: today }}
                        />
                    </Grid>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            ml: 2,
                            pt: 2,
                        }}
                    >
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1 }}
                            size="small"
                        >
                            Agregar
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleCloseModal()}
                            sx={{ ml: 1 }}
                            size="small"
                        >
                            Cancelar
                        </Button>

                        {editMode && <>
                            <Button
                                onClick={handleDelect}
                                variant="contained"
                                color="primary"
                                sx={{ ml: 1 }}
                                size="small"
                            >
                                Eliminar
                            </Button>
                        </>}
                    </Box>

                </Box>
            </Modal>


        </>
    )
}

export default Form