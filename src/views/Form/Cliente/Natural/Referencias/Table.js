import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
// 
import Box from "@mui/material/Box";
import { columns } from './Columns';
import { DataGrid, GridCellModes, GridEventListener } from "@mui/x-data-grid";

const Table = ({ rows, setEditMode }) => {

    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const [row] = data.map((id) => rows.find((row) => row.id === id));

        setValue("id", row.id);
        setValue("ins_fincanciera_2", row.ins_fincanciera_2);
        setValue("tipo_cuenta", row.tipo_cuenta);
        setValue("ins_fincanciera_1", row.ins_fincanciera_1);
        setValue("tarjeta", row.tarjeta);
        setValue("telefono", row.telefono);
        setValue("parentesco", row.parentesco);
        setValue("nombres_apellidos", row.nombres_apellidos);

        setEditMode(true);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ height: 230, width: "100%" }} mt={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
                />
            </Box>
        </Box>


    )
}

export default Table