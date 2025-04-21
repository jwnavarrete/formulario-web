import React, { useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Natural/PasoTres";
import FormHelperText from "@mui/material/FormHelperText";
// SECTIONS
import Referencias from "@views/Form/Cliente/Natural/Referencias";
import EmisionFactura from "@views/Form/Cliente/Natural/EmisionFactura";
import InfoAdicional from "@views/Form/Cliente/Natural/InfoAdicional";
import CanalVinculacion from "@views/Form/Cliente/Natural/CanalVinculacion";
import PersonaExpuestaPoliticamente from  "@views/Form/Cliente/Natural/PersonaExpuestaPoliticamente";
import FormaPago from "@views/Form/Cliente/Natural/FormaPago";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import ActionsButtons from "@views/pages/Cliente/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// ALERTAS
import swal from "sweetalert";

const index = () => {
  const axiosPrivate = useAxiosPrivate();
  const {isLoading, setDatosIniciales, validaCambiosFormulario, formData, setFormData, activeStep, incluyeReferencia, handleSetNext, handleSetCompleted, handleSetActiveStepForm, completed, hash } = useContext(NaturalContext)
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { reset, setValue, watch, formState: { errors } } = methods;

  useEffect(() => {
    if (formData) {
      const { ref_factura } = formData
      if (ref_factura) {
        cargarDatos(ref_factura)
        setDatosIniciales(ref_factura);
      }
    }
    countReferencias();
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

  const countReferencias = async () => {
    const { data } = await axiosPrivate.get(
      `cliente-natural/referencias/${hash}`
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
          `cliente-natural/ref_factura/${hash}`,
          param
        );
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, ref_factura: data })

          swal({
            title: "Paso 3/4",
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
          `cliente-natural/ref_factura/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, ref_factura: data })

          swal({
            title: "Paso 3/4",
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
        <Grid item xs={12}>
          <h3>
            Persona Natural A1-normal
          </h3>
        </Grid>
        {incluyeReferencia && <>
          <Referencias countReferencias={countReferencias} />
          <Grid item xs={12}>
            <FormHelperText error>{errors.referencias?.message}</FormHelperText>
          </Grid>
        </>}

        <EmisionFactura />

        <InfoAdicional />

        <PersonaExpuestaPoliticamente/>
        <CanalVinculacion />

        <FormaPago />

        <ActionsButtons grabaDatos={grabaDatos} />
      </Grid>
    </FormProvider>
  );
};

export default index;
