import React, { useContext, useState, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Natural/PasoTres";
import FormHelperText from "@mui/material/FormHelperText";
// SECTIONS
import Referencias from "@views/Form/Prestador/Natural/Referencias";
// import EmisionFactura from "@views/Form/Prestador/Natural/EmisionFactura";
import InfoAdicional from "@views/Form/Prestador/Natural/InfoAdicional";
import Cuestionario from "@views/Form/Prestador/Natural/Cuestionario";
import AcreditacionAutomatica from "@views/Form/Prestador/Natural/AcreditacionAutomatica";
import EmisionFactura from "@views/Form/Prestador/Natural/EmisionFactura";
import CanalVinculacion from "@views/Form/Prestador/Natural/CanalVinculacion";
import FormaPago from "@views/Form/Prestador/Natural/FormaPago";
// import PersonaExpuestaPoliticamente from "@views/Form/Prestador/Natural/PersonaExpuestaPoliticamente";
//
import { NaturalContext } from "@context/Prestador/NaturalContext"
// 
import ActionsButtons from "@views/pages/Prestador/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// ALERTAS
import swal from "sweetalert";

const index = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true)
  const { validaCambiosFormulario, setDatosIniciales, formData, setFormData, activeStep, incluyeReferencia, handleSetNext, handleSetCompleted, handleSetActiveStepForm, completed, hash, prestador } = useContext(NaturalContext)
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { reset, setValue, watch, formState: { errors } } = methods;

  useEffect(() => {
    if (formData) {
      const { cuestionario,info_prestador } = formData
      // 
      setLoading(false)
      if (cuestionario) {
        cargarDatos(cuestionario)
        setDatosIniciales(cuestionario)
      }
      setValue('tip_prestador',info_prestador.tipo_prestador??'')
    }
    countReferencias();
  }, []);

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
      `prestador-natural/referencias-prestador/${hash}`
    );

    if (data) {
      setValue('referencias', data.length);
    }
    // SETEAMOS LA VARIABLE PARA VALIDAR SI DEBE O NO CARGAR REFERENCIAS
    setValue('incluyeReferencia', incluyeReferencia);
  }

  const grabaDatos = async (param) => {
    try {
      // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
      if (!completed[activeStep]) {
        
        const { data } = await axiosPrivate.post(
          `/prestador-natural/cuestionario/${hash}`,
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
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `prestador-natural/cuestionario/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, cuestionario: param })

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

  if (loading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        {/* {incluyeReferencia && <> */}
        <Referencias countReferencias={countReferencias} />
        <Grid item xs={12}>
          <FormHelperText error>{errors.referencias?.message}</FormHelperText>
        </Grid>
        {/* </>} */}

        <InfoAdicional />

        {!prestador.esProveedor && <Cuestionario />}

        <AcreditacionAutomatica/>

        <EmisionFactura/>
        <CanalVinculacion/>
        <FormaPago/>
        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
