import React, { useState, useEffect } from "react";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
// VALIDACIONES
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Empleado/Otros/ReferenciaPersonal";
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
  const [openModal, setOpenModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getRows();
  }, []);


  const getRows = async () => {
    // identificacion
    const { data } = await axiosPrivate.get(
      `/empleado/referencia-personal/${hash}`
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
          `/empleado/referencia-personal/`,
          param
        );

        if (data) {
          getRows();
        }

      } else {
        // SI EXISTE LO ACTUALIZAMOS CON EL CODIGO ID
        const { data } = await axiosPrivate.patch(
          `/empleado/referencia-personal/${param.id}`,
          param
        );

        if (data) {
          getRows();
        }
      }


      clearData();
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
    setOpenModal(false);
  }

  const DelefeRef = async () => {
    let codigo = getValues('id');

    const { data } = await axiosPrivate.delete(
      `/empleado/referencia-personal/${codigo}`
    );
    // 
    getRows();
    clearData();
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} editMode={editMode} clearData={clearData} DelefeRef={DelefeRef} openModal={openModal} setOpenModal={setOpenModal} rows={rows}/>

      <Grid item xs={12}>
        <Table rows={rows} setEditMode={setEditMode} setOpenModal={setOpenModal}/>
      </Grid>
    </FormProvider>
  );
};

export default index;
