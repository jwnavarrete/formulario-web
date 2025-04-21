import React, { useEffect, useState } from 'react'
import { useFormContext } from "react-hook-form";

// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import SelectOption from "@components/ui/_Select";
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
// 
const Form = ({ onSubmit, editMode, clearData, DelefeRef, setOpenModal, openModal }) => {

    const [anios, setAnios] = useState([])

    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        generaListaAnios()
      }, []);

    const generaListaAnios = () => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 70;
        const years = [];
        for (let i = currentYear ; i >= startYear; i--) {
          years.push({ codigo: i, descripcion: i });
        }
        setAnios(years)
      }

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
                    + Certificaciones
                </Button>
            </Grid>

            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid item xs={12} pt={1}>
                        <SelectOption
                            name="titulo"
                            label="Titulo"
                        >
                            <MenuItem value={"Certificaciones"}>Certificaciones</MenuItem>
                            <MenuItem value={"Maestrías"}>Maestrías</MenuItem>
                            <MenuItem value={"Diplomado"}>Diplomado</MenuItem>
                        </SelectOption>
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="institucion"
                            label="Instituci&oacute;n"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                        <Input
                            name="lugar"
                            label="Lugar"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} pt={1}>
                    <SelectOption
                        name="anio"
                        label="A&ntilde;o"
                        >
                        {anios.map(({ codigo, descripcion }) => (
                            <MenuItem key={codigo} value={codigo}>
                            {descripcion}
                            </MenuItem>
                        ))}
                    </SelectOption>
                        {/*<Input
                            name="anio"
                            label="A&ntilde;o"
                            fullWidth
                        />*/}
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