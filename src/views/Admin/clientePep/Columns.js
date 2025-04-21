
import React, { useContext } from "react"
import { Box, Chip, Button, } from '@mui/material';
import { FaTasks } from 'react-icons/fa'
import { ClienteAPPContext } from "@context/ClienteAPPContext"
import ListAction from "@components/Admin/Acciones/ListAction"
import {options} from "./Options"

const columns = [
  { field: "tip_identificacion", headerName: "Tipo", width: 150 },
  { field: "identificacion", headerName: "Identificación", width: 150 },
  { field: "tipo_lista", headerName: "Tipo de lista", width: 200 },
  { field: "nombres", headerName: "Nombres", width: 200 },
  { field: "apellidos", headerName: "Apellidos", width: 200 },
  { field: "cargo", headerName: "Cargo", width: 250 },
  { field: "created_at", headerName: "Fecha Creación", width: 150 },
  
];

export { columns };