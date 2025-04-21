import React, { useMemo, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import AuthService from '@services/AuthService'
export const JuridicoContext = createContext()

import { setActiveStepForm, handleNext, setCompleted, setRepresentante, setDocumentos, setPeep, setReferencia, setOtrosIngresosInfo,setIncluyeReferencia } from "@reducers/Cliente/formularioJuridico/actions";
import { _tieneConyugue, validaDocumentos, validarExt, mansajeDocumento } from './Functions'

const NaturalProvider = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [documento, setDocumento] = useState({});
    const [disableProvincia, setDisableProvincia] = useState(false);
    const [countAccionista, setCountAccionista] = useState(0);
    const [accionistas, setAccionistas] = useState([]);
    const [disableTipAseguradoEspecif, setDisableTipAseguradoEspecif] = useState(true);
    const [emiFactSolicitante, setEmiFactSolicitante] = useState(true);
    const [disableTipoinfoadicional, setDisableTipoinfoadicional] = useState(true);
    const [estado, setEstado] = useState("P");
    const [isDisabled,setIsDisabled] = useState([])
    const [revisionInterna, setRevisionInterna] = useState(false);
    const [revisionInternaAsesor, setRevisionInternaAsesor] = useState(false);
    const [nacionalidades, setNacionalidades] = useState([])
    const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);
    // VALORES PARA LOS CAMBIOS DEL FORMULARIO
    const [datosIniciales, setDatosIniciales] = useState({})
    const [tieneCambios, setTieneCambios] = useState(false)

    const { documentos, activeStep, hash, completed, representante, referencias, infFinanciera, esPeeps, pagoImpRenta, steeps,incluyeReferencia } = useSelector((state) => state.formJuridico);

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
                const dataToken = await authToken({ tipo: "cliente", hash: hash });
                const { data } = await axiosPrivate.get(`/formulario/${hash}/juridico`)

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
            setModalVisible(true)
        }
    }

    useEffect(() => {
        // loadData()
        
    }, [])

    const procesaStados = (data) => {
        const { formulario, hash, representante, accionista,solicitante } = data
        // SETEMOS LOS VALORES DEL FORMULARIO
        if (formulario) {
            setEstado(formulario.estado)
        }
        // SETEAMOS EL ESTADO DEL SOLICITANTE
        if (representante) {
            dispatch(
                setRepresentante({
                    tieneConyugue: _tieneConyugue(representante.est_civil),
                })
            );
            handleChangeEstadoCivil(representante.est_civil)
            setActiveProvincia(representante.pais_domicilio)
        }

        if (accionista) {
            handleChangePeeps(accionista.seleccionar_pep)
            handleTipoAsegurado(accionista.Vincul_Rel_Sol)
            handleChangeTipSolic(accionista.solicitante)
            handleTipoInfoAdicional(accionista.seleccionar_info_adicional)
            handleChangeOtrosIngresos(accionista.otro_ingreso)
            handleReferidoCompania(accionista.referido)
        }

        // DOCUMENTOS
        getDocumentosCargados(hash)
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
            num_identificacion_autorizadas: {
                cargado: false,
                obligatorio: true
            },
            
            existencia_legal: {
                cargado: false,
                obligatorio: true
            },
            nombramientoCargo: {
                cargado: false,
                obligatorio: true
            },
            cedula_cony :{
                cargado: false,
                obligatorio: representante.tieneConyugue?true:false
            },
            declaracionPagoImp: {
                cargado: false,
                obligatorio: true
            },
            certIngresoMensual: {
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
                obligatorio: incluyeReferencia ? true : false
            },
            auditoria_externa: {
                cargado: false,
                obligatorio: incluyeReferencia ? true : false
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

    const setDocumentoSolicitantte = (valor) => {
        if (valor == "02") {
            dispatch(setDocumentos({ ...documentos, copiaCedulaConyugue: true }));
        } else {
            dispatch(setDocumentos({ ...documentos, copiaCedulaConyugue: false }));
        }
    }

    const handleSetActiveStepForm = () => {
        dispatch(setActiveStepForm(activeStep + 1));
    }

    const handleSetNext = () => {
        dispatch(handleNext())
    }

    const handleChangeEstadoCivil = (valor) => {
        setDocumentoSolicitantte(valor);
        dispatch(
            setRepresentante({ ...representante, tieneConyugue: _tieneConyugue(valor) })
        );
    };

    const handleChangeSolicitante = (prop) => (e) => {
        if (prop == "est_civil") {
            handleChangeEstadoCivil(e.target.value);
        }
    };

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

    const handleSetCompleted = () => {
        completed[activeStep] = true;
        dispatch(setCompleted(completed));
    }

    // ACCIONISTAS DATOS
    const getAccionistas = async () => {
        const { data } = await axiosPrivate.get(
            `cliente-juridico/accionista/${hash}`
        );

        if (data) {
            setCountAccionista(data.length)
        }
        setAccionistas(data)
    }

    const handleChangePeeps = (valor) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setPeep(false));
        if (valor == "S") {
            dispatch(setPeep(true));
        }
    };

    const handleTipoAsegurado = (valor) => {
        if (valor == "O") {
            setDisableTipAseguradoEspecif(false);
        } else {
            setDisableTipAseguradoEspecif(true);
        }
    };

    const handleChangeTipSolic = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        setEmiFactSolicitante(true);
        if (value == "O") {
            setEmiFactSolicitante(false);
        }
    };

    const handleReferidoCompania = (valor) => {
        dispatch(setReferencia({ ...referencias, esReferido: true }))
        if (valor == "S") {
            dispatch(setReferencia({ ...referencias, esReferido: false }))
        }
    };

    const handleTipoInfoAdicional = (valor) => {
        if (valor == "O") {
            setDisableTipoinfoadicional(false);
        } else {
            setDisableTipoinfoadicional(true);
        }
    };

    const handleChangeOtrosIngresos = (value) => {
        // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
        dispatch(setOtrosIngresosInfo(true));
        // setDetalleIngresoMensual(true);
        if (value == "S") {
            dispatch(setOtrosIngresosInfo(false));
            // setDetalleIngresoMensual(false);
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

    //:: valida el valor de de la suma asegurada
    const setValorAsegurado = (valor) => {
        
        dispatch(setIncluyeReferencia(false));
        if (valor > 200000) {
            dispatch(setIncluyeReferencia(true));
        }

    }


    const loadNacionalidades = async() =>{
       
        const token = AuthService.getToken();
        const { data } = await axiosPrivate.get(
            `http://${process.env.HOST_API}:${process.env.PORT_API}/nacionalidad`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setNacionalidades(data)
    }

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
                    // SOLICITANTE
                    activeStep,
                    completed,
                    handleSetActiveStepForm,
                    handleSetNext,
                    handleSetCompleted,
                    // REPRESENTANTE
                    representante,
                    disableProvincia,
                    handleChangeSolicitante,
                    handleChangePais,
                    // ACCIONISTAS
                    countAccionista,
                    accionistas,
                    getAccionistas,
                    handleChangePeeps,
                    disableTipAseguradoEspecif,
                    handleTipoAsegurado,
                    handleChangeTipSolic,
                    emiFactSolicitante,
                    referencias,
                    handleReferidoCompania,
                    disableTipoinfoadicional,
                    handleTipoInfoAdicional,
                    handleChangeOtrosIngresos,
                    infFinanciera,
                    // DOCUMENTO
                    documento,
                    esPeeps,
                    pagoImpRenta,
                    handleValidaDocumentos,
                    handleChangeUpload,
                    setEstado,
                    isComplete,
                    getDocumentosCargados,
                    handleDependInput,
                    getDisableByName,
                    setValorAsegurado,
                    incluyeReferencia,
                    setRevisionInternaAsesor,
                    revisionInternaAsesor,
                    setRevisionInterna,
                    revisionInterna,
                    nacionalidades,
                    loadNacionalidades,
                    setNacionalidades,
                    setDatosIniciales,
                    validaCambiosFormulario, 
                    tieneCambios,
                    catalogoActividadEco, 
                    setCatalogoActividadEco
                }),
                [hash, estado, representante, formData, isLoading, documento, documentos, completed, activeStep, disableProvincia, accionistas, disableTipAseguradoEspecif, emiFactSolicitante, referencias, disableTipoinfoadicional, infFinanciera, esPeeps, pagoImpRenta, modalVisible,isDisabled,incluyeReferencia,revisionInternaAsesor,revisionInterna,nacionalidades, tieneCambios, catalogoActividadEco]
            )}
        >
            {props.children}
        </JuridicoContext.Provider>
    );
};

export default NaturalProvider;
