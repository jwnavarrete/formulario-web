import React, { useContext, useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Empleado/PasoTres";
import FormHelperText from "@mui/material/FormHelperText";
import ExperienciaLaboral from "@views/Form/Empleado/ExperienciaLaboral";
import ReferenciaPersonal from "@views/Form/Empleado/ReferenciaPersonal";
import ReferenciaFinanciera from "@views/Form/Empleado/ReferenciaFinanciera";
import ReferenciaComercial from "@views/Form/Empleado/ReferenciaComercial";
import SituacionFinanciera from "@views/Form/Empleado/SituacionFinanciera";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
import ActionsButtons from "@views/pages/Empleado/Formulario/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import swal from "sweetalert";

const index = () => {
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm, completed, hash } = useContext(EmpleadoContext)

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { reset, setValue,watch,clearErrors, formState: { errors } } = methods;

  useEffect(() => {
    countReferencias();

    if (formData) {
      const { referencia_financiera } = formData
      if (referencia_financiera) {
        cargarDatos(referencia_financiera)
        setDatosIniciales(referencia_financiera)
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
    reset();
  }

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

  const countReferencias = async () => {
    const { data } = await axiosPrivate.get(
      `empleado/referencia-personal/${hash}`
    );

    if (data) {
      setValue('referencias', data.length);
      clearErrors('referencias')
    }
  }

  const grabaDatos = async (param) => {
    try {

      if(param.total_otros_ingresos == ''){
        param.total_otros_ingresos =0;
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        const { data } = await axiosPrivate.post(
          `/empleado/referencia-financiera/${hash}`,
          param
        );
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, referencia_financiera: data })

          swal({
            title: "Formulario Online",
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
          `/empleado/referencia-financiera/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, referencia_financiera: param })

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

        <ExperienciaLaboral />

        <ReferenciaPersonal countReferencias={countReferencias} />
        <Grid item xs={12}>
          <FormHelperText error>{errors.referencias?.message}</FormHelperText>
        </Grid>

        <ReferenciaFinanciera />

        <ReferenciaComercial />

        <SituacionFinanciera />

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
