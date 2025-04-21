import React, { useMemo, createContext, useState, useEffect } from "react";

export const UsuarioContext = createContext();

import { useAxiosPrivate } from "@hooks/useAxiosPrivate"

const intialStateDisabled = {
    id: true,
    email: false,
    password: false,
    estado: false,
};

const UsuarioProvider = (props) => {
    // hooks
    const axiosPrivate = useAxiosPrivate()

    const [rows, setRows] = useState([])
    const [perfiles, setPerfiles] = useState([])
    const [editionMode, setEditionMode] = useState(false);
    const [disabled, setDisabled] = useState(intialStateDisabled);

    useEffect(() => {
        loadPerfil()
        loadData()
    }, [])

    const loadData = async () => {
        const { data } = await axiosPrivate.get('/users/')
        //sort by id
        data.sort((a, b) => a.id - b.id)

        setRows(data)
    }

    const loadPerfil = async () => {
        try {
            const { data } = await axiosPrivate.get(`/perfil/`)
            // filtrar por campo estado Activo
            const newData = data.filter(item => item.estado === 'A')

            setPerfiles(newData)
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
        <UsuarioContext.Provider
            value={useMemo(
                () => ({
                    rows,
                    setRows,
                    perfiles,
                    setPerfiles,
                    editionMode,
                    setEditionMode,
                    disabled,
                    setDisabled,
                    loadData
                }),
                [rows, perfiles, editionMode, disabled]
            )}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
};

export default UsuarioProvider;
