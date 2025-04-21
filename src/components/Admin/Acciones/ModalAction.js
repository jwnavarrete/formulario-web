import React, { useContext } from 'react'
import { Box, Modal, CircularProgress, Card, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TableData from "./TableDataLogs"

const ModalAction = ({contexto}) => {
    const { openModalAction, handleStateModalAction, searchResult, loading } = useContext(contexto)

    return (
        <Modal
            open={openModalAction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box m={1} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 350, md: 700 },
                bgcolor: 'background.paper',
            }}>
                <Box p={1}>
                    <Card>
                        <CardContent>
                            <TableData />
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => handleStateModalAction(false)}>Cerrar</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalAction