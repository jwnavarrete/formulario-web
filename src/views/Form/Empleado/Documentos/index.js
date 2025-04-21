import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import InputFile from "@components/ui/_InputFile";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

const index = () => {
  const { hash, documento, documentos, handleChangeUpload, setInitialStateDocumentos,esPeeps } = useContext(EmpleadoContext)
  // 
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setInitialStateDocumentos()
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <h3>Documentos Obligatorios Requeridos (ADJUNTAR) </h3>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">NOTA: Los documentos deben ser por separado (archivos permitidos .doc, .docx, .pdf, .jpg, .jpeg, .png, .tiff,
            .bmp)</Alert>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <></>
      </Grid>
      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia de c&eacute;dula o documento de identidad.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-empleado" type="file" hidden name="cedula" hash={hash} onChange={handleChangeUpload("cedula")} cargado={documento.cedula?.cargado} />
      </Grid>

      {/* {documentos.copiaCedulaConyugue && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              -Copia de c&eacute;dula o documento de identidad del
              c&oacute;nyuge o conviviente de ser aplicable.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile api="documento-prestador" type="file" hidden name="cedulaConyugue" hash={hash} onChange={handleChangeUpload("cedulaConyugue")} cargado={documento.cedulaConyugue?.cargado} />
          </Grid>
        </>
      )} */}

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
        Copia de planilla de servicios b&aacute;sicos de domicilio.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-empleado" type="file" hidden name="planillaServicio" hash={hash} onChange={handleChangeUpload("planillaServicio")} cargado={documento.planillaServicio?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Hoja de vida.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-empleado" type="file" hidden name="declaracionPagoImp" hash={hash} onChange={handleChangeUpload("declaracionPagoImp")} cargado={documento.declaracionPagoImp?.cargado} />
      </Grid>
      {
        esPeeps && (
          <>
          <Grid item xs={12} md={6} lg={9}>
              <Typography align="justify">
              Nombramiento del cargo, con periodo de funciones (aplica para
              personas expuestas pol&iacute;ticamente).
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <InputFile api="documento-empleado" type="file" hidden name="nombramientoCargo" hash={hash} onChange={handleChangeUpload("nombramientoCargo")} cargado={documento.nombramientoCargo?.cargado} />
            </Grid>
            <Grid item xs={12} md={6} lg={9}>
              <Typography align="justify">
              Copia de la Declaraci&oacute;n del pago del impuesto a la
              renta del a&ntilde;o inmediato anterior (aplica para personas
              expuestas pol&iacute;ticamente).
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <InputFile api="documento-empleado" type="file" hidden name="declaracionPagoImpPep" hash={hash} onChange={handleChangeUpload("declaracionPagoImpPep")} cargado={documento.declaracionPagoImpPep?.cargado} />
            </Grid>
            <Grid item xs={12} md={6} lg={9}>
              <Typography align="justify">
                Certificado de ingresos mensuales (aplica para personas expuestas pol&iacute;ticamente).
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <InputFile api="documento-empleado" type="file" hidden name="certIngresoMensual" hash={hash} onChange={handleChangeUpload("certIngresoMensual")} cargado={documento.certIngresoMensual?.cargado} />
            </Grid>
            <Grid item xs={12} md={6} lg={9}>
              <Typography align="justify">
                Declaración sobre la condición de persona expuesta políticamente.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <InputFile api="documento-empleado" type="file" hidden name="declaracionPep" hash={hash} onChange={handleChangeUpload("declaracionPep")} cargado={documento.declaracionPep?.cargado} />
            </Grid>
          </>
        )
      }
    </>
  );
};

export default index;
