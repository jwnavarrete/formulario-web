import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { UsuarioContext } from "@context/UsuarioContext"
import { DataGrid } from "@mui/x-data-grid"
// COMPONENTES DE MATERIAL UI
import Box from "@mui/material/Box"
// NUEVOS CONTROLES
import { Card } from "@components/ui/Card"
import { columns } from "./Columns"
// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate"

const TableData = () => {
    const axiosPrivate = useAxiosPrivate()

    const {
        rows,
        setEditionMode,
        setDisabled
    } = useContext(UsuarioContext)

    const { setValue } = useFormContext()

    const onRowsSelectionHandler = (data) => {
        if (data.length === 0) return

        const row = data.map((id) => rows.find((row) => row.id === id))

        const [
            {
                id,
                email,
                password,
                perfil_id,
                estado
            },
        ] = row

        if (id === 1) {
            setDisabled({ id: true, email: false, password: false, perfil_id: false, estado: true })
        } else {
            setDisabled({ id: true, email: false, password: false, perfil_id: false, estado: false })
        }

        // SETEAMOS LOS CAMPOS EN EL FORMULARIO SEGUN EL TIPO
        setValue("id", id)
        setValue("email", email)
        setValue("password", password)
        setValue("perfil_id", perfil_id)
        setValue("estado", estado)

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