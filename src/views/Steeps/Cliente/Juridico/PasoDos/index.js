import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Juridico/PasoDos";
import Representante from "@views/Form/Cliente/Juridico/Representante";
import Conyugue from "@views/Form/Cliente/Juridico/Conyugue";
import ActionsButtons from "@views/pages/Cliente/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
import swal from "sweetalert";
import { formatDate } from "@/utils/Api/utils";

const index = () => {
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, hash, setFormData, representante, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(JuridicoContext)
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch } = methods

  useEffect(() => {
    if (formData) {
      const { representante } = formData
      // 
      if (representante) {
        cargarDatos(representante)
        setDatosIniciales(representante);
      }
    }
  }, [formData]);


  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  // useEffect(()=>{
  //   const watchedValues = watch();
  //   setDatosIniciales(watchedValues);
  // }, [isLoading])

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++


  const prepareData = (data) => {
    // INCLUIMOS EL NUMERO DE INDENTIFICACION EN LOS CAMPOS A GUARDAR
    // data.num_identificacion = identificacion;
    // SI NO TIENE OTROS INGRESOS SETEAMOS EL CAMPO OTROS INGRESOS EN CERO
    if (data.otro_ingreso == 'N') {
      if (!data.otros_info) {
        data.otros_info = 0
      }
    }

    return data
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

  const clearData = () => {
    reset();
  }

  const grabaDatos = async (param) => {
    try {
      param = prepareData(param);
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      param.fech_nacimiento = formatDate(param.fech_nacimiento);
      if (!completed[activeStep]) {
        // SETEAMOS EL NUMERO DE IDENTIFICACION PARA LA RELACION
        const { data } = await axiosPrivate.post(
          `cliente-juridico/representante/${hash}`,
          param
        );
        //
        if (data) {
          setFormData({ ...formData, representante: data })

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
          `cliente-juridico/representante/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, representante: data })

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
      

        {/* Representante legal */}
        <Representante />

        {/* Datos del conyugue */}
        {representante.tieneConyugue && <Conyugue />}

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
