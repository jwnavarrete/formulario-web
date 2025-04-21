import React, { useContext, useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Natural/PasoDos";
// SECTIONS
import ActividadEconomica from "@views/Form/Prestador/Natural/ActividadEconomica";
import InformacionFinanciera from "@views/Form/Prestador/Natural/InformacionFinanciera";
import SituacionFinanciera from "@views/Form/Prestador/Natural/SituacionFinanciera";
//
import ActionsButtons from "@views/pages/Prestador/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { NaturalContext } from "@context/Prestador/NaturalContext"
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";

const index = () => {
  const [loading, setLoading] = useState(true)
  const {validaCambiosFormulario, setDatosIniciales, formData, setFormData, completed, activeStep, hash, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(NaturalContext)
  const axiosPrivate = useAxiosPrivate();
  //
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch } = methods

  useEffect(() => {

    if (formData) {
      const { actividad ,info_prestador} = formData
      // 
      setLoading(false)

      cargarDatos(actividad)

      setValue('tip_prestador',info_prestador.tipo_prestador??'')

      setDatosIniciales(actividad);
    }
    
    // setLoading(false)
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
    if(data.otro_ingreso == ''){
      data.otros_info = 0
    }

    if(data.activos == ''){
      data.activos = 0;
    }
    if(data.pasivos == ''){
      data.pasivos = 0;
    }
    if(data.patrimonio == ''){
      data.patrimonio = 0;
    }
    if(data.ingreso_mensuales == ''){
      data.ingreso_mensuales = 0;
    }
    if(data.total_ingresos == ''){
      data.total_ingresos = 0;
    }
    if(data.total_egresos == ''){
      data.total_egresos = 0;
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
          `/prestador-natural/actividad-prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, actividad: data })

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
          `/prestador-natural/actividad-prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, actividad: data })

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

  if (loading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <ActividadEconomica />

        <InformacionFinanciera />

        <SituacionFinanciera />

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
