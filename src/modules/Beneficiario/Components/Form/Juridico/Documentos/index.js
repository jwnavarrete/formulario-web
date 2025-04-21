import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { JuridicoContext } from '@modules/Beneficiario/context/JuridicoContext'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import InputFile from '@components/ui/_InputFile'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const index = () => {
  const {
    _documento,
    _hash,
    handleChangeUpload,
    _esPeps,
    _tieneConyugeConviviente,
    handleLoadDocuments,
    formData,
  } = useContext(JuridicoContext)

  const {
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    handleLoadDocuments()
  }, [formData])

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

      <>
        <Grid item xs={12} md={6} lg={9}>
          <Typography align="justify">
            Copia de Registro Único de Contribuyentes RUC
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InputFile
            api="documento-beneficiario"
            type="file"
            hidden
            name="RUC"
            hash={_hash}
            onChange={handleChangeUpload('RUC')}
            cargado={_documento.RUC?.cargado}
          />
        </Grid>
      </>

      <>
        <Grid item xs={12} md={6} lg={9}>
          <Typography align="justify">
            Copia certificada del nombramiento del representante legal o
            apoderado
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InputFile
            api="documento-beneficiario"
            type="file"
            hidden
            name="NombramientoDelRepresentanteLegal"
            hash={_hash}
            onChange={handleChangeUpload('NombramientoDelRepresentanteLegal')}
            cargado={_documento.NombramientoDelRepresentanteLegal?.cargado}
          />
        </Grid>
      </>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Nómina actualizada de accionistas o socios, en la que consten los
          montos de las acciones o participaciones obtenidas por el cliente en
          el órgano de control o registro competente.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile
          api="documento-beneficiario"
          type="file"
          hidden
          name="NominaDeAccionistasSocios"
          hash={_hash}
          onChange={handleChangeUpload('NominaDeAccionistasSocios')}
          cargado={_documento.NominaDeAccionistasSocios?.cargado}
        />
      </Grid>

      {_tieneConyugeConviviente && (
        <>
          <Grid item xs={12} md={6} lg={9}>
            <Typography align="justify">
              Copia de documento de identificación del cónyuge o conviviente,
              del representante legal o apoderado, si aplica.{' '}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <InputFile
              api="documento-beneficiario"
              type="file"
              hidden
              name="CedulaDeIdentificacionDelConyugueRepresentante"
              hash={_hash}
              onChange={handleChangeUpload(
                'CedulaDeIdentificacionDelConyugueRepresentante',
              )}
              cargado={
                _documento.CedulaDeIdentificacionDelConyugueRepresentante
                  ?.cargado
              }
            />
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Documentos de identificación de las personas que sean firmas
          autorizadas de la empresa, o de quienes representen legalmente a la
          entidad.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile
          api="documento-beneficiario"
          type="file"
          hidden
          name="DocumentosIdentificacionPersonasAutorizadas"
          hash={_hash}
          onChange={handleChangeUpload(
            'DocumentosIdentificacionPersonasAutorizadas',
          )}
          cargado={
            _documento.DocumentosIdentificacionPersonasAutorizadas?.cargado
          }
        />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Estados financieros, mínimo de un año atrás. Si por disposición legal,
          tienen la obligación de contratar auditoría externa, los estados
          financieros deberán ser auditados.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile
          api="documento-beneficiario"
          type="file"
          hidden
          name="EstadosFinancieros"
          hash={_hash}
          onChange={handleChangeUpload('EstadosFinancieros')}
          cargado={_documento.EstadosFinancieros?.cargado}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={9}>
        <Typography align="justify">
          Certificado de cumplimiento de obligaciones otorgado por el órgano de
          control competente, de ser aplicable.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputFile
          api="documento-beneficiario"
          type="file"
          hidden
          name="CertificadoCumplimiento"
          hash={_hash}
          onChange={handleChangeUpload('CertificadoCumplimiento')}
          cargado={_documento.CertificadoCumplimiento?.cargado}
        />
      </Grid>

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

      {/* {JSON.stringify(_documento)} */}
    </>
  )
}

export default index
