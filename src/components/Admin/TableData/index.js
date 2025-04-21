import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { CircularProgress } from '@mui/material';

const index = ({ contexto, columns }) => {
  const { rows, loadingForm } = useContext(contexto)

  const rowsId = rows.map((row, index) => ({ ...row, id: index }));

  const onRowsSelectionHandler = (data) => {
    if (data.length === 0) return
  }

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }} mt={2}>
        {loadingForm ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rowsId}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={(data) => onRowsSelectionHandler(data)}
          />
        )}
      </Box>
    </>
  )
}

export default index