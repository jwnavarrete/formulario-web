import React, { useMemo, createContext, useState } from "react";

export const MenuContext = createContext();

const intialStateDisabled = {
    id: true,
    titulo: false,
    tipo: false,
    icono: true,
    url: true,
    parent_id: true
};

const MenuProvider = (props) => {
    const [rows, setRows] = useState([])
    const [editionMode, setEditionMode] = useState(false);
    const [disabled, setDisabled] = useState(intialStateDisabled);

    return (
        <MenuContext.Provider
            value={useMemo(
                () => ({
                    rows,
                    setRows,
                    editionMode,
                    setEditionMode,
                    disabled,
                    setDisabled
                }),
                [rows, editionMode, disabled]
            )}
        >
            {props.children}
        </MenuContext.Provider>
    );
};

export default MenuProvider;
