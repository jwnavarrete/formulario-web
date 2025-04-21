import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function ConsentimientoIp({ openModal, setOpenModalConcentimiento, ip, setIp }) {
  const [consentido, setConsentido] = useState(false);

  async function obtenerIp() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setIp(response.data.ip);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {consentido ? (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
                Su Ip ha sido validada: {ip}. Por favor, vuelva a dar click en "Guardar / Firmar Formulario" para terminar el proceso
              </Typography>
            </Grid>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                ml: 2,
                pt: 2,
              }}
            >
              <Button
                onClick={() => {
                  setOpenModalConcentimiento(false)
                }}
                variant="contained"
                color="primary"
                size="small"
              >
                Cerrar
              </Button>
            </Box>
          </>

        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
                Antes de continuar necesitamos validar su dirección IP
              </Typography>
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                ml: 2,
                pt: 2,
              }}
            >
              <Button
                onClick={() => {
                  setConsentido(true);
                  obtenerIp();
                }}
                variant="contained"
                color="primary"
                size="small"
              >
                Validar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ConsentimientoIp;
