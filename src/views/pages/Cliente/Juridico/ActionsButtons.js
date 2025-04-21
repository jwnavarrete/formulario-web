import React, { useEffect, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { setActiveStep, handleNext } from "@reducers/Cliente/formularioNatural/actions";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import Loading from '@components/ui/Loading';
import ConsentimientoIp from '@utils/Partials/Concentimiento';
import swal from "sweetalert";
import axios from 'axios'

const Botones = ({ grabaDatos }) => {
  const {tieneCambios, hash, estado, setEstado, formData,revisionInterna,revisionInternaAsesor } = useContext(JuridicoContext)
  const {formulario} = formData
  const axiosPrivate = useAxiosPrivate();
  const [actionName, setActionName] = useState("Guardar");
  const [openModalConcentimiento, setOpenModalConcentimiento] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ip, setIp] = useState('');

  const { steeps, activeStep, completed, firma } = useSelector(
    (state) => state.formJuridico
  );

  async function obtenerIp() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setIp(response.data.ip);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (firma === 'S' && activeStep == steeps.length) {
      setActionName('Guardar / Firmar Formulario')
    } else {
      setActionName('Guardar')
    }
    obtenerIp()
    setValue('revisionInterna', revisionInterna)
    setValue('revisionInternaAsesor', revisionInternaAsesor)
  }, []);

  const grabaFirma = async (data) => {
    // SI ES EL ULIMO PASO Y FIRMAS ESTA ACTIVO SE PRODCE CON LA FIRMA
    if (firma === 'S' && activeStep == steeps.length) {
      // SI NO PASA LA VALIDACION MUESTRA EL MODAL DE ACEPTACION 
      if (!validaFirma()) {
        setOpenModalConcentimiento(true)
      } else {
        setIsLoading(true);
        grabaDatos(data, false)
        // await firmarFormulario(hash)
        await firmarFormularioSoloCliente(hash)
        setIsLoading(false);
      }
    } else {
      grabaDatos(data)
    }
  }

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
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
    );
  }

  const getData = async () => {
    const { formulario, solicitante } = formData
    // const location = window.navigator && window.navigator.geolocation
    var infoDetail = {
      firmante: solicitante.razon_social_empresa,
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: formulario.identificacion,
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_cliente,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: formulario.identificacion,
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip
    }

    return infoDetail


  }

  const firmarFormularioSoloCliente = async () => {
    try {
      // SI NO PASA LA VALIDACION MOSTRAMOS MODAL DE AUTORIZACION
      let datosFirma = await getData()
      const { data } = await axiosPrivate.post(
        `formulario/firma_cliente/${hash}`,
        datosFirma,
      )
      //
      if (data) {
        const { correo_cliente, estado, firma } = data
        // SI YA TIENE DATOS DE LA FIRMA ENVIAMOS A PROCESAR LOS DATOS
        if (firma) {
          
          await procesaDatos()
          setEstado(estado)
        }
        //
        swal({
          title: 'Formulario Firmado',
          text: `Se procedió a enviar el formulario firmado al correo: ${correo_cliente}`,
          icon: 'success',
          buttons: {
            aceptar: 'Aceptar',
          },
        })
      }
    } catch (error) {
      mensajeError(error)
    }
  }

  const firmarFormulario = async () => {
   
    if(formulario.correo_agente){

      let datosFirma = await getData()
      const { data } = await axiosPrivate.post(
        `formulario/firma_cliente/${hash}`, datosFirma
      );
  
      if (data) {
        const { correo_agente,correo_cliente, estado, firma } = data
  
        // SI YA TIENE DATOS DE LA FIRMA ENVIAMOS A PROCESAR LOS DATOS
        if (firma) {
          await procesaDatos()
          setEstado(estado)
        }
  
        swal({
          title: "Formulario Firmado",
          //text: `Se procedió a enviar el formulario firmado al correo: ${correo_cliente}`,
          text: `Se procedió a enviar el formulario a revisión, donde será atendido por el asesor/broker: ${correo_agente}`,
          icon: "success",
          buttons: {
            aceptar: "Aceptar",
          },
        }).then((value) => {
        });

      }
    }else{
      await firmarEjecutivoSinAsesor();
    }
    
  }

  const procesaDatos = async () => {
    const { data } = await axiosPrivate.post(`formulario/procesa-datos/${hash}`)
    console.log("data", data)
    if (data) {
      try {
        await axiosPrivate.post(`formulario/replica-cliente/${data.cliente}`)
      } catch (error) {
        console.log("error:",error)
      }
    }
  }


  const getBrowserInfo = () => {
    var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  };

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext(); // retrieve all hook methods

  const dispatch = useDispatch();

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const getCurrentSteep = () => {
    return completedSteps() === steeps.length ? activeStep - 1 : activeStep
  }

  const handleContinue = () => {
    dispatch(handleNext());
  };

  const handleBack = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  const validaFirma = () => {
    if ((firma === 'S') && activeStep == steeps.length) {
      return (!ip ? false : true)
    }
    return true
  }

  const aprobarFirmaAsesor = async (param) => {
    try {
      if (validaFirma()) {
        setIsLoading(true);
        const { data } = await axiosPrivate.post(
          `formulario/graba-asesor/${hash}`, param
        );
        
        await firmarAsesor()
      } else {
        setOpenModalConcentimiento(true)
      }
    } catch (error) {
    
      mensajeError(error)
    } finally {
      setIsLoading(false);
    }
  }

  const firmarAsesor = async () => {
    let datosFirma = await getDataAsesor()
    // 
    const { data } = await axiosPrivate.post(
      `formulario/firma-asesor/${hash}`, datosFirma
    );

    if (data) {
      const { correo_cliente, correo_ejecutivo, estado, firma_ejecutivo } = data

      if (estado == 'T') {
        //await procesaDatos()
      }

      swal({
        title: "Formulario Aceptado",
        text: `Se procedió a enviar el formulario al ejecutivo para su revisión interna: ${correo_ejecutivo}`,
        icon: "success",
        buttons: {
          aceptar: "Aceptar",
        },
      }).then((value) => {
        if (value) {
          setEstado(estado)
        }
      });
    }
  }

  const aprobarFirmaEjecutivo = async (param) => {

    try {
      if (validaFirma()) {
        setIsLoading(true);
        const { data } = await axiosPrivate.post(
          `formulario/graba-ejecutivo/${hash}`, param
        );
        
        await firmarEjecutivo(hash);
        
      } else {
        setOpenModalConcentimiento(true)
      }
    } catch (error) {
    
      mensajeError(error)
    } finally {
      setIsLoading(false);
    }
  }

  const mensajeError = (mensaje) => {
    swal({
      title: "Formulario Vinculacion",
      text: mensaje,
      icon: "error",
      buttons: {
        aceptar: "Aceptar",
      },
    });
  }

  const firmarEjecutivo = async (hash) => {

    let datosFirma = await getDataEjecutivo()
    // 
    const { data } = await axiosPrivate.post(
      `formulario/firma-ejecutivo/${hash}`, datosFirma
    );
    //await procesaDatos()
    if (data) {
      const { correo_cliente, correo_ejecutivo, correo_agente } = data
      const mensaje = `\nCorreo cliente: ${correo_cliente}, \nCorreo agente: ${correo_agente}, \nCorreo ejecutivo: ${correo_ejecutivo}`;
      await procesaDatos()
      swal({
        title: "Formulario Aceptado",
        text: `El proceso ha finalizado con éxito. ${mensaje}`,
        icon: "success",
        buttons: {
          aceptar: "Aceptar",
        },
      }).then((value) => {
        if (value) {
          setEstado('F')
        }
      });

    }
  }

  const firmarEjecutivoSinAsesor = async()=>{
    let datosFirma = await getData()
    // 
    const { data } = await axiosPrivate.post(
      `formulario/firma_cliente_ejecutivo/${hash}`, datosFirma
    );

    if (data) {
      const { correo_cliente, correo_ejecutivo, estado, firma_ejecutivo } = data
      //await procesaDatos()
      swal({
        title: "Formulario Aceptado",
        text: `Se procedió a enviar el formulario al ejecutivo para su revisión interna: ${correo_ejecutivo}`,
        icon: "success",
        buttons: {
          aceptar: "Aceptar",
        },
      }).then((value) => {
        if (value) {
          setEstado('F')
        }
      });

    }
  }

  const getDataAsesor = async () => {
    const { formulario } = formData

    var infoDetail = {
      firmante: getValues('nombre_asesor'),
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: getValues('identificacion_asesor'),
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_agente,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: getValues('identificacion_asesor'),
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip
    }

    return infoDetail;
  }

  const getDataEjecutivo = async () => {
    const { formulario } = formData

    var infoDetail = {
      firmante: getValues('nombre_ejecutivo'),
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: 'NA',//getValues('lugar_ejecutivo'),
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_ejecutivo,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: 'NA',
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip
    }

    return infoDetail;
  }


  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <ConsentimientoIp openModal={openModalConcentimiento} setOpenModalConcentimiento={setOpenModalConcentimiento} setIp={setIp} ip={ip} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          ml: 2,
          pt: 2,
        }}
      >
        <Button
          disabled={getCurrentSteep() === 0}
          onClick={handleBack}
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
          disabled={!completed[activeStep] || tieneCambios} // Si completed[activeStep] es true O tieneCambios es true, el botón se desactivará

        >
          Siguiente
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {estado == 'P' &&
          <>
            <Button
              onClick={handleSubmit(grabaFirma)}
              variant="contained"
              color="primary"
            >
              {actionName}
            </Button>
          </>
        }
        {
          (estado == 'A' && revisionInternaAsesor) && 
            <Button
              onClick={handleSubmit(aprobarFirmaAsesor)}
              variant="contained"
              color="primary"
              disabled={completed[activeStep] ? true : false}
            >
              Aprobar Formulario
            </Button>
        }
        {((estado == 'A') && revisionInterna || estado == 'E' && revisionInterna) &&
          <Button
            onClick={handleSubmit(aprobarFirmaEjecutivo)}
            variant="contained"
            color="primary"
            disabled={completed[activeStep] ? true : false}
          >
            Aprobar Formulario
          </Button>
        }
      </Box>
    </>
  );
};

export default Botones;
