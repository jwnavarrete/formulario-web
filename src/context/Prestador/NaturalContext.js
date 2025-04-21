import React, { useMemo, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import AuthService from '@services/AuthService'
import qs from 'qs'
import axios from 'axios'
export const NaturalContext = createContext()

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

import { _esProveedor, _tieneConyugue, _esAsegurado, _esBeneficiario, validaDocumentos, validarExt, mansajeDocumento, _tieneRuc } from './Functions'

const NaturalProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [isDisabled,setIsDisabled] = useState([])
    const [tipoPrestador,setTipoPrestador] = useState('')
    const [emiFactSolicitante, setEmiFactSolicitante] = useState(true);
    const [disableTipoinfoadicional, setDisableTipoinfoadicional] = useState(true);
    const [documento, setDocumento] = useState({});
    const [estado, setEstado] = useState("P");
    const [disabledOcupacion, setDisabledOcupacion] = useState(false);
    const [infoCasado, setInfoCasado] = useState(false);
    const [revisionInterna, setRevisionInterna] = useState(false);
    const [estadoDisabled, setEstadoDisabled] = useState(false);
    // VALORES PARA LOS CAMBIOS DEL FORMULARIO
    const [datosIniciales, setDatosIniciales] = useState({})
    const [tieneCambios, setTieneCambios] = useState(false)

    const { prestador, documentos, referencias, hash, completed, activeStep, incluyeReferencia, esPeeps, pagoImpRenta, steeps, isGranContrib } = useSelector((state) => state.PrestadorFormNatural);

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

        if (revisionInterna){
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
        try {
            // CONSULTAMOS SOLO SI EXISTE
            if (hash) {
                const dataToken = await authToken({ tipo: "prestador", hash: hash });
                const { data } = await axiosPrivate.get(`/formulario-prestador/${hash}/natural`)
           
                setLoading(false)

                if (data) {
                    procesaStados(data)
                } else {
                    setModalVisible(true)
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
                setModalVisible(true)
            }

        } catch (error) {
            setModalVisible(true)
        }
    }

    const procesaStados = (data) => {
        const { formulario, info_prestador, actividad, cuestionario, hash } = data
        // SETEMOS LOS VALORES DEL FORMULARIO
        if (formulario) {
            setEstado(formulario.estado)
            handleChangeTipPrestador(formulario.tipo_prestador)
        }
        // // SETEAMOS EL ESTADO DEL SOLICITANTE
        if (info_prestador) {            
            handleChangeEstadoCivil(info_prestador.est_civil)
            handleChangeTipPrestador(info_prestador?.tipo_prestador??'')
            handleGranContrib(info_prestador?.is_contrib_especial??'')
        }

        if (cuestionario) {
            handleReferidoCompania(cuestionario.referido);
        }
        if (cuestionario) {
            handleChangeAcreditacionAutomatica(cuestionario.acreditacion_automatica);
        }

        // CARGAMOS LOS DOCUMENTOS
        // getDocumentosCargados(hash)
    }

    const setDocumentoPrestador = (valor) => {
        if (valor == "02" || valor == '04') {
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

        setInfoCasado(false)
        if (valor == '02' || valor == '04') {
            setInfoCasado(true)
        }
    };

    const handleChangeTipPrestador = (valor) => {
        dispatch(
            setPrestador({ ...prestador, esProveedor: _esProveedor(valor) })
        );
    };

    const handleChangePrestador = (prop) => (event) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        if (prop == "tipo_prestador") {
            handleChangeTipPrestador(event.target.value);
            setTipoPrestador(event.target.value)
        }
        if (prop == "est_civil") {
            handleChangeEstadoCivil(event.target.value);
        }
    };

    const handleChangeTipIdentificacionPrestador = (value) => {
        dispatch(
            setPrestador({ ...prestador, tieneRuc: _tieneRuc(value) })
        );
    }

    const handleChangeOtrosIngresos = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setOtrosIngresosInfo(false));
        if (value == "S") {
            dispatch(setOtrosIngresosInfo(true));
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
                obligatorio: prestador.tieneRuc ? true : false
            },
            cedula: {
                cargado: false,
                obligatorio: formData.info_prestador?.tipo_prestador != '01'? true:false
            },
            cedulaConyugue: {
                cargado: false,
                obligatorio: documentos.copiaCedulaConyugue ? true : false
            },
            planillaServicio: {
                cargado: false,
                obligatorio: formData.info_prestador?.tipo_prestador != '01'? true:false
            },
            declaracionPagoImp: {
                cargado: false,
                obligatorio: formData.info_prestador?.tipo_prestador != '01'? true:false
            },
            nombramientoCargo: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            certIngresoMensual: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
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

    const setInitialStateDocumentos = () => {
        const initialDocuemtos = setDocumentosObligatorios();
        setDocumento(initialDocuemtos);
    }

    const handleValidaDocumentos = () => {
        return validaDocumentos(documento)
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


    const handleChangeAcreditacionAutomatica = (valor) => {
        dispatch(setReferencia({ ...referencias, acreditacionAutomatica: false }))
        if (valor == "S") {
            dispatch(setReferencia({ ...referencias, acreditacionAutomatica: true }))
        }
    }

    const handleChangeTipSolic = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        setEmiFactSolicitante(true);
        if (value == "O") {
            setEmiFactSolicitante(false);
        }
    };

    return (
        <NaturalContext.Provider
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
                    authToken,
                    // solicitante
                    prestador,
                    documentos,
                    setDocumentoPrestador,
                    setValorAsegurado,
                    handleChangePrestador,
                    handleChangeTipIdentificacionPrestador,
                    // ACTIVIDAD
                    handleChangeOtrosIngresos,
                    // REFERENCIAS
                    referencias,
                    incluyeReferencia,
                    handleChangePeeps,
                    handleReferidoCompania,
                    emiFactSolicitante,
                    handleChangeTipSolic,
                    disableTipoinfoadicional,
                    handleTipoAsegurado,
                    // DOCUMENTOS
                    handleValidaDocumentos,
                    setInitialStateDocumentos,
                    documento,
                    setDocumento,
                    esPeeps,
                    pagoImpRenta,
                    handleChangeUpload,
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
                    revisionInterna,
                    setRevisionInterna,
                    estadoDisabled,
                    handleGranContrib,
                    isGranContrib,
                    handleChangeAcreditacionAutomatica,
                    handleDependInput,
                    getDisableByName,
                    tipoPrestador,
                    setTipoPrestador,
                    setDatosIniciales,
                    validaCambiosFormulario, 
                    tieneCambios
                }),
                [hash, estado, formData, isLoading, prestador, documento, documentos, referencias, incluyeReferencia, disableTipoinfoadicional, completed, activeStep, esPeeps, pagoImpRenta, modalVisible, infoCasado, disabledOcupacion, revisionInterna, estadoDisabled,isGranContrib, tipoPrestador, emiFactSolicitante, tieneCambios]
            )}
        >
            {props.children}
        </NaturalContext.Provider>
    );
};

export default NaturalProvider;
