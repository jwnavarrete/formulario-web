import React, { useState, useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
//
import Documentos from "@views/Form/Empleado/Documentos";
import Declaracion from "@views/Form/Empleado/Declaracion";
import Revision from "@views/Form/Empleado/Revision";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Empleado/PasoCuatro";
// BOTONES
import ActionsButtons from "@views/pages/Empleado/Formulario/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
const index = () => {
  const { hash, formData, setFormData, handleValidaDocumentos, handleSetActiveStepForm, setEstado, isComplete, getDocumentosCargados, revisionInterna ,handleChangePeeps} = useContext(EmpleadoContext)
  // 
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue } = methods
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (hash) {
      getDocumentosCargados(hash)
    }

    if (formData) {
      const { declaracion ,datos_personales} = formData
      // 
      setLoading(false)
      if (declaracion) {
        cargarDatos(declaracion)
      }
      if(datos_personales){
        setValue('seleccionar_pep',datos_personales.seleccionar_pep??'')
        handleChangePeeps(datos_personales.seleccionar_pep??'')
      }
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
  
  const grabaDatos = async (param) => {
    try {
      if (!handleValidaDocumentos()) {
        swal({
          title: "Documentos requeridos",
          text: `Por favor, cargue todos los documentos para continuar`,
          icon: "warning",
          buttons: {
            cerrar: "Aceptar",
          },
        });
      } else {

        if (!isComplete()) {
          const { data } = await axiosPrivate.post(
            `/empleado/declaracion/${hash}`,
            param
          );
          //
          if (data) {
            // ACTUALIZAMOS LOS PARAMETROS DEL CONTEXTO CON LOS DATOS
            setFormData({ ...formData, declaracion: data })

            let { correo_empleado } = formData.formulario

            swal({
              title: "Correo Aceptación",
              text: `Se procedió a enviar un correo para la aceptación y firma del formulario al correo: ${correo_empleado}`,
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
            `empleado/declaracion/${hash}`,
            param
          );

          if (data) {
            setFormData({ ...formData, declaracion: data })

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

  if (loading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
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
