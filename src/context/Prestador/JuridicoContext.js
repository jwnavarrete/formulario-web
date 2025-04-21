import React, { useMemo, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import AuthService from '@services/AuthService'
export const JuridicoContext = createContext()

import {
    setPrestador,
    setPagoImpRentas,
    setIncluyeReferencia,
    setDocumentos,
    setOtrosIngresosInfo,
    setPeep,
    setReferencia,
    handleNext,
    setCompleted,
    setActiveStepForm,
    setGranContrib
} from "@reducers/Prestador/formularioNatural/actions";

import { _esProveedor, _tieneConyugue, _esAsegurado, _esBeneficiario, validaDocumentos, validarExt, mansajeDocumento } from './Functions'

const JuridicoProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [isDisabled,setIsDisabled] = useState([])
    const [emiFactSolicitante, setEmiFactSolicitante] = useState(true);
    const [disableTipoinfoadicional, setDisableTipoinfoadicional] = useState(true);
    const [documento, setDocumento] = useState({});
    const [estado, setEstado] = useState("P");
    const [disabledOcupacion, setDisabledOcupacion] = useState(false);
    const [infoCasado, setInfoCasado] = useState(false);
    const [disableEspecifiqueSector, setDisableEspecifiqueSector] = useState(true);
    const [disableEspecifiqueTipoEmpresa, setDisableEspecifiqueTipoEmpresa] = useState(true);
    const [disableProvincia, setDisableProvincia] = useState(false);
    const [tipoPrestador,setTipoPrestador] = useState('')
    // ACCIONISTAS
    const [countAccionista, setCountAccionista] = useState(0);
    const [accionistas, setAccionistas] = useState([]);
    const [revisionInterna, setRevisionInterna] = useState(false);
    const [estadoDisabled, setEstadoDisabled] = useState(false);
    const [info_prestadors, setInfoPrestadors] = useState({});
    const [revisionInternaBroker, setRevisionInternaBroker] = useState(false);
    // VALORES PARA LOS CAMBIOS DEL FORMULARIO
    const [datosIniciales, setDatosIniciales] = useState({})
    const [tieneCambios, setTieneCambios] = useState(false)
    

    const { prestador, documentos, referencias, hash, completed, activeStep, incluyeReferencia, esPeeps, pagoImpRenta, steeps,isGranContrib} = useSelector((state) => state.PrestadorFormJuridico);

    const normalizeValues = (objeto) => {
        const normalizedObj = {};
        for (const key in objeto) {
            // Normaliza el tipo de dato de cada valor
            if (typeof objeto[key] === 'string') {
                // Intenta convertir cadenas a números si es posible
                const numValue = parseFloat(objeto[key]);
                normalizedObj[key] = isNaN(numValue) ? objeto[key] : numValue;
            } else {
                // Si el valor no es una cadena, simplemente cópialo
                normalizedObj[key] = objeto[key];
            }
        }
        return normalizedObj;
    };
    
    const validaCambiosFormulario = (watchedValues) => {
        const normalizedInitialValues = normalizeValues(datosIniciales);
        const normalizedWatchedValues = normalizeValues(watchedValues);
        
        const diferencias = encuentraDiferencias(normalizedInitialValues, normalizedWatchedValues);
        console.log(diferencias);
        const cambios = Object.keys(diferencias).length > 0;
        setTieneCambios(cambios);

        if (revisionInterna || revisionInternaBroker){
            setTieneCambios(false);
        }
    };
    
    const encuentraDiferencias = (objetoInicial, objetoComparar) => {
        const diferencias = {};
      
        // Comprobamos cada clave en el objeto inicial
        Object.keys(objetoInicial).forEach(key => {
            // Si la clave existe en ambos objetos y los valores son diferentes
            const valorInicial = objetoInicial[key];
            const valorComparado = objetoComparar[key];
    
            // Manejamos el caso de valores nulos y cadenas vacías
            const sonDiferentes = (valorInicial !== valorComparado) && !(valorInicial == null && valorComparado === "") && !(valorInicial === "" && valorComparado == null);
    
            if (key in objetoComparar && sonDiferentes) {
                diferencias[key] = {
                    valorInicial,
                    valorComparado
                };
            }
        });
      
        return diferencias;
    };

    useEffect(() => {
        if(hash){
            getDocumentosCargados(hash)
        }
    }, [esPeeps])

    const authToken = async param => {
        const { data } = await axiosPrivate.post(`/auth/token-form`,
            {
                tipo: param.tipo,
                hash: param.hash
            })

        if (data) {
            AuthService.setToken(data.access_token)
        } else {
            window.alert('Error al generar token de acceso')
        }

        return data
    }

    const loadData = async (hash) => {
        if (hash) {
            const dataToken = await authToken({ tipo: "prestador", hash: hash });

            const { data } = await axiosPrivate.get(`/formulario-prestador/${hash}/juridico`)
            // data = null
            setLoading(false)

            if (data) {
                // PROCESAMOS LOS ESTADOS DE TODOS LOS PASOS
                procesaStados(data)
            } else {
                setModalVisible(true)
            }
            if (data.info_prestador) {
                if (data.info_prestador.tipo_prestador) {
                    setInfoPrestadors(data.info_prestador.tipo_prestador)
                } else {
                    setInfoPrestadors({})
                }
            }
            if (data.formulario) {
                if (data.formulario.estado === "A") {
                    setEstadoDisabled(true)
                } else {
                    setEstadoDisabled(false)
                }
            }
            if (data.declaracion) {
                if (data.declaracion.seleccionar_pep == "S") {
                    dispatch(setPeep(true));
                }
            }
            // STEAMOS LOS DATOS EN UN USESTATE()
            setFormData(data)

            return data
        } else {
            // setModalVisible(true)
        }
    }

    const procesaStados = (data) => {
        const { info_prestador, formulario, cuestionario, representante } = data
        // SETEMOS LOS VALORES DEL FORMULARIO
        if (formulario) {
            setEstado(formulario.estado)
        }
        // SETEAMOS EL ESTADO DEL SOLICITANTE
        if (info_prestador) {
            dispatch(
                setPrestador({
                    // tieneConyugue: _tieneConyugue(info_prestador.est_civil),
                    esProveedor: _esProveedor(info_prestador.tipo_prestador),
                })
            );
            // setDocumentoPrestador(prestador.est_civil);
            // setValorAsegurado(prestador.val_asegurado);
            handleGranContrib(info_prestador?.is_contrib_especial??'')
        }

        // // ACTIVIDAD
        if (cuestionario) {
            handleChangeAcreditacionAutomatica(cuestionario.acreditacion_automatica);
        }

        // if (ref_factura) {
        //     // SETEAMOS EL ESTADO DEL SOLICITANTE
        //     // handleChangeTipSolic(ref_factura.solicitante);
        //     // SETEAMOS EL ESTADO DEL SOLICITANTE=
        //     handleReferidoCompania(ref_factura.referido);
        //     handleChangePeeps(ref_factura.seleccionar_pep);
        //     // 
        //     handleTipoAsegurado(ref_factura.seleccionar);
        // }

        // CARGAMOS LOS DOCUMENTOS
        // getDocumentosCargados(hash)

    }

    const setDocumentoPrestador = (valor) => {
        if (valor == "02" || valor == "04") {
            dispatch(setDocumentos({ ...documentos, copiaCedulaConyugue: true }));
        } else {
            dispatch(setDocumentos({ ...documentos, copiaCedulaConyugue: false }));
        }
    }

    const setValorAsegurado = (valor) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setPagoImpRentas(false));
        if (valor > 50000) {
            dispatch(setPagoImpRentas(true));
        }
        dispatch(setIncluyeReferencia(false));
        if (valor > 200000) {
            dispatch(setIncluyeReferencia(true));
        }
    }

    const handleChangeEstadoCivil = (valor) => {
        setDocumentoPrestador(valor);
        dispatch(
            setPrestador({ ...prestador, tieneConyugue: _tieneConyugue(valor) })
        );
    };

    const handleChangeTipPrestador = (valor) => {
        dispatch(
            setPrestador({ ...prestador, esProveedor: _esProveedor(valor), tipo: valor })
        );
    };

    const handleChangePrestador = (prop) => (event) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        if (prop == "tipo_prestador") {
            console.log(prop,event.target.value)
            handleChangeTipPrestador(event.target.value);
            setTipoPrestador(event.target.value)
        }
        if (prop == "est_civil") {
            handleChangeEstadoCivil(event.target.value);

            // 
            setInfoCasado(false)
            if (event.target.value == '02' || event.target.value == '04') {
                setInfoCasado(true)
            }
        }
    };

    const handleChangeOtrosIngresos = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setOtrosIngresosInfo(true));
        if (value == "S") {
            dispatch(setOtrosIngresosInfo(false));
        }
    };

    const handleChangePeeps = (valor) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setPeep(false));
        if (valor == "S") {
            dispatch(setPeep(true));
        }
    };

    const handleReferidoCompania = (valor) => {
        dispatch(setReferencia({ ...referencias, esReferido: true }))
        if (valor == "S") {
            dispatch(setReferencia({ ...referencias, esReferido: false }))
        }
    };

    // const handleChangeTipSolic = (value) => {
    //     // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    //     setEmiFactSolicitante(true);
    //     if (value == "O") {
    //         setEmiFactSolicitante(false);
    //     }
    // };

    const handleTipoAsegurado = (valor) => {
        if (valor == "O") {
            setDisableTipoinfoadicional(false);
        } else {
            setDisableTipoinfoadicional(true);
        }
    };

    const handleSetNext = () => {
        dispatch(handleNext())
    }

    const handleSetCompleted = () => {
        completed[activeStep] = true;
        dispatch(setCompleted(completed));
    }

    const handleSetActiveStepForm = () => {
        if (activeStep !== steeps.length) {
            dispatch(setActiveStepForm(activeStep + 1));
        }
    }

    const setDocumentosObligatorios = () => {

        const initialDocuemtos = {
            reg_unic_ruc: {
                cargado: false,
                obligatorio: true
            },
            esc_const_reformas: {
                cargado: false,
                obligatorio: false
            },
            cert_nomb_representante: {
                cargado: false,
                obligatorio: true
            },
            nomina_accionista: {
                cargado: false,
                obligatorio: true
            },
            planillaServicio: {
                cargado: false,
                obligatorio: true
            },
            cedulaConyugue: {
                cargado: false,
                obligatorio: documentos.copiaCedulaConyugue ? true : false
            },
            num_identificacion_autorizadas: {
                cargado: false,
                obligatorio: true
            },
            auditoria_externa: {
                cargado: false,
                obligatorio: true
            },
            existencia_legal: {
                cargado: false,
                obligatorio: true
            },
            conf_pago_imp_renta: {
                cargado: false,
                obligatorio: true
            },
            calificacion_riesgo: {
                cargado: false,
                obligatorio: (info_prestadors == "01" || info_prestadors == "02" || info_prestadors == "03") ? true : false
            },
            nombramientoCargo: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            certIngresoMensual: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            pagoImpRenta: {
                cargado: false,
                obligatorio: incluyeReferencia ? true : false
            },
            auditoria:{
                cargado: false,
                obligatorio: incluyeReferencia ? true : false
            }
        };
        // 
        return initialDocuemtos;
    }

    const getDocumentosCargados = async (hash) => {
        const initialDocuemtos = setDocumentosObligatorios();
        const { data } = await axiosPrivate.get(`documento-prestador/${hash}`);
        const newDocumentos = {}
        Object.keys(initialDocuemtos).map((name, index) => {
            const row = initialDocuemtos[name];
            const dataDocumento = data.filter(item => item.name == name)
            newDocumentos[name] = { ...row, cargado: dataDocumento.length > 0 ? true : false }
        });

        setDocumento({ ...newDocumentos });
    }

    const handleChangeUpload = (name) => async (event) => {
        let validado = await validarExt(event, name);
        // SETEMOS TODOS LOS DOCUMENTOS Y DEL CAMPO ACTUAL ENVIAMOS LO QUE TIENE MAS EL NUEVO ESTADO DEL CARGADO
        if (validado == true) {
            try {
                event.preventDefault()
                const formData = new FormData();
                formData.append("file", event.target.files[0]);
                formData.append("name", name);
                formData.append("hash", hash);

                const response = await axiosPrivate.post('/documento-prestador/upload', formData, { headers: { "Content-Type": "multipart/form-data" } });

                if (response) {
                    mansajeDocumento('success', `archivo cargado con éxito!`);
                    setDocumento({ ...documento, [name]: { ...documento[name], cargado: true } });
                }
            } catch (error) {
                mansajeDocumento('error', error);
                setDocumento({ ...documento, [name]: { ...documento[name], cargado: false } });
            }
        } else {
            setDocumento({ ...documento, [name]: { ...documento[name], cargado: false } });
        }
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isComplete = () => {
        return completedSteps() === steeps.length
    }

    const handleValidaDocumentos = () => {
        if(formData?.info_prestador?.tipo_prestador != '01'){
            return validaDocumentos(documento)
        }else{
            return true
        }
        
    }

    const handleChangeSectorEmpresa = (value) => {
        setDisableEspecifiqueSector(true)
        // 7 => TIPO DE SECTOR (OTROS)
        if (value == 7) {
            setDisableEspecifiqueSector(false)
        }
    }


    const handleChangeTipoEmpresa = (value) => {
        setDisableEspecifiqueTipoEmpresa(true)
        // VALOR 9 ES OTROS
        if (value == 9) {
            setDisableEspecifiqueTipoEmpresa(false)
        }
    }

    const setActiveProvincia = (valor) => {
        if (valor == "EC") {
            setDisableProvincia(false);
        } else {
            setDisableProvincia(true);
        }
    }

    const handleChangePais = (prop) => (e) => {
        setActiveProvincia(e.target.value)
    };


    // ACCIONISTAS DATOS
    const getAccionistas = async () => {
        const { data } = await axiosPrivate.get(
            `prestador-juridico/accionistas/${hash}`
        );

        if (data) {
            setCountAccionista(data.length)
        }
        setAccionistas(data)
    }

    const setInitialStateDocumentos = () => {
        const initialDocuemtos = setDocumentosObligatorios();
        setDocumento(initialDocuemtos);
    }

    const handleChangeAcreditacionAutomatica = (valor) => {
        dispatch(setReferencia({ ...referencias, acreditacionAutomatica: false }))
        if (valor == "S") {
            dispatch(setReferencia({ ...referencias, acreditacionAutomatica: true }))
        }
    }

    const handleGranContrib =(value) => {
        
        if(value == 'S'){
            dispatch(setGranContrib(true));
        }else{
            dispatch(setGranContrib(false));
        }
        
    }

    //:controla los inputs dependientes
    const handleDependInput = (
        value,
        validate,
        inputs,
        methods,
    ) =>{
            
            inputs.forEach(element => {

                let disabled = false;
                
                if(value != validate){

                    methods.setValue(element,'')
                    disabled = true;

                }

                let index = isDisabled.findIndex( item => item.name == element)

                if(index < 0){
                    isDisabled.push({name:element, disabled})
                }else{
                    isDisabled[index] = {name:element, disabled}
                }
                
            });
        
        setIsDisabled([...isDisabled])

    }

    //:: obtiene el estado del campo por el nombre
    const getDisableByName = (name) =>{
        
        let found = isDisabled.find(
            element => element.name == name
        );
        return found?.disabled??false
    }

    const handleChangeTipSolic = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        setEmiFactSolicitante(true);
        if (value == "O") {
            setEmiFactSolicitante(false);
        }
    };

    useEffect(() => {
        loadData()
    }, [])

    return (
        <JuridicoContext.Provider
            value={useMemo(
                () => ({
                    hash,
                    estado,
                    formData,
                    setFormData,
                    isLoading,
                    setLoading,
                    modalVisible,
                    loadData,
                    // solicitante
                    prestador,
                    documentos,
                    setDocumentoPrestador,
                    setValorAsegurado,
                    handleChangePrestador,
                    // ACTIVIDAD
                    handleChangeOtrosIngresos,
                    // REFERENCIAS
                    referencias,
                    incluyeReferencia,
                    handleChangePeeps,
                    handleReferidoCompania,
                    emiFactSolicitante,
                    // handleChangeTipSolic,
                    disableTipoinfoadicional,
                    handleTipoAsegurado,
                    // DOCUMENTOS
                    handleValidaDocumentos,
                    documento,
                    setDocumento,
                    esPeeps,
                    pagoImpRenta,
                    handleChangeUpload,
                    setInitialStateDocumentos,
                    handleChangeAcreditacionAutomatica,
                    // 
                    activeStep,
                    completed,
                    handleSetNext,
                    handleSetCompleted,
                    handleSetActiveStepForm,
                    setEstado,
                    isComplete,
                    getDocumentosCargados,
                    infoCasado,
                    setInfoCasado,
                    disabledOcupacion,
                    setDisabledOcupacion,
                    disableEspecifiqueSector,
                    handleChangeSectorEmpresa,
                    // TIPO EMPRESA
                    disableEspecifiqueTipoEmpresa,
                    handleChangeTipoEmpresa,
                    handleChangePais,
                    disableProvincia,
                    // ACCIONISTAS
                    countAccionista,
                    accionistas,
                    getAccionistas,
                    revisionInterna,
                    setRevisionInterna,
                    estadoDisabled,
                    handleGranContrib,
                    isGranContrib,
                    handleDependInput,
                    getDisableByName,
                    //revision
                    setRevisionInternaBroker,
                    revisionInternaBroker,
                    handleChangeTipSolic,
                    tipoPrestador,
                    setTipoPrestador,
                    // 
                    setDatosIniciales,
                    validaCambiosFormulario, 
                    tieneCambios,
                    handleChangeEstadoCivil,
                    setInfoCasado
                }),
                [hash, estado, formData, isLoading, prestador, documento, documentos, referencias, incluyeReferencia, disableTipoinfoadicional, completed, activeStep, esPeeps, pagoImpRenta, modalVisible, infoCasado, disabledOcupacion, disableEspecifiqueSector, disableProvincia, accionistas, disableEspecifiqueTipoEmpresa, revisionInterna, estadoDisabled,isGranContrib,tipoPrestador,getDisableByName, revisionInternaBroker, emiFactSolicitante, tieneCambios
                ]
            )}
        >
            {props.children}
        </JuridicoContext.Provider>
    );
};

export default JuridicoProvider;
