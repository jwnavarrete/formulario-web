import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import InputFile from '@components/ui/_InputFile'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const index = () => {
  const {
    formData,
    _documento,
    _hash,
    handleChangeUpload,
    _esPeps,
    handleLoadDocuments,
    _tieneConyugeConviviente,
  } = useContext(NaturalContext)

  const [tieneCedula, setTieneCedula] = useState(true)

  const {
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    handleLoadDocuments()
  }, [formData])

  useEffect(() => {
    const { formulario } = formData
    // if (formulario?.tip_identificacion === 'C') {
    setTieneCedula(false)
    if (
      formulario?.tip_identificacion === 'C' ||
      formulario?.tip_identificacion === 'U'
    ) {
      setTieneCedula(true)
    }
    // }
    // setInitialStateDocumentos()
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <h3>Documentos Obligatorios Requeridos (ADJUNTAR) </h3>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">
            NOTA: Los documentos deben ser por separado (archivos permitidos
            .doc, .docx, .pdf, .jpg, .jpeg, .png, .tiff, .bmp)
          </Alert>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <></>
      </Grid>

      {/* {JSON.stringify(tieneCedula)} */}
      {tieneCedula && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Copia de cédula o documento de identidad
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="Cedula"
              hash={_hash}
              onChange={handleChangeUpload('Cedula')}
              cargado={_documento.Cedula?.cargado}
            />
          </Grid>
        </>
      )}

      {!tieneCedula && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Copia de pasaporte o equivalente
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="Pasaporte"
              hash={_hash}
              onChange={handleChangeUpload('Pasaporte')}
              cargado={_documento.Pasaporte?.cargado}
            />
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Copia de 1 planilla de servicios básicos
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile
          api="documento-beneficiario"
          type="file"
          hidden
          name="PlanillaDeServiciosBasicos"
          hash={_hash}
          onChange={handleChangeUpload('PlanillaDeServiciosBasicos')}
          cargado={_documento.PlanillaDeServiciosBasicos?.cargado}
        />
      </Grid>

      {_tieneConyugeConviviente && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Copia de cédula o documento de identidad del cónyuge o conviviente
              de ser aplicable
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="CedulaConyugue"
              hash={_hash}
              onChange={handleChangeUpload('CedulaConyugue')}
              cargado={_documento.CedulaConyugue?.cargado}
            />
          </Grid>
        </>
      )}

      {_esPeps && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Certificado de ingresos mensuales
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="CertificadoDeIngresosMensuales"
              hash={_hash}
              onChange={handleChangeUpload('CertificadoDeIngresosMensuales')}
              cargado={_documento.CertificadoDeIngresosMensuales?.cargado}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Nombramiento del cargo, con periodo de funciones
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="NombramientoDelCargo"
              hash={_hash}
              onChange={handleChangeUpload('NombramientoDelCargo')}
              cargado={_documento.NombramientoDelCargo?.cargado}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Copia de la Declaración del pago del impuesto a la renta del año
              inmediato anterior
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="DeclaracionDelPagoDelImpuesto"
              hash={_hash}
              onChange={handleChangeUpload('DeclaracionDelPagoDelImpuesto')}
              cargado={_documento.DeclaracionDelPagoDelImpuesto?.cargado}
            />
          </Grid>
        </>
      )}
    </>
  )
}

export default index
