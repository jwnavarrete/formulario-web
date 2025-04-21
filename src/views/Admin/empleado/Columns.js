
import React, { useContext } from "react"
import { Box, Chip, Button, } from '@mui/material';
import { FaTasks } from 'react-icons/fa'
import { EmpleadoAPPContext } from "@context/EmpleadoAPPContext"
import ListAction from "@components/Admin/Acciones/ListAction"
import { options } from "./Options"

const columns = [
  {
    field: 'accion',
    headerName: 'Acción',
    width: 100,
    cellClassName: 'actions',
    renderCell: cellValues => {
      return <ListAction row={cellValues.row} contexto={EmpleadoAPPContext} options={options} tipo='empleado' />
    }
  },
  { field: "identificacion", headerName: "Identificación", width: 150 },
  { field: "correo_empleado", headerName: "Correo Empleado", width: 200 },
  { field: "correo_ejecutivo", headerName: "Correo RRHH", width: 200 },
  { field: "nombres", headerName: "Nombres", width: 450 },
  {
    field: "estado",
    headerName: "Estado",
    width: 130,
    renderCell: (cellValues) => {
      return (
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Chip
            label={cellValues.row.estado === "P" ? "Pendiente" : cellValues.row.estado === "A" ? "Revision" : "Terminado"}
            color={cellValues.row.estado === "P" ? "warning" : cellValues.row.estado === "A" ? "info" : "success"}
            variant="contained"
          />
        </Box>
      );
    }
  },
  {
    field: "steep",
    headerName: "Pasos",
    width: 100,
    renderCell: (cellValues) => {
      const steepValue = parseInt(cellValues.row.steep, 10);
      const formattedValue = `${steepValue}/4`;
      return (
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Chip
            label={formattedValue}
            color={cellValues.row.steep === "4" && cellValues.row.estado === "T" ? "success" : cellValues.row.estado === "A" ? "info" : "warning"}
            variant="outlined"
          />
        </Box>
      );
    }
  },
  {
    field: 'logs',
    headerName: 'Logs de Actividades',
    width: 155,
    cellClassName: 'actions',
    renderCell: cellValues => {
      const { handleRowClick } = useContext(EmpleadoAPPContext); //
      return (
        <>
          <Button
            color={"primary"}
            variant="contained"
            size="small"
            startIcon={<FaTasks />}
            onClick={() => handleRowClick(cellValues.row.hash)}
          ></Button>
        </>
      )
    }
  },
  { field: "created_at", headerName: "Fecha Creación", width: 150 }
];

export { columns };