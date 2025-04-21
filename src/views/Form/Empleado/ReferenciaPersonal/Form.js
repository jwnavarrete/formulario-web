import React, { useState, useEffect } from 'react'
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import MaskInput from "@components/ui/_Mask";
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

const Form = ({ onSubmit, editMode, clearData, DelefeRef, setOpenModal, openModal, rows }) => {
    const [today, setToday] = useState();

    useEffect(() => {
        // const { datos_personales } = formData

        // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
        // setDisableIdentificacion(true)


        var todayDate = new Date().toISOString().slice(0, 10);
        setToday(todayDate);

        // if (!datos_personales) {
        //     clearData();
        //     setInitialData()
        // }
        // setLoading(false)
    }, []);

    const handleCloseModal = () => {
        clearData()
        setOpenModal(false)
    }

    const handleChaneNuevo = (valor) => {
        // AQUI VALIDAMOS QUE TENGA SOLO 2 REGISTROS
        if (rows.length < 2) {
            setOpenModal(valor)
        } else {
            swal({
                title: "Formulario Online",
                text: `Solo se puede ingresar máximo 2 referencias`,
                icon: "warning",
                buttons: {
                    cerrar: "Aceptar",
                },
            });
        }
    }

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
    return (
        <>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} pt={1}>
                <Button
                    onClick={() => handleChaneNuevo(true)}
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 1 }}
                    size="small"
                >
                    + Referencias Personales
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
                            name="nombre_completo"
                            label="Nombre Completo"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="parentesco"
                            label="Parentesco"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="telefono"
                            label="Telefono"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
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
                    </Grid>
                </Box>
            </Modal >
        </>
    )
}

export default Form