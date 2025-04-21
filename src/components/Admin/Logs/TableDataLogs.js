import React, { useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { format } from 'date-fns'; // Importa la función format
import { columns } from "./Columns"

const TableLogs = ({contexto}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [startingId, setStartingId] = React.useState(1);
    const { searchResult } = useContext(contexto)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setStartingId(newPage * rowsPerPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResult
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const id = startingId + index;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.mensaje && row.id}>
                                        {columns.map((column) => {
                                            const value = column.field === "id" ? id : row[column.field];
                                            return (
                                                <TableCell key={column.field} align={column.align}>
                                                    {column.field === "created_at" ? format(new Date(value), 'dd-MM-yyyy') : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={searchResult.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default TableLogs;
