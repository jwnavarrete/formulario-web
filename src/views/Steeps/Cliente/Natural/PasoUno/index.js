import React, { useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Natural/PasoUno";

import Solicitante from "@views/Form/Cliente/Natural/Solicitante";
import Conyugue from "@views/Form/Cliente/Natural/Conyugue";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import ActionsButtons from "@views/pages/Cliente/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";
//
const index = () => {
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, solicitante, hash, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(NaturalContext)
  
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  
  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (formData) {
      const { solicitante } = formData;
      cargarDatos(solicitante);
      setDatosIniciales(solicitante);
      setInitialData()

    }
  }, [formData]);

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const setInitialData = () => {
    const { formulario } = formData
    if (formulario) {
      setValue("tipo_identificacion", formulario.tip_identificacion);
      setValue("num_identificacion", formulario.identificacion);
      setValue("email", formulario.correo_cliente);
      setValue("email_recibir", formulario.correo_cliente);
    }
  }

  const axiosPrivate = useAxiosPrivate();

  const clearData = () => {
    reset();
  }

  const grabaDatos = async (param) => {
    try {
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento);
      }

      if (param.fech_nacimiento_aseg) {
        param.fech_nacimiento_aseg = formatDate(param.fech_nacimiento_aseg);
      }else{
        delete param.fech_nacimiento_aseg;
      }
      if (param.fech_nacimiento_bene) {
        param.fech_nacimiento_bene = formatDate(param.fech_nacimiento_bene);
      }else{
        delete param.fech_nacimiento_bene;
      }
      
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `cliente-natural/solicitante/${hash}`,
          param
        );
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, solicitante: data })

          swal({
            title: "Paso 1/4",
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
          `cliente-natural/solicitante/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL SOLICITANTE
          setFormData({ ...formData, solicitante: data })
          // solicitante
          swal({
            title: "Paso 1/4",
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

  if (isLoading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        {/* Datos del solicitante */}
        <Solicitante />
        

        {/* <Conyugue /> */}
        {/* Datos del conyugue */}
        {solicitante.tieneConyugue && <Conyugue />}

        

        

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
