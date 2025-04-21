import React, { useState, useEffect, createContext, useMemo } from 'react'
import { useAxiosPrivate } from "@hooks/useAxiosPrivate"
import moment from 'moment'
import dayjs from 'dayjs'
import swal from "sweetalert"

export const LogsContext = createContext()

const initialDisabled = {
    fecha_desde: false,
    fecha_hasta: false
}

const LogsProvider = (props) => {
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
  
    const initialDate = dayjs(`${year}-${month}-${day}`)

    const axiosPrivate = useAxiosPrivate()

    const [fecha_desde, setFechaDesde] = useState(initialDate)
    const [fecha_hasta, setFechaHasta] = useState(initialDate)
    const [rows, setRows] = useState([])
    const [disabled, setDisabled] = useState(initialDisabled)

    useEffect(() => {
        loadLogs()
    }, [])

    const loadLogs = async () => {
        try {
            const desde = fecha_desde.format('YYYY-MM-DD')
            const hasta = fecha_hasta.format('YYYY-MM-DD')

            const { data } = await axiosPrivate.get(`/logs_all/?fecdesde=${desde}&fechasta=${hasta}`)

            data.map(item => {
                item.user_email = item.owner.email
                item.created_at = moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
            })

            setRows(data)
        } catch (error) {
            swal({
                title: 'Formulario Online',
                text: `Error ${error}`,
                icon: 'error',
                button: 'Aceptar'
            })
        }
    }

    return (
        <LogsContext.Provider
            value={useMemo(
                () => ({
                    fecha_desde,
                    setFechaDesde,
                    fecha_hasta,
                    setFechaHasta,
                    rows,
                    setRows,
                    disabled,
                    setDisabled,
                    loadLogs
                }),
                [fecha_desde, fecha_hasta, rows, disabled]
            )}
        >
            {props.children}
        </LogsContext.Provider>
    )
}
export default LogsProvider
