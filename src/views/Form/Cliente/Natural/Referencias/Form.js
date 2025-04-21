import React from 'react'
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import { Typography, Button, MenuItem, Grid, Divider, Box } from "@mui/material";
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import MaskFile from "@components/ui/_Mask";
// ALERTAS
import swal from "sweetalert";
// 
const Form = ({ onSubmit, editMode, clearData, DelefeRef }) => {

    const {
        handleSubmit,
        getValues,
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
                <>
                    <h3>Referencias</h3>
                </>
            </Grid>
            <Grid item xs={12}>
                <>
                    <Typography variant="small" component="p">
                        <small>
                            Obligatorio si la suma asegurada acumulada es mayor a US $200,000
                        </small>
                    </Typography>
                </>
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left">Referencias personales:</Divider>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Input
                    name="nombres_apellidos"
                    label="Nombres y Apellidos"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="parentesco"
                    label="Parentesco"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="telefono"
                    label="Tel&eacute;fono"
                    inputProps={{ maxLength: 13 }}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={6} container spacing={2}>
                <Grid item xs={12}>
                    <Divider textAlign="left">Referencias comerciales:</Divider>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <MaskFile name='tarjeta' label="Tarjeta" 
                    />
                   
                </Grid>
                <Grid item xs={12} md={6} lg={6}>

                    <Input
                        name="ins_fincanciera_1"
                        label="Institución Financiera"
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={6} container spacing={2}>
                <Grid item xs={12}>
                    <Divider textAlign="left">Referencias bancarias:</Divider>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <SelectOption
                        name="tipo_cuenta"
                        label="Tipo de cuenta"
                    >
                        <MenuItem value={"A"}>Ahorro</MenuItem>
                        <MenuItem value={"C"}>Corriente</MenuItem>
                    </SelectOption>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Input
                        name="ins_fincanciera_2"
                        label="Institución Financiera"
                        fullWidth
                    />
                </Grid>
            </Grid>


            <Grid item xs={12} md={6} lg={4}>
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
                    onClick={clearData}
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
        </>
    )
}

export default Form