import React, { useState, useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Natural/PasoUno";
import InformacionPrestador from "@views/Form/Prestador/Natural/InformacionPrestador";
import Conyugue from "@views/Form/Prestador/Natural/Conyugue";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import ActionsButtons from "@views/pages/Prestador/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
import { NaturalContext } from "@context/Prestador/NaturalContext"
//ALERT
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";
//
const index = () => {
  const { isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, infoCasado, hash, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm, loadData } = useContext(NaturalContext)

  const axiosPrivate = useAxiosPrivate();
  //
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (hash) {
      loadData(hash)
    }
    if (formData) {
      const { info_prestador } = formData
      cargarDatos(info_prestador)
      setInitialData()
      setDatosIniciales(info_prestador);
    }
  }, []);


  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const setInitialData = () => {
    const { formulario, info_prestador } = formData
    if (formulario) {
      setValue("tipo_identificacion", formulario.tip_identificacion);
      setValue("num_identificacion", formulario.identificacion);
      setValue("email", formulario.correo_prestador);
      setValue("email_recibir", formulario.correo_prestador);
      setValue("tipo_prestador", formulario.tipo_prestador);
    }

    if (info_prestador) {
      setValue("tipo_prestador", info_prestador.tipo_prestador);
    }
  }

  const clearData = () => {
    reset();
  }

  const grabaDatos = async (param) => {
    try {
      // 
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento);
      }
      if (param.fech_nacimiento == '') {
        param.fech_nacimiento = null
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `prestador-natural/info-prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, info_prestador: data })

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
        if (param.fech_nacimiento == '') {
          param.fech_nacimiento = null
        }
        const { data } = await axiosPrivate.patch(
          `prestador-natural/info-prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, info_prestador: data })

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
        <InformacionPrestador />

        {infoCasado && <Conyugue />}

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
