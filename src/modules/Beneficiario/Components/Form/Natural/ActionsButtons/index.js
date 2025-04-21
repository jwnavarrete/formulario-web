import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormContext } from 'react-hook-form'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import Loading from '@components/ui/Loading'
import ConsentimientoIp from '@utils/Partials/Concentimiento'
import swal from 'sweetalert'
import axios from 'axios'

const Botones = ({ grabaDatos }) => {
  const {
    _hash,
    _estado,
    _revisionInterna,
    _tieneCambios,
    _steeps,
    _tieneFirma,
    _completed,
    _activeStep,
    formData,
    setEstado,
    handleSetNext,
    handleSetBack,
    getCurrentSteep,
    handleValidaDocumentos,
  } = useContext(NaturalContext)

  const axiosPrivate = useAxiosPrivate()
  const [actionName, setActionName] = useState('Guardar')
  const [openModalConcentimiento, setOpenModalConcentimiento] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ip, setIp] = useState('')

  async function obtenerIp() {
    try {
      // const response = await axios.get('https://ipapi.co/json/')
      // setIp(response.data.ip)
      const response = await axios.get('https://api64.ipify.org?format=json')
      setIp(response.data.ip)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // hace obtener los datos de la firma solo si todos los pasos estan completados.
    if (_activeStep == _steeps.length) {
      obtenerIp()
    }

    if (_tieneFirma === true && _activeStep == _steeps.length) {
      setActionName('Guardar / Firmar Formulario')
    } else {
      setActionName('Guardar')
    }
    setValue('revisionInterna', _revisionInterna)
  }, [])

  const grabaFirma = async (data) => {
    // VALIDA LOS DOCUEMNTOS
    if (getCurrentSteep() === _steeps.length -1) {
      if (!handleValidaDocumentos()) {
        swal({
          title: 'Documentos requeridos',
          text: `Por favor, cargue todos los documentos para continuar`,
          icon: 'warning',
          buttons: {
            cerrar: 'Aceptar',
          },
        })
        return false
      }
    }

    // SI ES EL ULIMO PASO Y FIRMAS ESTA ACTIVO SE PRODCE CON LA FIRMA
    if (_tieneFirma === true && _activeStep == _steeps.length) {
      // SI NO PASA LA VALIDACION MUESTRA EL MODAL DE ACEPTACION
      if (!validaFirma()) {
        setOpenModalConcentimiento(true)
      } else {
        setIsLoading(true)
        await grabaDatos(data)
        await firmarFormulario()
        setIsLoading(false)
      }
    } else {
      grabaDatos(data)
    }
  }

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0')
  }

  const formatDate = (date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    )
  }

  const getData = async () => {
    const { formulario, info_beneficiario } = formData
    console.log('info_beneficiario', info_beneficiario)
    // const location = window.navigator && window.navigator.geolocation
    var infoDetail = {
      firmante: info_beneficiario.apellidos + ' ' + info_beneficiario.nombres,
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: formulario.identificacion,
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_beneficiario,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: formulario.identificacion,
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip,
    }

    return infoDetail
  }

  const firmarFormulario = async () => {
    try {
      console.log('Firmar formulario')
      // SI NO PASA LA VALIDACION MOSTRAMOS MODAL DE AUTORIZACION
      let datosFirma = await getData()
      const { data } = await axiosPrivate.post(
        `beneficiario/firma_beneficiario/${_hash}`,
        datosFirma,
      )
      console.log('data', data)

      if (data) {
        const { correo_ejecutivo, estado, firma } = data
        console.log('data:')
        console.log(data)
        // SI YA TIENE DATOS DE LA FIRMA ENVIAMOS A PROCESAR LOS DATOS
        if (firma) {
          setEstado(estado)
        }

        swal({
          title: 'Formulario Firmado',
          text: `Se procedió a enviar el formulario a revisión, donde será atendido por un ejecutivo: ${correo_ejecutivo}`,
          icon: 'success',
          buttons: {
            aceptar: 'Aceptar',
          },
        })
      }
    } catch (error) {
      console.error(error)
      mensajeError(error)
    }
  }

  const mensajeError = (mensaje) => {
    swal({
      title: 'Formulario Vinculacion',
      text: mensaje,
      icon: 'error',
      buttons: {
        aceptar: 'Aceptar',
      },
    })
  }

  const procesaDatos = async () => {
    const { data } = await axiosPrivate.post(
      `beneficiario/procesa-datos/${_hash}`,
    )
  }

  const getBrowserInfo = () => {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
        ) || []
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return 'IE ' + (tem[1] || '')
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edg)\/(\d+)/)
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
    return M.join(' ')
  }

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext() // retrieve all hook methods

  const validaFirma = () => {
    if (_tieneFirma && _activeStep == _steeps.length) {
      return !ip ? false : true
    }
    return true
  }

  const aprobarFirmaEjecutivo = async (param) => {
    try {
      if (validaFirma()) {
        setIsLoading(true)
        // LOS DATOS DEL EJECUTIVO SE GRABAN EN EL MISMO LUGAR DE LAS DECLARACIONES
        const { data } = await axiosPrivate.post(
          `/beneficiario-natural/declaracion/${_hash}`,
          param,
        )

        await firmarEjecutivo()
      } else {
        setOpenModalConcentimiento(true)
      }
    } catch (error) {
      mensajeError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const firmarEjecutivo = async () => {
    let datosFirma = await getDataEjecutivo()
    //
    const { data } = await axiosPrivate.post(
      `beneficiario/firma_ejecutivo/${_hash}`,
      datosFirma,
    )

    if (data) {
      const { correo_beneficiario, estado, correo_ejecutivo, firma_ejecutivo } =
        data
      const mensaje = `\nCorreo beneficiario: ${correo_beneficiario}, \nCorreo ejecutivo: ${correo_ejecutivo}`

      if (firma_ejecutivo) {
        setEstado(estado)
      }

      await procesaDatos()

      swal({
        title: 'Formulario Aceptado',
        text: `El proceso ha finalizado con éxito. ${mensaje}`,
        icon: 'success',
        buttons: {
          aceptar: 'Aceptar',
        },
      })
    }
  }

  const getDataEjecutivo = async () => {
    const { formulario } = formData

    var infoDetail = {
      firmante: getValues('nombre_ejecutivo'),
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: 'NA', //getValues('lugar_ejecutivo'),
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_ejecutivo,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: 'NA',
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip,
    }

    return infoDetail
  }

  const handleContinue = () => {
    handleSetNext()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <ConsentimientoIp
        openModal={openModalConcentimiento}
        setOpenModalConcentimiento={setOpenModalConcentimiento}
        setIp={setIp}
        ip={ip}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          ml: 2,
          pt: 2,
        }}
      >
        <Button
          disabled={getCurrentSteep() === 0}
          onClick={handleSetBack}
          sx={{ mr: 1 }}
          variant="contained"
          color="secondary"
        >
          Regresar
        </Button>

        <Button
          onClick={handleSubmit(handleContinue)}
          sx={{ mr: 1 }}
          variant="contained"
          color="secondary"
          // disabled={completed[activeStep] ? false : true}
          disabled={!_completed[_activeStep] || _tieneCambios} // Si completed[activeStep] es true O _tieneCambios es true, el botón se desactivará
        >
          Siguiente
        </Button>

        <Box sx={{ flex: '1 1 auto' }} />

        {_estado == 'P' && (
          <>
            <Button
              onClick={handleSubmit(grabaFirma)}
              variant="contained"
              color="primary"
            >
              {actionName}
            </Button>
          </>
        )}
        
        {_estado == 'A' && _revisionInterna && (
          <Button
            onClick={handleSubmit(aprobarFirmaEjecutivo)}
            variant="contained"
            color="primary"
            disabled={_completed[_activeStep] ? true : false}
          >
            Aprobar Formulario
          </Button>
        )}

      </Box>
    </>
  )
}

export default Botones
