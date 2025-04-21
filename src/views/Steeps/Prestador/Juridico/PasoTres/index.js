import React, { useContext, useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Input from "@components/ui/_Input";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Juridico/PasoTres";
// SECTIONS
import Accionistas from "@views/Form/Prestador/Juridico/Accionistas";
import AcreditacionAutomatica from "@views/Form/Prestador/Juridico/AcreditacionAutomatica";
import SituacionFinanciera from "@views/Form/Prestador/Juridico/SituacionFinanciera";
import Cuestionario from "@views/Form/Prestador/Juridico/Cuestionario";
import Referencias from "@views/Form/Prestador/Juridico/Referencias";
import CanalVinculacion from "@views/Form/Prestador/Juridico/CanalVinculacion";
import FormaPago from "@views/Form/Prestador/Juridico/FormaPago";
import EmisionFactura from "@views/Form/Prestador/Juridico/EmisionFactura";
//
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
// 
import ActionsButtons from "@views/pages/Prestador/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// ALERTAS
import swal from "sweetalert";

const index = () => {
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, activeStep, incluyeReferencia, handleSetNext, handleSetCompleted, handleSetActiveStepForm, completed, hash, prestador } = useContext(JuridicoContext)
  const {info_prestador} = formData||{}
  // 
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { reset, setValue, watch, formState: { errors } } = methods;

  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  const watchedValues = watch();

  useEffect(() => {
    validaCambiosFormulario(watchedValues);
  }, [watchedValues]);
  // ++++++++++ CAMBIO PARA BLOQUEAR EL BOTON SIGUIENTE SI HAY CAMBIOS ++++++++
  
  useEffect(() => {
    if (formData) {
      const { cuestionario } = formData
      
      if (cuestionario) {
        cargarDatos(cuestionario)
        setDatosIniciales(cuestionario)
      }
      setValue('tipo_prestador',info_prestador.tipo_prestador??'')
    }
    // countAccionistas();
  }, [formData]);

  const countReferencias = async () => {
    const { data } = await axiosPrivate.get(
      `prestador-juridico/referencias-prestador/${hash}`
    );

    if (data) {
      setValue('referencias', data.length);
    }
    // SETEAMOS LA VARIABLE PARA VALIDAR SI DEBE O NO CARGAR REFERENCIAS
    setValue('juridico', incluyeReferencia);
  }

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

  // const countAccionistas = async () => {
  //   const { data } = await axiosPrivate.get(
  //     `prestador-juridico/accionistas/${hash}`
  //   );

  //   if (data) {
  //     setValue('accionistas', data.length);
  //   }
  //   // SETEAMOS LA VARIABLE PARA VALIDAR SI DEBE O NO CARGAR REFERENCIAS
  //   setValue('incluyeReferencia', incluyeReferencia);
  // }

  const grabaDatos = async (param) => {
    try {
      if(param.activos == ''){
        param.activos = 0;
      }
      if(param.pasivos == ''){
        param.pasivos = 0;
      }
      if(param.patrimonio == ''){
        param.patrimonio = 0;
      }
      if(param.total_egresos == ''){
        param.total_egresos = 0;
      }
      if(param.total_ingresos == ''){
        param.total_ingresos = 0;
      }
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        const { data } = await axiosPrivate.post(
          `prestador-juridico/cuestionario/${hash}`,
          param
        );
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, cuestionario: data })

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
        if(param.activos == ''){
          param.activos = 0;
        }
        if(param.pasivos == ''){
          param.pasivos = 0;
        }
        if(param.patrimonio == ''){
          param.patrimonio = 0;
        }
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `prestador-juridico/cuestionario/${hash}`,
          param
        );

        if (param) {
          setFormData({ ...formData, cuestionario: data })

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
      <Input
          name="tipo_prestador"
          label=""
          style={{display:'none'}}
          type='hidden'
          fullWidth
        />
        <Referencias countReferencias={countReferencias}/>
        <Accionistas />
        

        {/* <Grid item xs={12}>
          <FormHelperText error>{errors.Accionistas?.message}</FormHelperText>
        </Grid> */}

        <SituacionFinanciera />

        {!prestador.esProveedor && <Cuestionario />}

        <AcreditacionAutomatica />

        <CanalVinculacion/>

        <FormaPago/>

        <EmisionFactura/>
        
        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
