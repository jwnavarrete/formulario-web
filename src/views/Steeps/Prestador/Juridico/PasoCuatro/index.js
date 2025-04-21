import React, { useState, useContext, useEffect } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Input from "@components/ui/_Input";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
//
import Documentos from "@views/Form/Prestador/Juridico/Documentos";
import Declaracion from "@views/Form/Prestador/Juridico/Declaracion";
import Revision from "@views/Form/Prestador/Juridico/Revision";
import RevisionBroker from "@views/Form/Prestador/Juridico/RevisionBroker";
import Peps from "@views/Form/Prestador/Juridico/Peps";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Juridico/PasoCuatro";
// BOTONES
import ActionsButtons from "@views/pages/Prestador/Juridico/ActionsButtons";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// 
const index = () => {
  const { hash, formData, setFormData, handleSetActiveStepForm, setEstado, isComplete, getDocumentosCargados, revisionInterna,
    revisionInternaBroker

  } = useContext(JuridicoContext)
  const {info_prestador} = formData||{}

  const [loading, setLoading] = useState(true)
  // 
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { setValue } = methods

  useEffect(() => {
    if (hash) {
      // getDeclaracion()
      getDocumentosCargados(hash)
    }

    if (formData) {
      const { declaracion } = formData
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

      if (!isComplete()) {
        const { data } = await axiosPrivate.post(
          `/prestador-juridico/declaracion/${hash}`,
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
          `prestador-juridico/declaracion/${hash}`,
          param
        );

        if (data) {
          
          if(alert){
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

  const getDeclaracion = async () => {
    const { data } = await axiosPrivate.get(
      `prestador-Juridico/declaracion/${hash}`
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
          <Input
            name="tip_prestador"
            label=""
            style={{display:'none'}}
            type='hidden'
            fullWidth
          />
          <Peps />

          <Documentos />

          <Declaracion />

          {revisionInterna && <Revision />}
          {
            revisionInternaBroker && <RevisionBroker/>
          }

          <ActionsButtons grabaDatos={grabaDatos} />
        </Grid>
      </FormProvider>
    </>
  );
};

export default index;
