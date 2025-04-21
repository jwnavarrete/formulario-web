import React, { useMemo, createContext, useState, useEffect } from "react"
import swal from "sweetalert"

export const ClienteAPPContext = createContext()

const arrTipPersona = [
  { value: 'N', label: 'Natural' },
  { value: 'J', label: 'Jurídico' }
];

// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate"
const ClienteProvider = (props) => {
  const axiosPrivate = useAxiosPrivate()
  const [estadoValue, setEstadoValue] = useState('');
  const [tipPersonaValue, setTipPersonaValue] = useState('');
  const [tipoValue, setTipoValue] = useState('');
  const [buscarValue, setBuscarValue] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  // LOGS DE ACTIVIDADES
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultAction, setSearchResultAction] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAction, setOpenModalAction] = useState(false);
  const [emailResent, setEmailResent] = useState({ hash: "", email: "" });
  // CLIENTES PEP
  

  const handleEmailChange = (hash, correo, tipo) => {
    setEmailResent({ hash, correo, tipo })
  }

  const handleInputChange = (setStateFunction) => (event) => {
    setStateFunction(event.target.value);
  }
  const handleInputTipPersona = handleInputChange(setTipPersonaValue);
  const handleInputEstado = handleInputChange(setEstadoValue);
  const handleInputTipo = handleInputChange(setTipoValue);
  const handleInputBusqueda = handleInputChange(setBuscarValue);

  const handleStateModal = (estado) => {
    setOpenModal(estado);
    if (!estado) {
      setSearchResult([]);
    }
  }

  const handleStateModalAction = (estado) => {
    setOpenModalAction(estado);
    if (!estado) {
      setSearchResult([]);
    }
  }

  const handleBuscarClick = async () => {
    setLoadingForm(true);

    const searchParams = {
      estado: estadoValue === "x" ? "" : estadoValue,
      tip_persona: tipPersonaValue,
      tip_busqueda: tipoValue === "x" ? "" : tipoValue,
      busqueda: buscarValue
    };

    await handleSearch(searchParams);
    setLoadingForm(false);
  };

  const handleResetClick = () => {
    setEstadoValue('');
    setTipPersonaValue('');
    setTipoValue('');
    setBuscarValue('');
    setRows([]);
    setOpenModal(false);
    setSearchResult([])
  };

  useEffect(() => {
  }, [])

  const handleSearch = async (param) => {
    try {
      const { data } = await axiosPrivate.post('/admin-cliente/view/', param);
      setRows(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRowClick = (hash) => {
    handleStateModal(true)
    const Hash = {
      hash: hash,
    };
    handleSearchLogs(Hash)
  }

  const handleClickAction = (hash) => {
    handleStateModalAction(true)
    setSearchResultAction(hash)
    const Hash = {
      hash: hash,
    };
    handleSearchLogs(Hash)
  }

  const handleSearchClientesPeps = async (param) => {
    setLoading(true);
    if (param) {
      const { data } = await axiosPrivate.post('admin-cliente/view-peps', param);
      if (data) {
        setRows(data)
      }
    }
    setLoading(false);
  }

  const searchClientesPeps = async (param) => {
    setLoading(true);
    if (param) {
      const { data } = await axiosPrivate.post('admin-cliente/view-peps', {
        'fecdesde':param.inicio,
        'fechasta':param.fin
      });
      if (data) {
        setRows(data)
      }
    }
    setLoading(false);
  }

  const handleDownloadPeps = async (param) =>{
   
  
    const response = await axiosPrivate.post(`/admin-cliente/download-peps`,{
      'fecdesde':param.inicio,
      'fechasta':param.fin
    }, {
        responseType: 'blob', cache: {
          readHeaders: false,
        }
      });
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `${param.name}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
  }

  const handleSearchLogs = async (param) => {
    setLoading(true);
    if (param) {
      const { data } = await axiosPrivate.post('/admin-cliente/logs/', param);
      if (data) {
        setSearchResult(data)
      }
    }
    setLoading(false);
  }

  const HandleEnviarAction = async (url, hash, mensaje) => {
    if (hash) {
      setModalLoading(true)

      const { data } = await axiosPrivate.post(url, { hash });

      setModalLoading(false)

      if (data) {
        swal({
          title: "Formulario Online",
          text: mensaje,
          icon: "info",
          buttons: {
            continuar: {
              text: "Aceptar",
              value: "continue",
            },
          },
        }).then((value) => {
          if (value == "continue") {
            handleBuscarClick()
          }
        });
      }
      return data;
    }
  };

  const handleReprocesaHash = async (hash) => {
    const { data } = await axiosPrivate.post(`/formulario/${hash}/reproceso-hash`)
    return data.hash
  }

  const handleClickEnvioCorreo = async ({ hash, correo }) => {
    const url = `/admin-cliente/reenvio-correo-formulario/${hash}`;
    if (hash) {
      const { data } = await axiosPrivate.patch(url, { correo: correo });

      if (data) {
        await handleBuscarClick()
      }
      return data;
    }
  };

  const handleClickProcesaDatos = async (hash) => {
    const url = `/admin-cliente/procesa-datos/${hash}`;
    const mensaje = "Se procesan los datos del Formulario de Vinculación";
    return HandleEnviarAction(url, hash, mensaje);
  };

  const handleClickReenvioCorreoAceptacion = async ({ hash, correo }) => {
    const url = `/admin-cliente/reenvio-correo-aceptacion/${hash}`;
    if (hash) {
      const { data } = await axiosPrivate.patch(url, { correo: correo });

      if (data) {
        await handleBuscarClick()
      }
      return data;
    }
  };

  const handleClickReenvioCorreoFirmado = async ({ hash, correo }) => {
    const url = `/admin-cliente/reenvio-correo-firmado/${hash}`;
    if (hash) {
      const { data } = await axiosPrivate.patch(url, { correo: correo });

      if (data) {
        await handleBuscarClick()
      }
      return data;
    }
  };


  const handleClickMenuOption = async (index, hash, correo) => {
    switch (index) {
      // Reenviar enlace del Formulario
      case 0:
        handleEmailChange(hash, correo, 'reenvio-enlace')
        handleStateModalAction(true)
        break;
      // Reenviar correo de aceptación
      case 1:
        handleEmailChange(hash, correo, 'reenvio-aceptacion')
        handleStateModalAction(true)
        break;
      // Reenviar correo formulario firmado
      case 2:
        handleEmailChange(hash, correo, 'reenvio-firmado')
        handleStateModalAction(true)
        break;
      // Reprocesar Datos
      case 3:
        await handleClickProcesaDatos(hash)
        break;
      default:
        break;
    }
  }

  const disableReproceso = (index, steep, estado) => {
    // Reenviar enlace del Formulario
    if (index === 0) {
      return !(estado === 'P')
    }
    // Reenviar correo de aceptación
    if (index === 1) {
      return !(estado === 'P' && steep === "4")
    }
    // Reenviar correo formulario firmado
    if (index === 2) {
      return !(estado === 'T' && steep === "4")
    }
    // Reprocesar Datos
    if (index === 3) {
      return !(estado === 'T' && steep === "4")
    }
    return false
  }


  return (
    <ClienteAPPContext.Provider
      value={useMemo(
        () => ({
          handleInputTipPersona,
          handleInputEstado,
          handleInputTipo,
          handleInputBusqueda,
          handleBuscarClick,
          handleResetClick,
          setEstadoValue,
          setTipPersonaValue,
          setTipoValue,
          setBuscarValue,
          rows,
          handleStateModal,
          openModal,
          handleRowClick,
          searchResult,
          loading,
          handleClickAction,
          openModalAction,
          handleStateModalAction,
          searchResultAction,
          handleClickEnvioCorreo,
          handleClickProcesaDatos,
          handleClickReenvioCorreoAceptacion,
          handleClickReenvioCorreoFirmado,
          loadingForm,
          emailResent,
          handleEmailChange,
          handleClickMenuOption,
          disableReproceso,
          arrTipPersona,
          modalLoading,
          setModalLoading,
          handleReprocesaHash,
          handleSearchClientesPeps,
          handleDownloadPeps,
          searchClientesPeps
        }),
        [estadoValue, tipPersonaValue, tipoValue, buscarValue, rows, openModal, searchResult, loading, openModalAction, searchResultAction, loadingForm, emailResent, modalLoading]
      )}
    >
      {props.children}
    </ClienteAPPContext.Provider>
  )
}

export default ClienteProvider