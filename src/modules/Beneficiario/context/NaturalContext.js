import React, { createContext, useState, useMemo } from 'react'
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import axios from 'axios'

export const NaturalContext = createContext()

const NaturalProvider = ({ children }) => {
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
  const [_copiaCedulaConyuge, setCopiaCedulaConyuge] = useState(false)
  const [_tipoIdentificacion, setTipoIdentificacion] = useState('')
  const [_tieneListaPeps, setTieneListaPeps] = useState(false)
  const [_esPeps, setEsPeps] = useState(false)

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
      const { data } = await axiosPrivate.get(`${URL_BASE}/${hash}/natural`)
      setLoading(false)
      if (data) {
        // PROCESAMOS LOS ESTADOS DE TODOS LOS PASOS
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

  const setDocumentoSolicitante = (valor) => {
    if (valor == '02' || valor == '04' || valor == '06') {
      setCopiaCedulaConyuge(true)
    } else {
      setCopiaCedulaConyuge(false)
    }
  }

  const procesaStados = (data) => {
    const { formulario, info_beneficiario, informacion_financiera, hash } = data
    // // SETEMOS LOS VALORES DEL FORMULARIO
    if (formulario) {
      setEstado(formulario.estado)
      setTipoIdentificacion(formulario.tip_identificacion)
    }
    // // SETEAMOS EL ESTADO DEL SOLICITANTE
    if (info_beneficiario) {
      setDocumentoSolicitante(info_beneficiario.est_civil)

      handleChangeEstadoCivil(info_beneficiario.est_civil)
      // SI TIENE BENEFICIARIO HACE LA CONSULTA DE LISTA
      handleValidaLista(
        info_beneficiario.tipo_identificacion,
        info_beneficiario.num_identificacion,
        info_beneficiario.apellidos,
        info_beneficiario.nombres,
      )
    }

    if (informacion_financiera) {
      handleChangePeps(informacion_financiera?.seleccionar_pep)
    }
  }

  const handleLoadDocuments = () => {
    const { formulario, hash, info_beneficiario, informacion_financiera } =
      formData

    const _tipident = formulario?.tip_identificacion ?? ''
    const _estcivil = info_beneficiario?.est_civil ?? ''
    const _selecPeps = informacion_financiera?.seleccionar_pep ?? ''
    // CARGAMOS LOS DOCUMENTOS
    getDocumentosCargados(hash, _tipident, _estcivil, _selecPeps)
  }

  const setDocumentosObligatorios = (_tipident, _estcivil, _selecPeps) => {
    console.log('setDocumentosObligatorios:', _tipident, _estcivil, _selecPeps)

    const _pideCopiaCedulaConyugue =
      _estcivil == '02' || _estcivil == '04' || _estcivil == '06'

    console.log('_pideCopiaCedulaConyugue:', _pideCopiaCedulaConyugue)

    const initialDocuemtos = {
      Cedula: {
        cargado: false,
        obligatorio: _tipident == 'C' ? true : false,
      },
      Pasaporte: {
        cargado: false,
        obligatorio: _tipident == 'P' ? true : false,
      },
      PlanillaDeServiciosBasicos: {
        cargado: false,
        obligatorio: true,
      },
      CedulaConyugue: {
        cargado: false,
        obligatorio: _pideCopiaCedulaConyugue ? true : false,
      },
      CertificadoDeIngresosMensuales: {
        cargado: false,
        obligatorio: _selecPeps == 'S' ? true : false,
      },
      NombramientoDelCargo: {
        cargado: false,
        obligatorio: _selecPeps == 'S' ? true : false,
      },
      DeclaracionDelPagoDelImpuesto: {
        cargado: false,
        obligatorio: _selecPeps == 'S' ? true : false,
      },
    }
    //
    return initialDocuemtos
  }

  const getDocumentosCargados = async (
    hash,
    _tipident,
    _estcivil,
    _selecPeps,
  ) => {
    const initialDocuemtos = setDocumentosObligatorios(
      _tipident,
      _estcivil,
      _selecPeps,
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
    if (valor == '02' || valor == '04') {
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

    console.log('handleValidaLista')
    console.log(apellido1, apellido2, nombre1, nombre2)

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
          nom1: nombre1Final,
          nom2: nombre2Final,
          ape1: apellido1Final,
          ape2: apellido2Final,
        },
      )

      setTieneListaPeps(false)
      console.log('response lista peps')
      console.log(response.data.estado)
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
    <NaturalContext.Provider value={valueMemo}>
      {children}
    </NaturalContext.Provider>
  )
}

export default NaturalProvider
