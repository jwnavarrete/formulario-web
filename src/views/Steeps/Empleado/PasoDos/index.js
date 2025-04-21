import React, { useContext, useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Empleado/PasoDos";
// SECTIONS
import Formacion from "@views/Form/Empleado/Formacion";
import Certificaciones from "@views/Form/Empleado/Certificaciones";
import Idiomas from "@views/Form/Empleado/Idiomas";
import CursoSuperior from "@views/Form/Empleado/CursoSuperior";
import ConocimientosVarios from "@views/Form/Empleado/ConocimientosVarios";
import ActionsButtons from "@views/pages/Empleado/Formulario/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";

const index = () => {
  const { isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, completed, activeStep, hash, handleSetNext, handleSetCompleted, handleSetActiveStepForm, infoCertificaciones, infoIdiomas } = useContext(EmpleadoContext)
  const axiosPrivate = useAxiosPrivate();
  //
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue,getValues,clearErrors,watch, reset,formState: { errors } } = methods

  useEffect(() => {
    if (formData) {
      const { formacion_varios } = formData
      cargarDatos(formacion_varios)
      setDatosIniciales(formacion_varios)
    }
  }, [formData]);

  useEffect(()=>{
    validateCertificaciones();
  },[watch('tiene_certificaciones')])

 
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
 

  const validateCertificaciones = () =>{
    if(getValues('tiene_certificaciones')!='S'){
      clearErrors('certificaciones');
    }

    if(getValues('tiene_certificaciones')=='S' && getValues('certificaciones') > 0){
      clearErrors('certificaciones');
    }
  }

  useEffect(()=>{
    validateIdiomas();
  },[watch('tiene_idiomas')])

  const validateIdiomas = () =>{
    if(getValues('tiene_idiomas')!='S'){
      clearErrors('idiomas');
    }

    if(getValues('tiene_idiomas')=='S' && getValues('idiomas') > 0){
      clearErrors('idiomas');
    }
  }


  const countCertificaciones = async () => {
    const { data } = await axiosPrivate.get(
      `/empleado/certificaciones/${hash}`
    );

    if (data) {
      setValue('certificaciones', data.length);
      validateCertificaciones();
    }
    // SETEAMOS LA VARIABLE PARA VALIDAR SI DEBE O NO CARGAR REFERENCIAS
   
  }

  const countIdiomas = async () =>{
    const { data } = await axiosPrivate.get(
      `/empleado/idioma/${hash}`
    );
    if(data){
      setValue('idiomas', data.length);
      validateIdiomas();
    }

  }

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
        if (value !== undefined && value !== null) {
          setValue(name, value);
        }
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
      param = prepareData(param)
      // 
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento);
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `/empleado/formacion-varios/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, formacion_varios: data })

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
          `/empleado/formacion-varios/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, formacion_varios: data })

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

  if (isLoading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Formacion />

        {infoCertificaciones && <Certificaciones countCertificaciones ={countCertificaciones} />}
        <Grid item xs={12}>
          <FormHelperText error>{errors.certificaciones?.message}</FormHelperText>
        </Grid>

        {infoIdiomas && <Idiomas countIdiomas ={countIdiomas} />}
        <Grid item xs={12}>
          <FormHelperText error>{errors.idiomas?.message}</FormHelperText>
        </Grid>

        <CursoSuperior/>

        <ConocimientosVarios />

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
