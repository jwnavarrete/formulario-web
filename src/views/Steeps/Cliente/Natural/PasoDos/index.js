import React, { useState, useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Natural/PasoDos";
// SECTIONS
import ActividadEconomica from "@views/Form/Cliente/Natural/ActividadEconomica";
import InformacionFinanciera from "@views/Form/Cliente/Natural/InformacionFinanciera";
import SituacionFinanciera from "@views/Form/Cliente/Natural/SituacionFinanciera";
//
import ActionsButtons from "@views/pages/Cliente/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import swal from "sweetalert";

const index = () => {
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, completed, activeStep, hash, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(NaturalContext)
  const axiosPrivate = useAxiosPrivate();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (formData) {
      const { actividad } = formData
      if (actividad) {
        cargarDatos(actividad)
        setDatosIniciales(actividad);
      }
    }
  }, [formData]);

    // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
    const watchedValues = watch();

    useEffect(() => {
      validaCambiosFormulario(watchedValues);
    }, [watchedValues]);
    // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  

  const clearData = () => {
    setValue("activos", 0);
    setValue("pasivos", 0);
    setValue("patrimonio", 0);
    reset();
  }

  const cargarDatos = (data) => {
    if (data) {
      // MARCAMOS EL PASO COMO COMPLETADO
      handleSetCompleted()
      // LLENAMOS TODOS LOS DATOS DEL PASO UNO
      Object.keys(data).map(function (name, index) {
        var value = data[name];
        if (value === undefined || value === null) {
          value = ''
        }
        setValue(name, value);
      });
    } else {
      clearData()
    }
  }

  const prepareData = (data) => {
    // SI NO TIENE OTROS INGRESOS SETEAMOS EL CAMPO OTROS INGRESOS EN CERO
    if (data.otro_ingreso == 'N') {
      if (!data.otros_info) {
        data.otros_info = 0
      }
    }

    return data
  }

  const grabaDatos = async (param) => {
    try {
      param = prepareData(param);
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // SETEAMOS EL NUMERO DE hash PARA LA RELACION
        const { data } = await axiosPrivate.post(
          `cliente-natural/actividad/${hash}`,
          param
        );
        //
        if (data) {

          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, actividad: data })

          swal({
            title: "Paso 2/4",
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
          `cliente-natural/actividad/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, actividad: data })

          swal({
            title: "Paso 2/4",
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

  if (isLoading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>
            Persona Natural A1-normal
          </h3>
        </Grid>

        <ActividadEconomica/>

        <InformacionFinanciera/>

        <SituacionFinanciera/>

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
