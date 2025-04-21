import React, { useState, useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Juridico/PasoUno";
// 
import InformacionPrestador from "@views/Form/Prestador/Juridico/InformacionPrestador";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import ActionsButtons from "@views/pages/Prestador/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
//ALERT
import swal from "sweetalert";
import { formatDate } from "@utils/Api/utils";
//
const index = () => {
  // const [loading, setLoading] = useState(true)
  const { isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, hash, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(JuridicoContext)

  useEffect(() => {
    
    if (formData) {
      const { info_prestador } = formData
      cargarDatos(info_prestador)
      setInitialData()
      setDatosIniciales(info_prestador);
    }
  }, [formData]);

  const setInitialData = () => {
    const { formulario, info_prestador } = formData
    if (formulario) {
      setValue("tipo_identificacion_empresa", formulario.tip_identificacion);
      setValue("num_identificacion_empresa", formulario.identificacion);
      setValue("correo_empresa", formulario.correo_prestador);
      setValue("tipo_prestador", formulario.tipo_prestador);
    }
    
    if (info_prestador) {
      setValue("tipo_prestador", info_prestador.tipo_prestador);
      setValue("correo_empresa", info_prestador.correo_empresa);
    }

    console.log("uno:", formulario)
    console.log("dos:",info_prestador)
  }
  
  const axiosPrivate = useAxiosPrivate();
  //
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue, reset, watch } = methods

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++

  const clearData = () => {
    reset();
  }

  const grabaDatos = async (param) => {
    try {
      // 
      if (param.fech_nacimiento) {
        param.fech_nacimiento = formatDate(param.fech_nacimiento);
      }

      if(param.val_asegurado ==''){
        param.val_asegurado = 0;
      }

      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `prestador-juridico/info-prestador-juridico/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({
            ...formData,
            info_prestador: data,
            formulario: {
              ...formData.formulario,
              correo_prestador: data.correo_empresa
            }
          });

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
          `prestador-juridico/info-prestador-juridico/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({
            ...formData,
            info_prestador: data,
            formulario: {
              ...formData.formulario,
              correo_prestador: data.correo_empresa
            }
          });

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
      
        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
