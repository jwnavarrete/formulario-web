import React, { useMemo, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import AuthService from '@services/AuthService'
import swal from "sweetalert"
export const NaturalContext = createContext()

import {
    setSolicitante, setPagoImpRentas, setIncluyeReferencia, setDocumentos, setOtrosIngresosInfo, setPeep, setReferencia, handleNext, setCompleted, setActiveStepForm
} from "@reducers/Cliente/formularioNatural/actions";

import { _tieneConyugue, _esAsegurado, _esBeneficiario, validaDocumentos, validarExt, mansajeDocumento } from './Functions'
import { element } from "prop-types";

const NaturalProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [emiFactSolicitante, setEmiFactSolicitante] = useState(true);
    const [disableTipoinfoadicional, setDisableTipoinfoadicional] = useState(true);
    const [documento, setDocumento] = useState({});
    const [estado, setEstado] = useState("P");
    const [isDisabled,setIsDisabled] = useState([])
    const [revisionInterna, setRevisionInterna] = useState(false);
    const [revisionInternaAsesor, setRevisionInternaAsesor] = useState(false);
    // VALORES PARA LOS CAMBIOS DEL FORMULARIO
    const [datosIniciales, setDatosIniciales] = useState({})
    const [tieneCambios, setTieneCambios] = useState(false)


    const { solicitante, documentos, referencias, hash, completed, activeStep, incluyeReferencia, esPeeps, pagoImpRenta, steeps } = useSelector((state) => state.formNatural);

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

        if (revisionInterna || revisionInternaAsesor){
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
    
    const loadData = async (hash) => {
        try {

            if (hash) {
                AuthService.authTokenForm({ tipo: "cliente", hash: hash });
                const { data } = await axiosPrivate.get(`/formulario/${hash}/natural`)
                
                setLoading(false)
                
                if (data) {
                    // PROCESAMOS LOS ESTADOS DE TODOS LOS PASOS
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
            swal({
                title: 'Error',
                text: `${mensaje}`,
                icon: `${icon}`,
                button: 'Aceptar',
            });
        }
    }

    const procesaStados = (data) => {
        const { formulario, solicitante, actividad, ref_factura, hash } = data
        // SETEMOS LOS VALORES DEL FORMULARIO
        if (formulario) {
            setEstado(formulario.estado)
        }
        // SETEAMOS EL ESTADO DEL SOLICITANTE
        if (solicitante) {
            dispatch(
                setSolicitante({
                    tieneConyugue: _tieneConyugue(solicitante.est_civil),
                    esAsegurado: _esAsegurado(solicitante.select_asegurado),
                    esBeneficiario: _esBeneficiario(solicitante.select_beneficiario),
                })
            );
            setDocumentoSolicitante(solicitante.est_civil);
            setValorAsegurado(solicitante.val_asegurado);
        }

        // ACTIVIDAD
        if (actividad) {
            handleChangeOtrosIngresos(actividad.otro_ingreso);
        }

        if (ref_factura) {
            // SETEAMOS EL ESTADO DEL SOLICITANTE
            handleChangeTipSolic(ref_factura.solicitante);
            // SETEAMOS EL ESTADO DEL SOLICITANTE=
            handleReferidoCompania(ref_factura.referido);
            handleChangePeeps(ref_factura.seleccionar_pep);
            // 
            handleTipoAsegurado(ref_factura.seleccionar);
        }

        // CARGAMOS LOS DOCUMENTOS
        getDocumentosCargados(hash)

    }

    const setDocumentoSolicitante = (valor) => {
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
        setDocumentoSolicitante(valor);
        dispatch(
            setSolicitante({ ...solicitante, tieneConyugue: _tieneConyugue(valor) })
        );
    };

    const handleChangeAsegurado = (valor) => {
        return dispatch(
            setSolicitante({ ...solicitante, esAsegurado: _esAsegurado(valor) })
        );
    };

    const handleChangeBeneficiario = (valor) => {
        dispatch(
            setSolicitante({ ...solicitante, esBeneficiario: _esBeneficiario(valor) })
        );
    };

    const handleChangeSolicitante = (prop) => (event) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        if (prop == "esasegurado") {
            handleChangeAsegurado(event.target.value);
        }

        if (prop == "esbeneficiario") {
            handleChangeBeneficiario(event.target.value);
        }

        if (prop == "est_civil") {
            handleChangeEstadoCivil(event.target.value);
        }
    };

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

    const handleChangeTipSolic = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        setEmiFactSolicitante(true);
        if (value == "O") {
            setEmiFactSolicitante(false);
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
            cedulaConyugue: {
                cargado: false,
                obligatorio: documentos.copiaCedulaConyugue ? true : false
            },
            planillaServicio: {
                cargado: false,
                obligatorio: true
            },
            nombramientoCargo: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            declaracionPagoImp: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            certIngresoMensual: {
                cargado: false,
                obligatorio: esPeeps ? true : false
            },
            pagoImpRenta: {
                cargado: false,
                obligatorio: pagoImpRenta ? true : false
            },
        };
        // 
        return initialDocuemtos;
    }

    const getDocumentosCargados = async (hash) => {
        const initialDocuemtos = setDocumentosObligatorios();
        const { data } = await axiosPrivate.get(`file/${hash}`);
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

                const response = await axiosPrivate.post('/file/upload', formData, { headers: { "Content-Type": "multipart/form-data" } });

                if (response) {
                    mansajeDocumento('success', `archivo cargado con éxito!`);
                }
                setDocumento({ ...documento, [name]: { ...documento[name], cargado: true } });
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
        return validaDocumentos(documento)
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

    useEffect(() => {
        // loadData()
    }, [])

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
                    // solicitante
                    solicitante,
                    documentos,
                    setDocumentoSolicitante,
                    setValorAsegurado,
                    handleChangeSolicitante,
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
                    handleDependInput,
                    getDisableByName,
                    setRevisionInternaAsesor,
                    revisionInternaAsesor,
                    setRevisionInterna,
                    revisionInterna,
                    setDatosIniciales,
                    validaCambiosFormulario, 
                    tieneCambios
                }),
                [hash, estado, formData, isLoading, solicitante, documento, documentos, emiFactSolicitante, referencias, incluyeReferencia, disableTipoinfoadicional, completed, activeStep, esPeeps, pagoImpRenta, modalVisible,isDisabled,revisionInterna,revisionInternaAsesor, tieneCambios]
            )}
        >
            {props.children}
        </NaturalContext.Provider>
    );
};

export default NaturalProvider;
