import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Juridico/PasoTres";
import FormHelperText from "@mui/material/FormHelperText";
// SECTIONS
import Accionistas from "@views/Form/Cliente/Juridico/Accionistas";
import EmisionFactura from "@views/Form/Cliente/Juridico/EmisionFactura";
import InfoAdicional from "@views/Form/Cliente/Juridico/InfoAdicional";
import Asegurado from "@views/Form/Cliente/Juridico/Asegurado";
import PersonaExpuestaPoliticamente from "@views/Form/Cliente/Juridico/PersonaExpuestaPoliticamente"
import CanalVinculacion from "@views/Form/Cliente/Juridico/CanalVinculacion";
import SituacionFinanciera from "@views/Form/Cliente/Juridico/SituacionFinanciera";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
import Referencias from "@views/Form/Cliente/Juridico/Referencias";
import FormaPago from "@views/Form/Cliente/Juridico/FormaPago";
// BOTONES
import ActionsButtons from "@views/pages/Cliente/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// ALERTAS
import swal from "sweetalert";

const index = () => {
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, hash, setFormData, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(JuridicoContext)
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch, formState: { errors } } = methods;

  useEffect(() => {
    if (formData) {
      const { accionista } = formData
      if (accionista) {
        cargarDatos(accionista)
        setDatosIniciales(accionista);
      }
    }
    countReferencias();
  }, [formData]);

   // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
   const watchedValues = watch();

  //  useEffect(()=>{
  //    const watchedValues = watch();
  //    setDatosIniciales(watchedValues);
  //  }, [isLoading])
 
   useEffect(() => {
     validaCambiosFormulario(watchedValues);
   }, [watchedValues]);
   // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
   
  const cargarDatos = (data) => {
    if (data) {
      // MARCAMOS EL PASO COMO COMPLETADO
      handleSetCompleted()
      // LLENAMOS TODOS LOS DATOS DEL PASO UNO
      Object.keys(data).map(function (name, index) {
        var value = data[name];
        // if (value !== undefined && value !== null) {
        //   setValue(name, value);
        // }
        if (value === undefined || value === null) {
          value = ''
        }
        setValue(name, value);
      });
    } else {
      clearData()
    }
  }

  const clearData = () => {
    reset();
  }

  const prepareData = (data) => {
    // SI NO TIENE OTROS INGRESOS SETEAMOS EL CAMPO OTROS INGRESOS EN CERO
    if (data.solicitante != "O") {
      data.nombre_razonsocial = "";
      data.tipoid = "";
      data.num_identificacion_emi_factura = "";
      data.telefono = "";
      data.direccion = "";
      data.relacionsolicitante = "";
    }

    if (data.referido != "S") {
      data.nombre_apellido = "";
      data.seleccionar_info_adicional = "";
      data.especifique = "";
    }
    return data
  }

  const countReferencias = async () => {
    const { data } = await axiosPrivate.get(
      `cliente-juridico/referencias/${hash}`
    );

    if (data) {
      setValue('referencias', data.length);
    }
    // SETEAMOS LA VARIABLE PARA VALIDAR SI DEBE O NO CARGAR REFERENCIAS
    //setValue('incluyeReferencia', incluyeReferencia);
  }


  const grabaDatos = async (param) => {
    try {
      param = prepareData(param);
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        const { data } = await axiosPrivate.post(
          `cliente-juridico/accionista/datos/${hash}`,
          param
        );
        //
        if (data) {
          setFormData({ ...formData, accionista: data })

          swal({
            title: "Paso 3/4",
            text: `Registrado con éxito!`,
            icon: "success",
            buttons: {
              aceptar: "Aceptar",
            },
          }).then((value) => {
            if (value) {
              handleSetActiveStepForm()
            }
          });
        }
      } else {
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `cliente-juridico/accionista/datos/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, accionista: data })

          swal({
            title: "Paso 3/4",
            text: `Actualizado con éxito!`,
            icon: "success",
            buttons: {
              cerrar: "Cerrar",
              continuar: {
                text: "Continuar",
                value: "continue",
              },
            },
          }).then((value) => {
            if (value == "continue") {
              handleSetNext();
            }
          });
        }
      }

    } catch (error) {
      swal({
        title: "Formulario Online",
        text: `Error ${error}`,
        icon: "error",
        buttons: {
          cerrar: "Aceptar",
        },
      });
    }
  };

  if (isLoading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>

      <Grid item xs={12}>
        <h3>
          Persona Jurídica B1-normal
        </h3>
      </Grid>

      {/* <Referencias countReferencias={countReferencias} /> */}

        <Accionistas />

        <Grid item xs={12}>
          <FormHelperText error>{errors.Accionistas?.message}</FormHelperText>
        </Grid>

        <Asegurado/>

        <PersonaExpuestaPoliticamente/>

        <EmisionFactura/>

        <InfoAdicional/>

        <CanalVinculacion/>

        <SituacionFinanciera/>

        <FormaPago/>

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
