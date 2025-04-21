import React, { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import InputFile from "@components/ui/_InputFile";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"

const index = () => {
  const { hash, formData, esPeeps, pagoImpRenta, documentos, documento, handleChangeUpload, prestador, setInitialStateDocumentos } = useContext(JuridicoContext)
  const {info_prestador} = formData
  // 

  const [tipoProveedor, setTipoProveedor] = useState(false)
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {


    handleChangeTipoProveedor()

    setInitialStateDocumentos()

  }, []);

  const handleChangeTipoProveedor = () => {
    const { info_prestador } = formData;

    setTipoProveedor(false)
    if (info_prestador.tipo_prestador == '01' || info_prestador.tipo_prestador == '02' || info_prestador.tipo_prestador == '03') {
      setTipoProveedor(true)
    }
  }

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
          Copia de Registro &Uacute;nico de contribuyentes RUC
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="reg_unic_ruc" hash={hash} onChange={handleChangeUpload("reg_unic_ruc")} cargado={documento.reg_unic_ruc?.cargado} />
      </Grid>

      {/* <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia de la escritura de constituci&oacute;n y de sus reformas, de existir &eacute;stas.
        </Typography>
          </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="esc_const_reformas" hash={hash} onChange={handleChangeUpload("esc_const_reformas")} cargado={documento.esc_const_reformas?.cargado} />
      </Grid> */}

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia certificada del nombramiento del representante legal o apoderado.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="cert_nomb_representante" hash={hash} onChange={handleChangeUpload("cert_nomb_representante")} cargado={documento.cert_nomb_representante?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          N&oacute;mina actualizada de accionistas o socios, en la que consten los montos o participantes obtenidas por el Prestador en el &oacute;rgano de control o registro competente.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="nomina_accionista" hash={hash} onChange={handleChangeUpload("nomina_accionista")} cargado={documento.nomina_accionista?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia de una planilla de servicios b&aacute;sicos actualizada.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="planillaServicio" hash={hash} onChange={handleChangeUpload("planillaServicio")} cargado={documento.planillaServicio?.cargado} />
      </Grid>

      {documentos.copiaCedulaConyugue && (
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
      )}

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia de documento de identificaci&oacute;n de las personas que sean firmas autorizadas de la empresa, o de quienes representen legalmente a la entidad.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="num_identificacion_autorizadas" hash={hash} onChange={handleChangeUpload("num_identificacion_autorizadas")} cargado={documento.num_identificacion_autorizadas?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Estados financieros, m&iacute;nimo de un a&ntilde;o atr&aacute;s. En caso de que por disposici&oacute;n legal, tienen la obligaci&oacute;n de contratar a una auditor&iacute;a externa, los estados financieros deber&aacute;n ser auditados.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="auditoria_externa" hash={hash} onChange={handleChangeUpload("auditoria_externa")} cargado={documento.auditoria_externa?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Certificado de cumplimiento de obligaciones otorgado por el &oacute;rgano de control competente, de ser aplicable. (Certificado de existencia legal).
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="existencia_legal" hash={hash} onChange={handleChangeUpload("existencia_legal")} cargado={documento.existencia_legal?.cargado} />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Confirmaci&oacute;n del pago del impuesto a la renta del a&ntilde;o inmediato anterior o constancia de la informaci&oacute;n publicada por el Servicio de Rentas Internas a trav&eacute;s de su p&aacute;gina WEB.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile api="documento-prestador" type="file" hidden name="conf_pago_imp_renta" hash={hash} onChange={handleChangeUpload("conf_pago_imp_renta")} cargado={documento.conf_pago_imp_renta?.cargado} />
      </Grid>

      {/* 02) Coasegurador. 03) Intermediario de Reaseguro */}
      {tipoProveedor && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Calificación de riesgo
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile api="documento-prestador" type="file" hidden name="calificacion_riesgo" hash={hash} onChange={handleChangeUpload("calificacion_riesgo")} cargado={documento.calificacion_riesgo?.cargado} />
          </Grid>
        </>
      )}
      {esPeeps && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Nombramiento del cargo, con periodo de funciones (aplica para
              personas expuestas pol&iacute;ticamente).
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile api="documento-prestador" type="file" hidden name="nombramientoCargo" hash={hash} onChange={handleChangeUpload("nombramientoCargo")} cargado={documento.nombramientoCargo?.cargado} />
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Certificado de ingresos mensuales (aplica para personas expuestas pol&iacute;ticamente).
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile api="documento-prestador" type="file" hidden name="certIngresoMensual" hash={hash} onChange={handleChangeUpload("certIngresoMensual")} cargado={documento.certIngresoMensual?.cargado} />
          </Grid>
        </>
      )}
      {info_prestador?.val_asegurado > 200000 && (
        <>
        <Grid item xs={12} md={6} lg={9}>
          <Typography align="justify">
            S&oacute;lo para suma asegurada acumulada superiores a US$
            200,000 la confirmaci&oacute;n del pago del impuesto a la renta
            del a&ntilde;o inmediato anterior o constancia de la
            informaci&oacute;n publicada por el Servicio de Rentas
            Internas a trav&eacute;s de su p&aacute;gina WEB, de ser
            aplicable.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <InputFile type="file" hidden name="pagoImpRenta" hash={hash} onChange={handleChangeUpload("pagoImpRenta")} cargado={documento.pagoImpRenta?.cargado} />
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <Typography align="justify">
            Estados financieros auditados en caso de ser aplicable.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InputFile type="file" hidden name="auditoria" hash={hash} onChange={handleChangeUpload("auditoria")} cargado={documento.auditoria?.cargado} />
        </Grid>
      </>
    )}

    </>
  );
};

export default index;
