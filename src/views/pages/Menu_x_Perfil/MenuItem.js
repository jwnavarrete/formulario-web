import React, { useContext } from 'react'
import { useFormContext } from "react-hook-form"

// COMPONENTES DE MATERIAL UI
import Button from "@mui/material/Button"

// CONTEXT
import { MenuPerfilContext } from "@context/MenuPerfilContext"
// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate"

import logsService from '@services/LogsService'

const initialState = {
    perfil_id: "",
    menu_id: ""
}

const MenuItem = ({ item }) => {
    const axiosPrivate = useAxiosPrivate()
    
    const menu_id = item.id
    const perfil_id = item.perfil_id
    const exists = item.exists

    const {
        loadMenus
    } = useContext(MenuPerfilContext)

    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext({ defaultValues: initialState })

    const handleSave = (data) => {
        data.menu_id = menu_id
        data.perfil_id = perfil_id
      
        if (!exists) {
            saveData(data)
        } else {
            deleteData(data)
        }
    }

    const saveData = async (param) => {
        try {
            const { data } = await axiosPrivate.post("/menu_x_perfil/", param)

            logsService.register(`Registro de menu_x_perfil: ${JSON.stringify(data)}`, 'Menu_Perfil')

            loadMenus(data.perfil_id)            
        } catch (error) {
            swal({
                title: "Formulario Online",
                text: `Error ${error}`,
                icon: "error",
                button: "Aceptar",
                // timer: "2000",
            })
        }
    }

    const deleteData = async (param) => {
        try {
            const { data } = await axiosPrivate.delete(`/menu_x_perfil/{id}?perfil_id=${param.perfil_id}&menu_id=${param.menu_id}`)
           
            logsService.register(`Eliminación de perfil con id: ${param.perfil_id}`, 'Menu_Perfil')

            loadMenus(param.perfil_id)
        } catch (error) {
            swal({
                title: "Formulario Online",
                text: `Error ${error}`,
                icon: "error",
                button: "Aceptar"
                // timer: "2000",
            })
        }
    }

    const ItemMenu = (props) => {
        return (
            <div style={{
                width: '100%',
                height: '50px',
                margin: '10px',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }} {...props}>
                {props.children}
            </div>
        )
    }

    return (
        <ItemMenu key={item.id}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {item.titulo}
            </div>
            <div style={{ flexDirection: 'end' }}>
                {!item.exists ?
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit(handleSave)}
                    >
                        Agregar
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleSubmit(handleSave)}
                    >
                        Quitar
                    </Button>
                }
            </div>
        </ItemMenu>
    )
}

export default MenuItem