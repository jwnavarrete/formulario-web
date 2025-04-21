import React, { useState, useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import { NaturalContext } from "@context/Prestador/NaturalContext"
//
import Documentos from "@views/Form/Prestador/Natural/Documentos";
import Declaracion from "@views/Form/Prestador/Natural/Declaracion";
import Revision from "@views/Form/Prestador/Natural/Revision";
import Peps from "@views/Form/Prestador/Natural/Peps";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Natural/PasoCuatro";
// BOTONES
import ActionsButtons from "@views/pages/Prestador/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
const index = () => {
  const { hash, formData, setFormData, handleSetActiveStepForm, setEstado, isComplete, getDocumentosCargados, revisionInterna } = useContext(NaturalContext)
  // 
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue } = methods
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (hash) {
      // getDeclaracion()
      getDocumentosCargados(hash)
    }

    if (formData) {
      const { declaracion,info_prestador } = formData
      // 
      setLoading(false)
      if (declaracion) {
        cargarDatos(declaracion)
      }
      setValue('tip_prestador',info_prestador.tipo_prestador??'')
    }

  }, []);

  const cargarDatos = (data) => {
    if (data) {
      // MARCAMOS EL PASO COMO COMPLETADO
      // handleSetCompleted()
      // handleSetActiveStepForm()
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

  const axiosPrivate = useAxiosPrivate();
  const grabaDatos = async (param, alert = true) => {
    try {
      // if (!bandera) {
      if (!isComplete()) {
        const { data } = await axiosPrivate.post(
          `/prestador-natural/declaracion/${hash}`,
          param
        );
        //
        if (data) {
          // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
          setFormData({ ...formData, declaracion: data })

          let { correo_prestador } = formData.formulario

          swal({
            title: "Correo Aceptación",
            text: `Se procedió a enviar un correo para la aceptación y firma del formulario al correo: ${correo_prestador}`,
            icon: "success",
            buttons: {
              aceptar: "Aceptar",
            },
          }).then((value) => {
            if (value) {
              // SETEAMOS EL PASO CUATRO COMO COMPLETADO
              handleSetActiveStepForm();
              // SETEAMOS EL ESTADO QUE DEVUELVE EL API
              // setEstado(data.formulario.estado)
              setEstado("P")
            }
          });
        }
      } else {
        // SI EL PASO ESTA COMPLETADO SE PROCEDE CON LA ACTUALIZACION
        const { data } = await axiosPrivate.patch(
          `prestador-natural/declaracion/${hash}`,
          param
        );

        if (data) {
          setFormData({ ...formData, declaracion: data })

          if(alert){
            swal({
              title: "Formulario Online",
              text: `Actualizado con éxito!`,
              icon: "success",
              buttons: {
                cerrar: "Cerrar",
              },
            }).then((value) => {
              if (value) {
                // SETEAMOS EL PASO CUATRO COMO COMPLETADO
                handleSetActiveStepForm();
                // SETEAMOS EL ESTADO QUE DEVUELVE EL API
                setEstado("P")
              }
            });
          }
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

  const getDeclaracion = async () => {
    const { data } = await axiosPrivate.get(
      `cliente-natural/solicitante/${hash}/declaracion`
    );

    Object.keys(data).map(function (name, index) {
      var value = data[name];
      if (value !== undefined && value !== null) {
        if (name == 'acceptTerms') {
          setValue(name, value);
        } else {
          setValue(name, value);
        }
      }
    });
  }

  if (loading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <>
      <FormProvider {...methods}>
        <Grid container spacing={2}>

          <Peps />

          <Documentos />

          <Declaracion />

          {revisionInterna && <Revision />}

          <ActionsButtons grabaDatos={grabaDatos} />
        </Grid>
      </FormProvider>
    </>
  );
};

export default index;
