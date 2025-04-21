import React, { useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Juridico/PasoUno";
import Solicitante from "@views/Form/Cliente/Juridico/Solicitante";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import ActionsButtons from "@views/pages/Cliente/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";
import { getCatalogo } from "@utils/Api/Catalogo";

const index = () => {
  const {isLoading, setCatalogoActividadEco, setDatosIniciales, validaCambiosFormulario, formData, setFormData, completed, activeStep, handleSetActiveStepForm, hash, handleSetNext, handleSetCompleted } = useContext(JuridicoContext)
  const axiosPrivate = useAxiosPrivate();
  //
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { reset, setValue, watch } = methods

  useEffect(()  => {
    const {solicitante } = formData

    if(solicitante){
    }
    
    if (formData) {
      if(solicitante?.sector_empresa){
        loadActividadBySector(solicitante?.sector_empresa)
      }
      cargarDatos(solicitante)
      setDatosIniciales(solicitante);
    }
    setInitialData()
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

  const setInitialData = async ()  => {
    const { formulario, solicitante } = formData
    console.log("aqui...")
    console.log(formulario)
    
    if (formulario) {
      setValue("tipo_identificacion_empresa", formulario.tip_identificacion);
      setValue("num_identificacion_empresa", formulario.identificacion);
      setValue("correo_empresa", formulario.correo_cliente);
    }
  }

  const loadActividadBySector = async (value) =>{
    // setValue('actividad_empresa', '')
    getCatalogo(`actividadeco/${value}`, setCatalogoActividadEco);
  }

  const grabaDatos = async (param) => {
    try {
      param.fecha_constitucion_empresa = formatDate(param.fecha_constitucion_empresa);
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        const { data } = await axiosPrivate.post(
          `cliente-juridico/solicitante/${hash}`,
          param
        );
        //
        if (data) {
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
              // SETEAMOS EL NUMERO DE IDENTIFICACION QUE ESTAMOS PROCESANDO
              handleSetActiveStepForm()
            }
          });
        }
      } else {
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `cliente-juridico/solicitante/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, solicitante: data })

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

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
