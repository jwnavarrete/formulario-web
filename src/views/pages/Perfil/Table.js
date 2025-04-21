import React, { useEffect, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { PerfilContext } from "@context/PerfilContext"
import { DataGrid } from "@mui/x-data-grid"
// COMPONENTES DE MATERIAL UI
import Box from "@mui/material/Box"
// NUEVOS CONTROLES
import { Card } from "@components/ui/Card"
import { columns } from "./Columns"

const TableData = () => {

    const { 
        rows,
        setDisabled,
        setEditionMode,
    } = useContext(PerfilContext)

    const { setValue } = useFormContext()

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const row = data.map((id) => rows.find((row) => row.id === id))

        const [
            {
                id,
                descripcion,
                estado
            },
        ] = row

        // SETEAMOS LOS CAMPOS EN EL FORMULARIO SEGUN EL TIPO
        setValue("id", id)
        setValue("descripcion", descripcion)
        setValue("estado", estado)

        if(id === 1){
            setDisabled({ id: true, descripcion: false, estado: true })
        }else{
            setDisabled({ id: true, descripcion: false, estado: false })
        }

        setEditionMode(true)
    }

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