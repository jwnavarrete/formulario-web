import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { setActiveStep, handleNext } from "@reducers/Empleado/actions";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import Loading from '@components/ui/Loading';
import ConsentimientoIp from '@utils/Partials/Concentimiento';
import axios from 'axios'
import swal from "sweetalert";

const Botones = ({ grabaDatos }) => {
  const { tieneCambios, hash, estado, setEstado, formData, revisionInterna, grabaDatosFirma } = useContext(EmpleadoContext)
  const axiosPrivate = useAxiosPrivate();
  const [actionName, setActionName] = useState("Guardar");
  const [isLoading, setIsLoading] = useState(false);
  const [openModalConcentimiento, setOpenModalConcentimiento] = useState(false);
  const [ip, setIp] = useState('');

  const { steeps, activeStep, completed, firma, aprobacion } = useSelector(
    (state) => state.formNatural
  );

  useEffect(() => {
    if (firma === 'S' && activeStep == steeps.length) {
      setActionName('Guardar / Firmar Formulario')
    } else {
      setActionName('Guardar')
    }
    // 
    setValue('revisionInterna', revisionInterna)

    obtenerIp()
  }, []);

  async function obtenerIp() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setIp(response.data.ip);
    } catch (error) {
      console.error(error);
    }
  }

  const grabaFirma = async (data) => {
    try {
      // 
      if (validaFirma()) {
        setIsLoading(true);
        await grabaDatos(data)
        // SI ES EL ULIMO PASO Y FIRMAS ESTA ACTIVO SE PRODCE CON LA FIRMA
        if (firma === 'S' && activeStep == steeps.length) {
          firmarFormulario()
        }
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

  const validaFirma = () => {
    if ((firma === 'S' || revisionInterna) && activeStep == steeps.length) {
      return (!ip ? false : true)
    }
    return true
  }

  const aprobarFirma = async (param) => {
    try {

      if (validaFirma()) {
        setIsLoading(true);

        const { data } = await axiosPrivate.post(
          `formulario-empleado/graba-ejecutivo/${hash}`, param
        );

        await firmarEjecutivo()
      } else {
        setOpenModalConcentimiento(true)
      }

    } catch (error) {
      mensajeError(error)
    } finally {
      setIsLoading(false);
    }
  }

  const firmarEjecutivo = async () => {

    let datosFirma = await getDataEjecutivo()
    // 
    const { data } = await axiosPrivate.post(
      `formulario-empleado/firma-ejecutivo/${hash}`, datosFirma
    );

    if (data) {
      const { correo_empleado, correo_ejecutivo, estado } = data

      swal({
        title: "Formulario Firmado",
        text: `Se procedió a enviar el formulario firmado al correo: ${correo_empleado} \n Correo ejecutivo: ${correo_ejecutivo}`,
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

  const getDataEmpleado = async () => {
    const { formulario, datos_personales } = formData

    var infoDetail = {
      firmante: datos_personales.apellidos + ' ' + datos_personales.nombres,
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: formulario.identificacion,
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_empleado,
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


  const getDataEjecutivo = async () => {
    const { formulario } = formData

    var infoDetail = {
      firmante: getValues('nombre_ejecutivo'),
      declaracion_voluntad: 'ACEPTAR',
      identificacion_legal: getValues('identificacion_ejecutivo'),
      fecha_firma: formatDate(new Date()),
      direccion_notificacion: formulario.correo_ejecutivo,
      metodo_firma: 'WebClick',
      descripcion_autor: 'Firmante',
      identificacion_autor: getValues('identificacion_ejecutivo'),
      sistema_operativo: navigator.platform,
      id_navegador: getBrowserInfo(),
      idioma_navegador: navigator.language,
      navegador_ua: window.navigator.appVersion,
      direccion_ip: ip
    }

    return infoDetail
  }

  const firmarFormulario = async () => {
    let datosFirma = await getDataEmpleado()

    const { data } = await axiosPrivate.post(
      `formulario-empleado/firma-empleado/${hash}`, datosFirma
    );

    if (data) {
      const { correo_ejecutivo, estado,firma } = data

      if (firma) {
        await procesaDatos()
      }

      swal({
        title: "Formulario Firmado",
        text: `Se procedió a enviar el formulario a revisión, donde será atendido por un ejecutivo: ${correo_ejecutivo}`,
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
  const procesaDatos = async () => {
    const { data } = await axiosPrivate.post(
      `formulario-empleado/procesa-datos/${hash}`
    );
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
    reset,
    setValue,
    getValues,
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
          // onClick={handleContinue}
          onClick={handleSubmit(handleContinue)}

          sx={{ mr: 1 }}
          variant="contained"
          color="secondary"
          // disabled={completed[activeStep] ? false : true}
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

        {(estado == 'A' && revisionInterna) && <Button
          onClick={handleSubmit(aprobarFirma)}
          variant="contained"
          color="primary"
          disabled={completed[activeStep] ? true : false}
        >
          Aprobar / Firmar Formulario
        </Button>}
      </Box>

    </>
  );
};

export default Botones;
