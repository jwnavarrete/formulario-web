import React, { createContext, useState, useMemo } from 'react'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import axios from 'axios'

export const JuridicoContext = createContext()

const JuridicoProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()
  //
  const [_isLoading, setLoading] = useState(true)
  const [formData, setFormData] = useState([])
  const [openModalRegistro, setOpenModalRegistro] = useState(false)
  const [datosIniciales, setDatosIniciales] = useState({})
  //
  const [_revisionInterna, setRevisionInterna] = useState(false)
  const [_tieneCambios, setTieneCambios] = useState(false)
  const [_estado, setEstado] = useState('P')
  const [_steeps, setSteeps] = useState([])
  const [_tieneFirma, setTieneFirma] = useState('N')
  const [_hash, setHash] = useState('')
  const [_activeStep, setActiveStep] = useState(0)
  const [_completed, setCompleted] = useState([])
  const [_tieneOtrosIngresos, setItieneOtrosIngresos] = useState(false)
  const [_tieneConyugeConviviente, setTieneConyugeConviviente] = useState(false)
  const [_isDisabled, setIsDisabled] = useState([])
  const [_documento, setDocumento] = useState({})
  const [_tipoIdentificacion, setTipoIdentificacion] = useState(false)
  const [_tieneListaPeps, setTieneListaPeps] = useState(false)
  const [_esPeps, setEsPeps] = useState(false)
  const [_lastSteeep, setLastSteep] = useState(false)

  const URL_BASE = '/beneficiario'

  const handleChangePeps = (value) => {
    setEsPeps(value == 'S')
  }
  // *********** INICIO FUNCIONES PARA EL MANEJO DE LOS PASOS DEL FORMULARIO
  const isLastStep = () => {
    return _activeStep === _steeps.length - 1
  }

  const getCurrentSteep = () => {
    return completedSteps() === _steeps.length ? _activeStep - 1 : _activeStep
  }

  const completedSteps = () => {
    return Object.keys(_completed).length
  }

  const allStepsCompleted = () => {
    return completedSteps() === _steeps.length
  }

  const handleSetNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? _steeps.findIndex((step, i) => !(i in _completed))
        : _activeStep + 1

    setActiveStep(newActiveStep)
  }

  const handleSetBack = () => {
    if (_activeStep > 0) {
      setActiveStep(_activeStep - 1)
    }
  }

  const handleSetCompleted = (steep) => {
    // setActiveStepForm(steep)
    // completed[steep] = true
    setCompleted({ ..._completed, [steep]: true })
  }

  const setActiveStepForm = (lastSteep) => {
    const completed = {}
    console.log('lastSteep:', lastSteep)
    // RECORREMOS EL ULTIMO STEEP Y SETEAMOS COMO COMPLETADOS LOS SPEETS
    for (let steep = 0; steep < lastSteep; steep++) {
      completed[steep] = true
    }
    console.log(completed)
    //
    setActiveStep(lastSteep)
    setCompleted(completed)
  }

  const handleSetActiveStepForm = () => {
    console.log('_activeStep:', _activeStep)
    console.log('_steeps.length:', _steeps.length)
    if (_activeStep !== _steeps.length) {
      setActiveStepForm(_activeStep + 1)
    }
  }

  // *********** FIN FUNCIONES PARA EL MANEJO DE LOS PASOS DEL FORMULARIO
  const grabarFormulario = async (jsonData) => {
    const urlapi = 'beneficiario/formulario'

    const { data } = await axiosPrivate.post(urlapi, jsonData)
    // await envioCorreoInicio(data.hash)

    setOpenModalRegistro(false)

    swal({
      title: 'Formulario Online',
      text: `Revisa en tu correo el link con el que puedes continuar llenando el Formulario de Vinculación`,
      icon: 'info',
      buttons: {
        continuar: {
          text: 'Aceptar',
          value: 'continue',
        },
      },
    }).then((value) => {
      if (value == 'continue') {
        data.url
          ? (window.location.href = data.url)
          : alert('Se presenta un error, por favor vuelva a intentar')
      }
    })
  }

  const loadData = async (hash) => {
    if (hash) {
      const { data } = await axiosPrivate.get(`${URL_BASE}/${hash}/juridico`)
      setLoading(false)
      if (data) {
        //   // PROCESAMOS LOS ESTADOS DE TODOS LOS PASOS
        procesaStados(data)
      } else {
        setOpenModalRegistro(true)
      }
      // STEAMOS LOS DATOS EN UN USESTATE()
      setFormData(data)
      return data
    } else {
      setOpenModalRegistro(true)
    }
  }

  const procesaStados = (data) => {
    const { formulario, solicitante, hash, representante_apoderado } = data
    let esPep = false
    let tieneConyugeConviviente = false
    // // SETEMOS LOS VALORES DEL FORMULARIO
    if (formulario) {
      setEstado(formulario.estado)
      setTipoIdentificacion(formulario.tip_identificacion)
    }
    // // SETEAMOS EL ESTADO DEL SOLICITANTE
    if (solicitante) {
      handleChangePeps(solicitante.seleccionar_pep)

      // SI TIENE BENEFICIARIO HACE LA CONSULTA DE LISTA
      handleValidaLista(
        solicitante.tipo_identificacion,
        solicitante.num_identificacion_empresa,
        '',
        solicitante.razon_social_empresa,
      )
    }
    // SETEAMOS LOS DATOS INICIALES
    if (representante_apoderado) {
      handleChangeEstadoCivil(representante_apoderado.est_civil)
    }
    // CARGAMOS LOS DOCUMENTOS
    // getDocumentosCargados(hash, esPep, tieneConyugeConviviente)
  }

  const handleLoadDocuments = () => {
    const { solicitante = {}, hash = '', representante_apoderado = {} } = formData;
  
    const est_civil = representante_apoderado?.est_civil || '';
    const esPep = solicitante?.seleccionar_pep === 'S';
  
    const tieneConyuge = est_civil === '02' || est_civil === '04' || est_civil === '06';
  
    getDocumentosCargados(hash, esPep, tieneConyuge);
  };

  const setDocumentosObligatorios = (esPeps, tieneConyugeConviviente) => {
    const initialDocuemtos = {
      RUC: {
        cargado: false,
        obligatorio: true,
      },
      NombramientoDelRepresentanteLegal: {
        cargado: false,
        obligatorio: true,
      },
      NominaDeAccionistasSocios: {
        cargado: false,
        obligatorio: true,
      },
      CedulaDeIdentificacionDelConyugueRepresentante: {
        cargado: false,
        obligatorio: tieneConyugeConviviente ? true : false,
      },
      DocumentosIdentificacionPersonasAutorizadas: {
        cargado: false,
        obligatorio: true,
      },
      EstadosFinancieros: {
        cargado: false,
        obligatorio: true,
      },
      CertificadoCumplimiento: {
        cargado: false,
        obligatorio: true,
      },
      // DATOS DE INGRESOS PEPS
      CertificadoDeIngresosMensuales: {
        cargado: false,
        obligatorio: esPeps ? true : false,
      },
      NombramientoDelCargo: {
        cargado: false,
        obligatorio: esPeps ? true : false,
      },
      DeclaracionDelPagoDelImpuesto: {
        cargado: false,
        obligatorio: esPeps ? true : false,
      },
    }
    //
    return initialDocuemtos
  }

  const getDocumentosCargados = async (
    hash,
    esPeps,
    tieneConyugeConviviente,
  ) => {
    const initialDocuemtos = setDocumentosObligatorios(
      esPeps,
      tieneConyugeConviviente,
    )
    const { data } = await axiosPrivate.get(`/documento-beneficiario/${hash}`)
    const newDocumentos = {}
    Object.keys(initialDocuemtos).map((name, index) => {
      const row = initialDocuemtos[name]
      const dataDocumento = data.filter((item) => item.name == name)
      newDocumentos[name] = {
        ...row,
        cargado: dataDocumento.length > 0 ? true : false,
      }
    })

    setDocumento({ ...newDocumentos })
  }

  // ******* FUNCIONES PARA VALIDAR CAMBIOS EN EL FORMULARIO
  const normalizeValues = (objeto) => {
    const normalizedObj = {}
    for (const key in objeto) {
      // Normaliza el tipo de dato de cada valor
      if (typeof objeto[key] === 'string') {
        // Intenta convertir cadenas a números si es posible
        const numValue = parseFloat(objeto[key])
        normalizedObj[key] = isNaN(numValue) ? objeto[key] : numValue
      } else {
        // Si el valor no es una cadena, simplemente cópialo
        normalizedObj[key] = objeto[key]
      }
    }
    return normalizedObj
  }

  const validaCambiosFormulario = (watchedValues) => {
    const normalizedInitialValues = normalizeValues(datosIniciales)
    const normalizedWatchedValues = normalizeValues(watchedValues)

    const diferencias = encuentraDiferencias(
      normalizedInitialValues,
      normalizedWatchedValues,
    )
    const cambios = Object.keys(diferencias).length > 0
    setTieneCambios(cambios)

    if (_revisionInterna) {
      setTieneCambios(false)
    }
  }

  const encuentraDiferencias = (objetoInicial, objetoComparar) => {
    const diferencias = {}

    // Comprobamos cada clave en el objeto inicial
    Object.keys(objetoInicial).forEach((key) => {
      // Si la clave existe en ambos objetos y los valores son diferentes
      const valorInicial = objetoInicial[key]
      const valorComparado = objetoComparar[key]

      // Manejamos el caso de valores nulos y cadenas vacías
      const sonDiferentes =
        valorInicial !== valorComparado &&
        !(valorInicial == null && valorComparado === '') &&
        !(valorInicial === '' && valorComparado == null)

      if (key in objetoComparar && sonDiferentes) {
        diferencias[key] = {
          valorInicial,
          valorComparado,
        }
      }
    })

    return diferencias
  }

  const getDisableByName = (name) => {
    let found = _isDisabled.find((element) => element.name == name)
    return found?.disabled ?? false
  }

  //:controla los inputs dependientes
  const handleDependInput = (value, validate, inputs, methods) => {
    inputs.forEach((element) => {
      let disabled = false

      if (value != validate) {
        methods.setValue(element, '')
        disabled = true
      }

      let index = _isDisabled.findIndex((item) => item.name == element)
      if (index < 0) {
        _isDisabled.push({ name: element, disabled })
      } else {
        _isDisabled[index] = { name: element, disabled }
      }
    })

    setIsDisabled([..._isDisabled])
  }
  // ******* FIN, FUNCIONES PARA VALIDAR CAMBIOS EN EL FORMULARIO

  const handleChangeOtrosIngresos = (value) => {
    setItieneOtrosIngresos(value == 'S')
  }

  const handleChangeEstadoCivil = (valor) => {
    setTieneConyugeConviviente(false)
    if (valor == '02' || valor == '04' || valor == '06') {
      setTieneConyugeConviviente(true)
    }
  }

  const mansajeDocumento = (icon, mensaje) => {
    swal({
      title: 'FORMULARIO DE VINCULACIÓN',
      text: `${mensaje}`,
      icon: `${icon}`,
      button: 'Aceptar',
    })
  }

  const validarExt = async (event) => {
    const File = event.target.files[0]
    const { name, size, type } = File
    const MAX_FILE_SIZE = 5242880

    if (size > MAX_FILE_SIZE) {
      mansajeDocumento(
        'error',
        `archivo supera el limite permitido: ${MAX_FILE_SIZE}`,
      )
      event.target.value = ''
      return false
    } else if (size == 0) {
      mansajeDocumento('error', `archivo vacio`)
      event.target.value = ''
      return false
    }

    var extPermitidas = /(.pdf|.doc|.docx|.jpg|.jpeg|.png|.tiff|.bmp)$/i
    if (!extPermitidas.exec(name)) {
      mansajeDocumento('error', 'Documento no permitido')
      event.target.value = ''
      return false
    }
    return true
  }

  const handleChangeUpload = (name) => async (event) => {
    let validado = await validarExt(event, name)
    // SETEMOS TODOS LOS DOCUMENTOS Y DEL CAMPO ACTUAL ENVIAMOS LO QUE TIENE MAS EL NUEVO ESTADO DEL CARGADO
    if (validado == true) {
      try {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        formData.append('name', name)
        formData.append('hash', _hash)

        const response = await axiosPrivate.post(
          '/documento-beneficiario/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )

        if (response) {
          mansajeDocumento('success', `archivo cargado con éxito!`)
        }
        setDocumento({
          ..._documento,
          [name]: { ..._documento[name], cargado: true },
        })
      } catch (error) {
        mansajeDocumento('error', error)
        setDocumento({
          ..._documento,
          [name]: { ..._documento[name], cargado: false },
        })
      }
    } else {
      setDocumento({
        ..._documento,
        [name]: { ..._documento[name], cargado: false },
      })
    }
  }

  const validaDocumentos = () => {
    let bandera = true
    const requeridos = Object.keys(_documento).filter((item, index) => {
      const row = _documento[item]
      return row.cargado == false && row.obligatorio == true
    })

    if (requeridos.length > 0) {
      bandera = false
    }
    return bandera
  }

  const handleValidaDocumentos = () => {
    return validaDocumentos()
  }

  const handleValidaLista = async (
    tipIdentificacion,
    numIdenficacion,
    apellidos,
    nombres,
  ) => {
    const [apellido1, apellido2] = apellidos.split(' ')
    const [nombre1, nombre2] = nombres.split(' ')

    const apellido1Final = apellido1 || 'x'
    const apellido2Final = apellido2 || 'x'
    const nombre1Final = nombre1 || 'x'
    const nombre2Final = nombre2 || 'x'

    try {
      const response = await axios.post(
        `${process.env.PEPS_URL_API}/peps/v1/launch`,
        {
          force: false,
          typedoc: tipIdentificacion,
          doc: numIdenficacion,
          origen: process.env.PEPS_ORIGEN,
          usuario: process.env.PEPS_USUARIO,
          correo_emi: process.env.PEPS_CORREO,
          nom1: apellido1Final,
          nom2: apellido2Final,
          ape1: nombre1Final,
          ape2: nombre2Final,
        },
      )

      setTieneListaPeps(false)
      if (response?.data?.estado == 'L') {
        setTieneListaPeps(true)
      }
    } catch (error) {
      swal({
        title: 'Formulario Online',
        text: `Error al validar listas PEPS`,
        icon: 'info',
        buttons: {
          continuar: {
            text: 'Aceptar',
            value: 'continue',
          },
        },
      })
    }
  }

  const valueMemo = useMemo(
    () => ({
      openModalRegistro,
      _isLoading,
      formData,
      _revisionInterna,
      _tieneCambios,
      _steeps,
      _tieneFirma,
      _hash,
      _activeStep,
      _completed,
      _estado,
      _isDisabled,
      _tieneOtrosIngresos,
      _tieneConyugeConviviente,
      _documento,
      _tieneListaPeps,
      _esPeps,
      setEstado,
      setRevisionInterna,
      grabarFormulario,
      loadData,
      validaCambiosFormulario,
      handleSetNext,
      handleSetBack,
      handleSetCompleted,
      getCurrentSteep,
      handleSetActiveStepForm,
      setDatosIniciales,
      setSteeps,
      setTieneFirma,
      setHash,
      setActiveStep,
      setFormData,
      setOpenModalRegistro,
      getDisableByName,
      handleDependInput,
      handleChangeOtrosIngresos,
      handleChangeEstadoCivil,
      handleChangeUpload,
      handleValidaDocumentos,
      handleValidaLista,
      setActiveStepForm,
      handleChangePeps,
      handleLoadDocuments,
    }),
    [
      formData,
      openModalRegistro,
      _isLoading,
      _revisionInterna,
      _tieneCambios,
      _steeps,
      _tieneFirma,
      _hash,
      _activeStep,
      _completed,
      _estado,
      _isDisabled,
      _tieneOtrosIngresos,
      _tieneConyugeConviviente,
      _documento,
      _tieneListaPeps,
      _esPeps,
    ],
  )

  return (
    <JuridicoContext.Provider value={valueMemo}>
      {children}
    </JuridicoContext.Provider>
  )
}

export default JuridicoProvider
