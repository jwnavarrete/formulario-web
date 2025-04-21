import React, { useState, useEffect } from "react";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/Natural/Referencias";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
// COMPONENTE DE VISTA
import Form from './Form';
import Table from "./Table";
import { initialData } from './InitialData';
// ALERTAS
import swal from "sweetalert";
// 
const index = ({ countReferencias }) => {
  const { hash } = useSelector((state) => state.formNatural);
  const [rows, setRows] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getRows();
  }, []);


  const getRows = async () => {
    // identificacion
    const { data } = await axiosPrivate.get(
      `prestador-natural/referencias-prestador/${hash}`
    );

    if (data) {
      setRows(data);
      countReferencias();
    }
  }

  const prepareData = (data) => {
    // INCLUIMOS EL NUMERO DE INDENTIFICACION EN LOS CAMPOS A GUARDAR
    data.hash = hash;
    return data
  }

  const onSubmit = async (param) => {
    try {
      param = prepareData(param);

      if (param.id === undefined) {
        // SI NO EXISTE PROCEDEMOS A CREAR EL REGISTRO
        const { data } = await axiosPrivate.post(
          `prestador-natural/referencias-prestador/`,
          param
        );

        clearData();

        if (data) {
          await getRows();
        }

      } else {
        // SI EXISTE LO ACTUALIZAMOS CON EL CODIGO ID
        const { data } = await axiosPrivate.patch(
          `prestador-natural/referencias-prestador/${param.id}`,
          param
        );

        clearData();

        if (data) {
          await getRows();
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

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(validationSchema),
  });


  const { reset, getValues, setValue, formState: { errors } } = methods;

  useEffect(() => {
  }, []);

  const clearData = () => {
    reset();
    setEditMode(false);
  }

  const DelefeRef = async () => {
    let codigo = getValues('id');

    const { data } = await axiosPrivate.delete(
      `prestador-natural/referencias-prestador/${codigo}`
    );
    // 
    getRows();
    clearData();
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} editMode={editMode} clearData={clearData} DelefeRef={DelefeRef} />

      <Grid item xs={12}>
        <Table rows={rows} setEditMode={setEditMode} />
      </Grid>
    </FormProvider>
  );
};

export default index;
