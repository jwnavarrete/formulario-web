import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// CONTEXT
import { MenuContext } from "@context/MenuContext";
//ICONOS
import { FaSave } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
// NUEVOS CONTROLES
import { Card } from "@components/ui/Card";
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// Service
import logsService from "@services/LogsService";
// sweetalert
import swal from "sweetalert";

import {
    estadoCatalogo,
    tipoCatalogo,
    iconoCatalogo
} from "./catalogo";

const initialState = {
    id: "",
    titulo: "",
    tipo: "",
    icono: "",
    url: "",
    parent_id: ""
}

const Form = () => {
    const [menu_padre, setMenuPadre] = useState([])

    const {
        rows,
        setRows,
        editionMode,
        setEditionMode,
        disabled,
        setDisabled
    } = useContext(MenuContext);

    const axiosPrivate = useAxiosPrivate();

    const loadData = async () => {
        const { data } = await axiosPrivate.get('/menu/');

        //sort by id
        data.sort((a, b) => a.id - b.id);

        setRows(data);
    };

    const loadMenuPadre = async () => {
        try {
            const { data } = await axiosPrivate.get(`/menu/`)

            // filtrar por campo estado Activo
            const newData = data.filter(item => item.tipo === 'collapse')

            setMenuPadre(newData)
        } catch (error) {
            swal({
                title: 'Formulario Online',
                text: `Error ${error}`,
                icon: 'error',
                button: 'Aceptar'
                // timer: '2000'
            })
        }
    }

    const handleSave = (data) => {
        const {
            id,
            titulo,
            tipo,
            icono,
            url,
            parent_id
        } = data;

        switch (tipo) {
            case "collapse":
                saveData({
                    titulo,
                    tipo,
                    icono
                }, id);

                break;

            case "item":

                if(parent_id != ""){
                    saveData({
                        titulo,
                        tipo,
                        icono,
                        url,
                        parent_id
                    }, id);
                }else{
                    saveData({
                        titulo,
                        tipo,
                        icono,
                        url,
                    }, id);
                }
                
                break;

            default:
                break;
        }

        loadMenuPadre()
    };

    const saveData = async (param, id) => {
        try {
            if (!editionMode) {
                const { data } = await axiosPrivate.post("/menu/", param);

                swal({
                    title: "Formulario Online",
                    text: `Registrado con exito`,
                    icon: "success",
                    button: "Aceptar"
                    // timer: "2000",
                });

                logsService.register(`Registro de Menu: ${JSON.stringify(data)}`, 'Menu')

                loadData()
            } else {
                const { data } = await axiosPrivate.patch(
                    `/menu/${id}`,
                    param
                );

                swal({
                    title: "Formulario Online",
                    text: `Actualizado con exito`,
                    icon: "success",
                    button: "Aceptar"
                    // timer: "2000",
                });

                logsService.register(`Actualización de Menu: ${JSON.stringify(data)}`, 'Menu')

                loadData()
            }

            // LIMPIAMOS LOS CAMPOS
            clearData();
        } catch (error) {
            swal({
                title: "Formulario Online",
                text: `Error ${error}`,
                icon: "error",
                button: "Aceptar"
                // timer: "2000",
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosPrivate.delete(`/menu/${id}`);
            // logsService.register(`elimino el tipo id ${id}`, 'Tipo')

            swal("registro eliminado!", {
                icon: "success",
            });

            clearData();

            logsService.register(`Eliminación de Menu con id: ${id}`, 'Menu')

            await loadData()
        } catch (error) {
            swal({
                title: "Formulario Online",
                text: `Error ${error}`,
                icon: "error",
                button: "Aceptar"
                // timer: "2000",
            });
        }
    };

    const handleClickDelete = () => {
        const id = getValues("id");
        //
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado, no podrá recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                handleDelete(id);
            }
        });
    };

    const clearData = () => {
        setEditionMode(false);
        reset(initialState);
    };

    const {
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors },
    } = useFormContext({ defaultValues: initialState });

    useEffect(() => {
        setDisabled({ id: true, titulo: false, tipo: false, icono: true, url: true, parent_id: true });

        clearData();
        loadMenuPadre();
        loadData();
    }, []);

    const handleChangeEstado = async (e) => {
        setValue("estado", e.target.value);
    }

    const handleChangeTipo = (e) => {
        setValue("tipo", e.target.value)

        switch (e.target.value) {
            case "collapse":
                setDisabled({ id: true, titulo: false, tipo: false, icono: false, url: true, parent_id: true });

                break;

            case "item":
                setDisabled({ id: true, titulo: false, tipo: false, icono: false, url: false, parent_id: false });

                break;

            default:
                break;
        }
    }

    const handleChangeMenuPadre = async (e) => {
        setValue("parent_id", e.target.value);
    }

    const handleChangeIcono = (e) => {
        setValue("icono", e.target.value);
    }

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p>Datos del Usuario</p>
                    </Grid>
                    <Grid item xs={12} md={1} lg={1}>
                        <Input
                            name="id"
                            label="ID"
                            fullWidth
                            disabled={disabled.id}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Input
                            name="titulo"
                            label="Título"
                            fullWidth
                            disabled={disabled.titulo}
                        />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <SelectOption
                            name="tipo"
                            label="Tipo"
                            onChange={handleChangeTipo}
                            disabled={disabled.tipo}
                        >
                            {tipoCatalogo.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.nombre}
                                </MenuItem>
                            ))}
                        </SelectOption>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <SelectOption
                            name="icono"
                            label="Icono"
                            onChange={handleChangeIcono}
                            disabled={disabled.icono}
                        >
                            {iconoCatalogo.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.nombre}
                                </MenuItem>
                            ))}
                        </SelectOption>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <SelectOption
                            name="parent_id"
                            label="Menú Padre"
                            onChange={handleChangeMenuPadre}
                            disabled={disabled.parent_id}
                        >
                            {menu_padre.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.titulo}
                                </MenuItem>
                            ))}
                        </SelectOption>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Input
                            name="url"
                            label="Url"
                            fullWidth
                            disabled={disabled.url}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                onClick={handleSubmit(handleSave)}
                            >
                                <FaSave />
                            </Button>
                            {/* SOLO SI ESTA ACTIVADO EL MODO EDICION */}
                            {editionMode && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleClickDelete}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </>
                            )}
                            <Button variant="contained" color="warning" onClick={clearData}>
                                <AiOutlineClose />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default Form;
