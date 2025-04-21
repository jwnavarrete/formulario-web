import React, { useState, useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Juridico/PasoDos";
// 
import Representante from "@views/Form/Prestador/Juridico/Representante";
import Conyugue from "@views/Form/Prestador/Juridico/Conyugue";
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
  const { isLoading,handleChangeEstadoCivil,setInfoCasado, setDatosIniciales, validaCambiosFormulario, formData, setFormData, infoCasado, hash, completed, activeStep, handleSetNext, handleSetCompleted, handleSetActiveStepForm } = useContext(JuridicoContext)

  useEffect(() => {
    if (formData) {
      const { representante } = formData
      cargarDatos(representante)
      setDatosIniciales(representante);
    }
  }, [formData]);

  useEffect(()=>{

    if (formData) {
      const { representante } = formData
      if(representante?.est_civil){
        handleChangeEstadoCivil(representante?.est_civil)
      }
      if(representante?.est_civil == '02' || representante?.est_civil == '04'){
        
        setInfoCasado(true)
      }else{
        setInfoCasado(false)
      }
    }

  },[])

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
      if(param.fech_nacimiento==''){
        param.fech_nacimiento = null
      }

      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        // 
        const { data } = await axiosPrivate.post(
          `prestador-juridico/representante_legal_prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, representante: data })

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
        if(param.fech_nacimiento==''){
          param.fech_nacimiento = null
        }
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `prestador-juridico/representante_legal_prestador/${hash}`,
          param
        );

        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS DEL prestador
          setFormData({ ...formData, representante: data })

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
        <Representante />

        {infoCasado && <Conyugue />}


        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};
export default index;
