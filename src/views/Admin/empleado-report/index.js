import React, { useState } from "react";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Importar el idioma español para Day.js
import dayjs from 'dayjs';
import { columns } from "./Columns";
import { FaSearch, FaDownload } from "react-icons/fa";
import swal from "sweetalert";
import moment from 'moment';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Index = () => {
  const [estado, setEstado] = useState('T');
  const [fechaDesde, setFechaDesde] = useState(dayjs().startOf('year'));
  const [fechaHasta, setFechaHasta] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleChangeEstado = (e) => {
    setEstado(e.target.value);
  }

  const handleChangeFechaDesde = (e) => {
    setFechaDesde(e);
  }

  const handleChangeFechaHasta = (e) => {
    setFechaHasta(e);
  }

  const rowsId = rows.map((row, index) => ({ ...row, id: index }));

  const onRowsSelectionHandler = (data) => {
    if (data.length === 0) return
  }

  const handleClicBuscar = () => {
    loadData();
  }

  const loadData = async () => {
    try {
      setLoading(true);

      const desde = fechaDesde.format('YYYY-MM-DD')
      const hasta = fechaHasta.format('YYYY-MM-DD')
      const { data } = await axiosPrivate.get(`/empleado/report/?estado=${estado}&fecha_desde=${desde}&fecha_hasta=${hasta}&limit=1000&offset=0`)

      data.map(item => {
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
    } finally {
      setLoading(false);
    }
  }

  const transformData = (rows, columns) => {
    return rows.map(row => {
      const transformedRow = {};
      columns.forEach(col => {
        if (col.renderCell) {
          transformedRow[col.field] = col.renderCell({ value: row[col.field] });
        } else {
          transformedRow[col.field] = row[col.field];
        }
      });
      return transformedRow;
    });
  };

  const transformedRows = transformData(rowsId, columns);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transformedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Ajustar el ancho de las columnas
    const columnWidths = columns.map(col => ({ wpx: col.width }));
    ws['!cols'] = columnWidths;

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'datos.xlsx');
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant='h3' sx={{ color: 'black', mb: 2 }}>
        Reporte - Conozca a su Empleado
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={estado}
            label="Estado"
            size="medium"
            onChange={handleChangeEstado}
            required
          >
            <MenuItem value={'P'}>Pendiente</MenuItem>
            <MenuItem value={'A'}>Aprobado</MenuItem>
            <MenuItem value={'T'}>Terminado</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DesktopDatePicker
            label="Desde"
            inputFormat="DD/MM/YYYY"
            value={fechaDesde}
            onChange={handleChangeFechaDesde}
            renderInput={(params) => <TextField size="small" {...params} required />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DesktopDatePicker
            label="Hasta"
            inputFormat="DD/MM/YYYY"
            value={fechaHasta}
            onChange={handleChangeFechaHasta}
            renderInput={(params) => <TextField size="small" {...params} required />}
          />
        </LocalizationProvider>
        <Button variant="contained" sx={{ height: 'fit-content' }} onClick={handleClicBuscar} startIcon={<FaSearch />}>
          Consultar
        </Button>
      </Box>
      <Box sx={{ height: 500, width: '100%' }} mt={2}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={exportToExcel} startIcon={<FaDownload />} disabled={rows.length == 0}>
              Exportar XLSX
            </Button>
            <DataGrid
              rows={rowsId}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;