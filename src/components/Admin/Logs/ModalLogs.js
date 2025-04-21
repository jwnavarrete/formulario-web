import React, { useContext } from 'react'
import { Box, Modal, CircularProgress, Card, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TableData from "./TableDataLogs"

const ModalLogs = ({contexto}) => {
    const { openModal, handleStateModal, searchResult, loading } = useContext(contexto)

    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box m={1} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 500, md: 800 },
                bgcolor: 'background.paper',
            }}>
                <Box p={1}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Logs de Actividades
                            </Typography>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                                    <CircularProgress />
                                </Box>
                            ) : searchResult && searchResult.length > 0 ? (
                                <TableData contexto={contexto}/>
                            ) : (
                                <Typography sx={{ fontSize: 14 }}>No se encontró información con el criterio de búsqueda.</Typography>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => handleStateModal(false)}>Cerrar</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalLogs