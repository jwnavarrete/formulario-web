import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
// 
import Box from "@mui/material/Box";
import { columns } from './Columns';
import { DataGrid, GridCellModes, GridEventListener } from "@mui/x-data-grid";

const Table = ({ rows, setEditMode, setOpenModal }) => {

    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const [row] = data.map((id) => rows.find((row) => row.id === id));

        setValue("id", row.id);
        setValue("nombre_completo", row.nombre_completo);
        setValue("parentesco", row.parentesco);
        setValue("telefono", row.telefono);

        setEditMode(true);
        setOpenModal(true);

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ width: "100%" }} mt={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoHeight
                    style={{ height: rows.length >= 1 ? ((rows.length + 1) * 80) : 100 }}
                    onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
                />
            </Box>
        </Box>


    )
}

export default Table