import React, { useEffect, useContext } from 'react'
import { LogsContext } from "@context/LogsContext"
import { useFormContext } from "react-hook-form"
import { Card } from "@components/ui/Card"
import { columns } from "./Columns"

import { DataGrid, GridToolbarContainer, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid'

// icons
import { BiSearch } from 'react-icons/bi'

import Box from '@mui/material/Box'

const CustomToolbar = () => {
    const apiRef = useGridApiRef();

    return (
        <GridToolbarContainer>
            <GridToolbarExport
                csvOptions={{
                    fileName: 'csvWithBom',
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    )
}

const Table = () => {
    const
        {
            rows
        } = useContext(LogsContext)

    const { setValue } = useFormContext()

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const row = data.map((id) => rows.find((row) => row.id === id))

        const [
            {
                id,
                actividad,
                created_at,
                owner_id,
                modulo
            },
        ] = row

        setValue('id', id)
        setValue('actividad', actividad)
        setValue('created_at', created_at)
        setValue('owner_id', owner_id)
        setValue('modulo', modulo)
    }

    const apiRef = useGridApiRef();

    return (
        <Card>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ height: 500, width: "100%" }} mt={2}>
                    <DataGrid
                        rows={rows}
                        apiRef={apiRef}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        componentsProps={{ toolbar: { csvOptions: { getRowsToExport: () => gridFilteredSortedRowIdsSelector(apiRef) } } }}
                    />
                </Box>
            </Box>
        </Card>
    )
}

export default Table