import React, { useContext } from 'react'
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import MaskInput from "@components/ui/_Mask";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
// ALERTAS
import swal from "sweetalert";
// 
const Form = ({ onSubmit, editMode, clearData, DelefeRef }) => {
    const { estado } = useContext(JuridicoContext)

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
                <>
                    <h3>Referencias</h3>
                </>
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
            <Grid item xs={12} md={6} lg={3}>
                <MaskInput name='tarjeta' label="Tarjeta" placeholder="XXXX XXXX XXXX 0000" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="ins_fincanciera_1"
                    label="Ins.Financiera"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <SelectOption
                    name="tipo_cuenta"
                    label="Tipo de cuenta"
                >
                    <MenuItem value={"A"}>Ahorro</MenuItem>
                    <MenuItem value={"C"}>Corriente</MenuItem>
                </SelectOption>

            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="ins_fincanciera_2"
                    label="Ins.Financiera"
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                {estado == "P" &&
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        size="small"
                    >
                        Agregar
                    </Button>
                }


                <Button
                    variant="contained"
                    color="secondary"
                    onClick={clearData}
                    sx={{ ml: 1 }}
                    size="small"
                >
                    Cancelar
                </Button>

                {editMode && estado == "P" && <Button
                    onClick={handleDelect}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 1 }}
                    size="small"
                >
                    Eliminar
                </Button>

                }
            </Grid>
        </>
    )
}

export default Form