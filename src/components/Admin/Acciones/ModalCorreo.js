import React, { useContext, useState, useEffect } from 'react';
import { Box, Modal, Card, CardHeader, CardContent, CardActions, Button, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import { SiMinutemailer } from "react-icons/si";

const ModalAction = ({ contexto }) => {
    const { openModalAction, handleStateModalAction, emailResent, handleClickReenvioCorreoAceptacion, handleClickEnvioCorreo, handleClickReenvioCorreoAprobacion, handleClickReenvioCorreoFirmado, handleReprocesaHash } = useContext(contexto);
    const [editedEmail, setEditedEmail] = useState(emailResent || { correo: "", hash: "", tipo: "" });

    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        setEditedEmail(emailResent);

    }, [emailResent])

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEditedEmail({ ...editedEmail, correo: email });
        setEmailSent(false);

        const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        setEmailError(!isValidEmail);
    };

    const handleCloseModal = (state) => {
        setEmailSent(false);
        setEmailError(false);
        handleStateModalAction(state);
    }

    const handleSendEmail = async () => {
        if (emailError || (editedEmail?.hash.trim() === "" || editedEmail?.correo.trim() === "")) {
            return false;
        }

        const newHash = await handleReprocesaHash(editedEmail.hash)

        if(newHash){
            editedEmail.hash = newHash
        }
        
        setSendingEmail(true);
        setEmailSent(false);
        switch (emailResent.tipo) {
            case 'reenvio-enlace':
                await handleClickEnvioCorreo(editedEmail)
                break;
            case 'reenvio-aceptacion':
                await handleClickReenvioCorreoAceptacion(editedEmail)
                break;
            case 'reenvio-revision':
                await handleClickReenvioCorreoAprobacion(editedEmail)
                break;
            case 'reenvio-firmado':
                await handleClickReenvioCorreoFirmado(editedEmail)
                break;
            default:
                break;
        }
        // 
        setSendingEmail(false);
        setEmailSent(true);
    };

    const getTitle = () => {
        switch (emailResent.tipo) {
            case 'reenvio-enlace':
                return 'Reenvío de Correo del Formulario';
            case 'reenvio-aceptacion':
                return 'Reenvío de Correo para Aceptación y Firma del Formulario';
            case 'reenvio-revision':
                return 'Reenvío de Correo para la Revisión del Ejecutivo';
            case 'reenvio-firmado':
                return 'Reenvío de Correo con el formulario firmado adjunto';
            default:
                return '';
        }
    };

    return (
        <>
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
                    borderRadius: '4px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <Card>

                        <CardContent>
                            {getTitle()}

                            <Typography id={1} variant="body2" color="textSecondary" gutterBottom>
                                Puedes modificar el correo si lo deseas. Luego, haz clic en "Enviar Correo"
                            </Typography>
                            <TextField
                                label="Correo Electrónico"
                                value={editedEmail?.correo}
                                onChange={handleEmailChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                error={emailError}
                                helperText={emailError ? 'Ingrese un correo válido' : ''}
                            />
                            {emailSent && (
                                <Alert severity="success" sx={{ marginTop: 5 }}>
                                    El correo fue enviado con éxito.
                                </Alert>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={handleSendEmail}
                                endIcon={sendingEmail ? <CircularProgress size={20} /> : <SiMinutemailer style={{ fontSize: "24px" }} />}
                                disabled={sendingEmail || emailError || (editedEmail?.correo && editedEmail?.correo.trim() === "")}
                            >
                                Enviar Correo
                            </Button>
                            <Button size="small" variant="contained" onClick={() => handleCloseModal(false)}>
                                Cerrar
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal >
        </>
    )
}

export default ModalAction;
