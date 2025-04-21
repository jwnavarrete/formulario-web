import React, { useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { MenuContext } from "@context/MenuContext";
import { DataGrid } from "@mui/x-data-grid";
// COMPONENTES DE MATERIAL UI
import Box from "@mui/material/Box";
// NUEVOS CONTROLES
import { Card } from "@components/ui/Card";
import { columns } from "./Columns";
// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";

const TableData = () => {
    const axiosPrivate = useAxiosPrivate()

    const {
        rows,
        setRows,
        editionMode,
        setEditionMode,
        disabled,
        setDisabled } = useContext(MenuContext)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const { data } = await axiosPrivate.get('/menu/')

        //sort by id
        data.sort((a, b) => a.id - b.id);

        setRows(data)
    }

    const { setValue } = useFormContext();

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const row = data.map((id) => rows.find((row) => row.id === id));

        const [
            {
                id,
                titulo,
                tipo,
                icono,
                url,
                parent_id
            },
        ] = row;

        // SETEAMOS LOS CAMPOS EN EL FORMULARIO SEGUN EL TIPO
        setValue("id", id);
        setValue("titulo", titulo);
        setValue("tipo", tipo);

        if(icono != null){
            setValue("icono", icono);
        }

        if(url != null){
            setValue("url", url);
        }

        if(parent_id != null){
            setValue("parent_id", parent_id);
        }
        
        switch (tipo) {
            case "collapse":
                setDisabled({ id: true, titulo: false, tipo: false, icono: false, url: true, parent_id: true });

                break;

            case "item":
                setDisabled({ id: true, titulo: false, tipo: false, icono: false, url: false, parent_id: false });

                break;

            default:
                break;
        }

        setEditionMode(true);
    };

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ height: 300, width: "100%" }} mt={2}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
                    />
                </Box>
            </Box>
        </Card>
    )
}

export default TableData