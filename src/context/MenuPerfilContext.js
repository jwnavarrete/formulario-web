import React, { useMemo, createContext, useState, useEffect } from "react";

// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";

export const MenuPerfilContext = createContext();

const MenuPerfilProvider = (props) => {
    const axiosPrivate = useAxiosPrivate();

    const [perfiles, setPerfiles] = useState([])
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        loadPerfiles()
    }, [])

    // funciones
    const loadPerfiles = async () => {
        try {
            const { data } = await axiosPrivate.get(`/perfil/`)
            setPerfiles(data)
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

     const loadMenus = async (id) => {
        try {
            const menus = await getMenus()
            const menus_x_perfil = await getMenus_x_Perfil(id)

            menus.map(item => {
                const data = menus_x_perfil.filter(q => q.menu_id === item.id)

                if(data.length > 0){
                    item.exists = true;
                }else{
                    item.exists = false;
                }

                item.perfil_id = id
            })

            setMenus(menus)
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

    const getMenus = async () => {
        try {
            const { data } = await axiosPrivate.get(`/menu/`)

            return data
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

    const getMenus_x_Perfil = async (id) => {
        try {
            const { data } = await axiosPrivate.get(`/menu_x_perfil/{id}?perfil_id=${id}`)

            return data
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

    return (
        <MenuPerfilContext.Provider
            value={useMemo(
                () => ({
                    perfiles,
                    setPerfiles,
                    menus,
                    setMenus,
                    loadMenus
                }),
                [perfiles, menus]
            )}
        >
            {props.children}
        </MenuPerfilContext.Provider>
    );
};

export default MenuPerfilProvider;
