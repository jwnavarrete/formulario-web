import React, { useState, useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Empleado/PasoUno";
import DatosPersonales from "@views/Form/Empleado/DatosPersonales";
import Conyugue from "@views/Form/Empleado/Conyugue";
import Vehiculo from "@views/Form/Empleado/Vehiculo";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import ActionsButtons from "@views/pages/Empleado/Formulario/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
//ALERT
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";
//
const index = () => {
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, infoCasado, infoVehiculo, hash, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(EmpleadoContext)

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch} = methods

  useEffect(() => {
    if (formData) {
      const { datos_personales } = formData
      cargarDatos(datos_personales)
      setInitialData();
      setDatosIniciales(datos_personales);
    }
  }, [formData]);

  

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const axiosPrivate = useAxiosPrivate();
  //

  const setInitialData = () => {
    const { formulario } = formData
    if (formulario) {
        setValue("tipo_identificacion", formulario.tip_identificacion);
        setValue("num_identificacion", formulario.identificacion);
        setValue("email", formulario.correo_empleado);
        setValue("email_recibir", formulario.correo_empleado);
    }
}

  const clearData = () => {
    //reset();
  }

  const grabaDatos = async (param) => {
    try {
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento);
      }      
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `empleado/datos-personales/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, datos_personales: data })

          swal({
            title: "Formulario Online",
            text: `Registrado con éxito!`,
            icon: "success",
            buttons: {
              aceptar: "Aceptar",
            },
          }).then((value) => {
            if (value) {
              // SETEAMOS EL NUMERO DE hash QUE ESTAMOS PROCESANDO
              handleSetActiveStepForm()
            }
          });
        }
      } else {
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `empleado/datos-personales/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, datos_personales: data })

          swal({
            title: "Formulario Online",
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
              handleSetNext()
            }
          });
        }
      }
      //
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

  const cargarDatos = (data) => {
    if (data) {
      // MARCAMOS EL PASO COMO COMPLETADO
      handleSetCompleted()
      // LLENAMOS TODOS LOS DATOS DEL PASO UNO
      Object.keys(data).map(function (name, index) {
        var value = data[name];
        if (value !== undefined && value !== null) {
          setValue(name, value);
        }
      });

    } else {
      clearData()
    }
  }

  if (isLoading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <DatosPersonales />
        {infoVehiculo && <Vehiculo />}
        {infoCasado && <Conyugue />}
        

        

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
