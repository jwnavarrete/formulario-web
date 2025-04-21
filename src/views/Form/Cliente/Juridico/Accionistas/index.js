import React, { useState, useEffect, useContext } from "react";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./Validator";
// COMPONENTES DE MATERIAL UI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
// COMPONENTE DE VISTA
import Form from './Form';
import Table from "./Table";
import { initialData } from './InitialData';
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
// ALERTAS
import swal from "sweetalert";
//
const index = () => {
  const { hash, getAccionistas, accionistas, loadNacionalidades } = useContext(JuridicoContext)
  const [editMode, setEditMode] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getAccionistas();
    loadNacionalidades();
  }, []);

  const onSubmit = async (param) => {
    try {
      param.hash = hash;
      console.log('param', param)
      if (param.id === undefined) {
        // SI NO EXISTE PROCEDEMOS A CREAR EL REGISTRO
        const { data } = await axiosPrivate.post(
          `cliente-juridico/accionista/`,
          param
        );

        clearData();

        if (data) { await getAccionistas() }

      } else {
        // SI EXISTE LO ACTUALIZAMOS CON EL CODIGO ID
        const { data } = await axiosPrivate.patch(
          `cliente-juridico/accionista/${hash}`, param
        );

        clearData();

        if (data) { await getAccionistas() }
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

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(validationSchema),
  });


  const { reset, getValues, formState: { errors } } = methods;


  const clearData = () => {
    reset();
    setEditMode(false);
  }

  const DelefeRef = async () => {
    let codigo = getValues('id');

    const { data } = await axiosPrivate.delete(
      `cliente-juridico/accionista/${codigo}`
    );

    await getAccionistas();
    clearData();
  }

  return (
    <FormProvider {...methods}>

      <Grid item xs={12}>
        <Typography variant="small" component="h4">
          N&oacute;mina de socios o accionistas
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">N&oacute;mina de socios o accionistas que posean el 10% o m&aacute;s de participaci&oacute;n en el capital suscrito y pagado</Alert>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <></>
      </Grid>
      <Form onSubmit={onSubmit} editMode={editMode} clearData={clearData} DelefeRef={DelefeRef} />

      <Grid item xs={12}>
        <Table rows={accionistas} setEditMode={setEditMode} />
      </Grid>
    </FormProvider>
  );
};

export default index;
