import React, { useMemo, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import AuthService from '@services/AuthService'
import qs from 'qs'
import axios from 'axios'
export const EmpleadoContext = createContext()

import {
    setEmpleado, setPagoImpRentas, setIncluyeReferencia, setDocumentos, setOtrosIngresosInfo, setPeep, setReferencia, handleNext, setCompleted, setActiveStepForm
} from "@reducers/Empleado/actions";

import { _esProveedor, _tieneConyugue, _esAsegurado, _esBeneficiario, validaDocumentos, validarExt, mansajeDocumento, _tieneRuc } from './Functions'

const EmpleadoProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    // const [emiFactSolicitante, setEmiFactSolicitante] = useState(true);
    const [disableTipoinfoadicional, setDisableTipoinfoadicional] = useState(true);
    const [documento, setDocumento] = useState({});
    const [estado, setEstado] = useState("P");
    const [disabledOcupacion, setDisabledOcupacion] = useState(false);
    const [infoCasado, setInfoCasado] = useState(false);
    const [infoVehiculo, setInfoVehiculo] = useState(false);
    const [infoSuperior, setinfoSuperior] = useState(false);
    const [tieneReferenciaBancaria, setTieneReferenciaBancaria] = useState(false);
    const [tieneReferenciaComercial, setTieneReferenciaComercial] = useState(false);
    const [infoCertificaciones, setInfoCertificaciones] = useState(false);
    const [infoIdiomas, setInfoIdiomas] = useState(false);
    // VALORES PARA LOS CAMBIOS DEL FORMULARIO
    const [datosIniciales, setDatosIniciales] = useState({})
    const [tieneCambios, setTieneCambios] = useState(false)
    // 
    const [ip, setIp] = useState('');

    const [revisionInterna, setRevisionInterna] = useState(false);



    const { empleado, documentos, referencias, hash, completed, activeStep, incluyeReferencia, esPeeps, pagoImpRenta, steeps } = useSelector((state) => state.EmpleadoForm);

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
                const dataToken = await authToken({ tipo: "empleado", hash: hash });
                const { data } = await axiosPrivate.get(`/formulario-empleado/${hash}/relacion`)
                setLoading(false)

                if (data) {
                    procesaStados(data)
                } else {
                    setModalVisible(true)
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
        const { formulario, datos_personales, formacion_varios, referencia_financiera, hash } = data
        // SETEMOS LOS VALORES DEL FORMULARIO
        if (formulario) {
            setEstado(formulario.estado)
        }
        // // SETEAMOS EL ESTADO DEL SOLICITANTE
        if (datos_personales) {
            handleChangeEstadoCivil(datos_personales.est_civil)
            handleChangeTieneVehiculo(datos_personales.tiene_vehiculo)
        }

        if (formacion_varios) {
            handleChangeCertificaciones(formacion_varios.tiene_certificaciones);
            handleChangeIdiomas(formacion_varios.tiene_idiomas);
            handleChangeTieneSuperior(formacion_varios.tiene_superior);
        }

        if (referencia_financiera) {
            handleChangeRefenciaBancaria(referencia_financiera.tiene_referencias);
            handleChangeRefenciaComercial(referencia_financiera.tiene_refe_comercial);
        }
        // CARGAMOS LOS DOCUMENTOS
        getDocumentosCargados(hash)
    }

    const setDocumentoEmpleado = (valor) => {
        if (valor == "02") {
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
        setDocumentoEmpleado(valor);
        dispatch(
            setEmpleado({ ...empleado, tieneConyugue: _tieneConyugue(valor) })
        );

        habilitaSeccionConyugue(valor)
    };

    const habilitaSeccionConyugue = (valor) => {
        setInfoCasado(false)
        if (valor == '02' || valor == '04') {
            setInfoCasado(true)
        }
    }

    const handleChangeTieneVehiculo = (valor) => {
        setInfoVehiculo(false)
        if (valor == 'S') {
            setInfoVehiculo(true)
        }
    };

    const handleChangeTieneSuperior = (valor) => {
        setinfoSuperior(false)
        if (valor == 'S') {
            setinfoSuperior(true)
        }
    }

    const handleChangeRefenciaBancaria = (valor) => {
        setTieneReferenciaBancaria(false)
        if (valor == 'S') {
            setTieneReferenciaBancaria(true)
        }
    }

    const handleChangeRefenciaComercial = (valor) => {
        setTieneReferenciaComercial(false)
        if (valor == 'S') {
            setTieneReferenciaComercial(true)
        }
    }

    const handleChangeFormacion = (prop) => (event) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        if (prop == "certificaciones") {
            handleChangeCertificaciones(event.target.value);
        }
        if (prop == "idiomas") {
            handleChangeIdiomas(event.target.value);
        }
        if (prop == "CursoSuperior") {
            handleChangeTieneSuperior(event.target.value);
        }
        if (prop == "referenciaBancaria") {
            handleChangeRefenciaBancaria(event.target.value);
        }
        if (prop == "referenciaComercial") {
            handleChangeRefenciaComercial(event.target.value);
        }
    };

    const handleChangeCertificaciones = (valor) => {
        setInfoCertificaciones(false)
        if (valor == 'S') {
            setInfoCertificaciones(true)
        }
    }

    const handleChangeIdiomas = (valor) => {
        setInfoIdiomas(false)
        if (valor == 'S') {
            setInfoIdiomas(true)
        }
    }

    const handleChangeDatosPersonales = (prop) => (event) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        if (prop == "est_civil") {
            handleChangeEstadoCivil(event.target.value);
        }
        if (prop == "vehiculo") {
            handleChangeTieneVehiculo(event.target.value);
        }
    };

    const handleChangeTipIdentificacionEmpleado = (value) => {
        dispatch(
            setEmpleado({ ...empleado, tieneRuc: _tieneRuc(value) })
        );
    }

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
            cedula: {
                cargado: false,
                obligatorio: true
            },
            // cedulaConyugue: {
            //     cargado: false,
            //     obligatorio: documentos.copiaCedulaConyugue ? true : false
            // },
            planillaServicio: {
                cargado: false,
                obligatorio: true
            },
            declaracionPagoImp: {
                cargado: false,
                obligatorio: true
                // obligatorio: esPeeps ? true : false
            },
            nombramientoCargo: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },declaracionPagoImpPep: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },certIngresoMensual: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            declaracionPep: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            }
        };
        // 
        return initialDocuemtos;
    }

    const getDocumentosCargados = async (hash) => {
        const initialDocuemtos = setDocumentosObligatorios();
        const { data } = await axiosPrivate.get(`documento-empleado/${hash}`);
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

                const response = await axiosPrivate.post('/documento-empleado/upload', formData, { headers: { "Content-Type": "multipart/form-data" } });

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

    useEffect(() => {
        // loadData()
    }, [])

    return (
        <EmpleadoContext.Provider
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
                    empleado,
                    documentos,
                    setDocumentoEmpleado,
                    setValorAsegurado,
                    handleChangeDatosPersonales,
                    handleChangeTipIdentificacionEmpleado,
                    // ACTIVIDAD
                    handleChangeOtrosIngresos,
                    // REFERENCIAS
                    referencias,
                    incluyeReferencia,
                    handleChangePeeps,
                    handleReferidoCompania,
                    // emiFactSolicitante,
                    // handleChangeTipSolic,
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
                    infoSuperior,
                    setinfoSuperior,
                    disabledOcupacion,
                    setDisabledOcupacion,
                    revisionInterna,
                    setRevisionInterna,
                    infoVehiculo,
                    infoCertificaciones,
                    infoIdiomas,
                    handleChangeFormacion,
                    tieneReferenciaBancaria,
                    setTieneReferenciaBancaria,
                    tieneReferenciaComercial,
                    setTieneReferenciaComercial,
                    ip, 
                    setIp,
                    getDocumentosCargados,
                    setDatosIniciales,
                    validaCambiosFormulario, 
                    tieneCambios
                }),
                [hash, estado, formData, isLoading, documento, infoSuperior, documentos, referencias, incluyeReferencia, disableTipoinfoadicional, completed, activeStep, esPeeps, pagoImpRenta, modalVisible, infoCasado, disabledOcupacion, revisionInterna, infoVehiculo, infoCertificaciones, infoIdiomas, tieneReferenciaBancaria, tieneReferenciaComercial, ip, tieneCambios]
            )}
        >
            {props.children}
        </EmpleadoContext.Provider>
    );
};

export default EmpleadoProvider;
