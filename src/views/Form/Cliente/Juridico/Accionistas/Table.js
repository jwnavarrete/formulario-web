import React, { useState, useEffect } from 'react';
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
    let initialHeigth = '20vh';
    let [dynamicHeight, setDynamicHeight] = useState(initialHeigth);


    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return
        const [row] = data.map((id) => rows.find((row) => row.id === id));
        console.log(row)
        setValue("id", row.id);
        setValue("tipo_identificacion", row.tipo_identificacion);
        setValue("num_identificacion_accionista", row.num_identificacion_accionista);
        setValue("razon_social_nombre_completos", row.razon_social_nombre_completos);
        setValue("porc_participacion", row.porc_participacion);
        setValue("nac_accionista", row.nac_accionista);
        setValue("tip_inversion_accionista", row.tip_inversion_accionista);
        setValue("capital_accionista", row.capital_accionista);
        

        setEditMode(true);
    }

    useEffect(() => {
        const Height = Math.min(rows.length * 6 + 20, 80) + 'vh';
        setDynamicHeight(Height);
    }, [rows]);

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