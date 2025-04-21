const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'perfil_id', headerName: 'Perfil', width: 200, 
        renderCell: (cellValues) => {
            return cellValues.row.perfil.descripcion;
        },
    },
    { field: 'estado', headerName: 'Estado', width: 200 }
]
export { columns }