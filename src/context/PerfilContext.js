import React, { useMemo, createContext, useState, useEffect } from "react";

export const PerfilContext = createContext()

import { useAxiosPrivate } from '@hooks/useAxiosPrivate'

const intialStateDisabled = {
    id: false,
    descripcion: true,
    estado: true,
};

const PerfilProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()

    const [rows, setRows] = useState([])
    const [editionMode, setEditionMode] = useState(false);
    const [disabled, setDisabled] = useState(intialStateDisabled);

    const loadData = async () => {
        const { data } = await axiosPrivate.get('/perfil/')

        //sort by id
        data.sort((a, b) => a.id - b.id)

        setRows(data)
    }

    useEffect(() => {
        loadData()
    }, [])
    
    return (
        <PerfilContext.Provider
            value={useMemo(
                () => ({
                    rows,
                    setRows,
                    editionMode,
                    setEditionMode,
                    disabled,
                    setDisabled,
                    loadData
                }),
                [rows, editionMode, disabled]
            )}
        >
            {props.children}
        </PerfilContext.Provider>
    );
};

export default PerfilProvider;
