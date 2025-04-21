import React,{useState,useEffect} from 'react'
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// ALERTAS
import swal from "sweetalert";
// 
import NumberFormat from "@components/ui/_NumberFormat";
import { getCatalogo } from "@utils/Api/Catalogo";
const Form = ({ onSubmit, editMode, clearData, DelefeRef }) => {

    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);

    useEffect(() =>{

        getCatalogo("nacionalidad", setCatalogoNacionalidad);
    
      },[])

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
            <Grid item xs={12} md={6} lg={3}>
                <SelectOption
                    name="tipo_identificacion"
                    label="Tipo de identificaci&oacute;n"
                >
                    <MenuItem value={"C"}>C&eacute;dula</MenuItem>
                    <MenuItem value={"P"}>Pasaporte</MenuItem>
                    <MenuItem value={"R"}>Ruc</MenuItem>
                </SelectOption>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="num_identificacion_accionista"
                    label="No. de identificaci&oacute;n"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="razon_social_nombre_completos"
                    label="Raz&oacute;n Social / Nombres completos"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="porc_participacion"
                    label="% Participaci&oacute;n"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Box sx={{ minWidth: 120 }}>
                <SelectOption name="nac_accionista" label="Nacionalidad">
                    {catalogoNacionalidad.map(({ codigo, descripcion }) => (
                    <MenuItem key={codigo} value={codigo}>
                        {descripcion}
                    </MenuItem>
                    ))}
                </SelectOption>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="tip_inversion_accionista"
                    label="Tipo de inversión"
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <NumberFormat name="capital_accionista" label="Capital USD" inputProps={{ maxLength: 23}} fullWidth />
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