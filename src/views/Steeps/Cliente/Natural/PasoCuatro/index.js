import React, { useState, useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import { NaturalContext } from "@context/Cliente/NaturalContext"
//
import Documentos from "@views/Form/Cliente/Natural/Documentos";
import Declaracion from "@views/Form/Cliente/Natural/Declaracion";
import Revision from "@views/Form/Cliente/Natural/Revision";
import RevisionAsesor from "@views/Form/Cliente/Natural/RevisionAsesor";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Cliente/Natural/PasoCuatro";
// BOTONES
import ActionsButtons from "@views/pages/Cliente/Natural/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
const index = () => {
  const { formData, hash, handleValidaDocumentos, handleSetActiveStepForm, setEstado, isComplete, getDocumentosCargados,revisionInterna,revisionInternaAsesor } = useContext(NaturalContext)
  // 
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue ,reset} = methods

  useEffect(() => {
    if (hash) {
      getDeclaracion()
      getDocumentosCargados(hash)
    }
  }, []);

  const axiosPrivate = useAxiosPrivate();
  const grabaDatos = async (param, alert = true) => {
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
        // SI EL PASO NO ESTA COMPLETADO, CREAMOS EL REGISTRO, CASO CONTRARIO EDITAMOS
        const { data } = await axiosPrivate.patch(
          `cliente-natural/solicitante/${hash}/declaracion`,
          param
        );

        let { correo_cliente } = data.formulario

        if (data) {

          if (!isComplete()) {
            swal({
              title: "Correo Aceptación",
              text: `Se procedió a enviar un correo para la aceptación y firma del formulario al correo: ${correo_cliente}`,
              icon: "success",
              buttons: {
                aceptar: "Aceptar",
              },
            }).then((value) => {
              if (value) {
                // SETEAMOS EL PASO CUATRO COMO COMPLETADO
                handleSetActiveStepForm();
                // SETEAMOS EL ESTADO QUE DEVUELVE EL API
                setEstado(data.formulario.estado)
              }
            });
          } else {
            // SI NO ESTA PENDIENTE NO ENVIA CORREO
            if (alert) {
              swal({
                title: "Paso 4/4",
                text: `Realizado con éxito!`,
                icon: "success",
                buttons: {
                  aceptar: "Aceptar",
                },
              })
            }
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

  const cargarDatos =()=>{
    const {ref_factura} = formData
    
    if(ref_factura){
      Object.keys(ref_factura).map(function (name, index) {
        var value = ref_factura[name];
        if (value !== undefined && value !== null) {
          setValue(name, value);
        }
      });
    }else{
      reset();
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>
              Persona Natural A1-normal
            </h3>
          </Grid>
          <Documentos />

          <Declaracion />
          {
            revisionInterna && <Revision />
          }
          {
            revisionInternaAsesor && <RevisionAsesor/>
          }
          <ActionsButtons grabaDatos={grabaDatos} />
        </Grid>
      </FormProvider>
    </>
  );
};

export default index;
