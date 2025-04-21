import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
// MATERIAL COMPONENTS
import Box from '@mui/material/Box';
// COMPONENTS
import ModalForm from "../Modal";
import swal from "sweetalert";
// CONTEXT
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
import { useParams, useNavigate } from 'react-router-dom';
import ShowSteeps from "@utils/Steep";
// REDEUCERS
import {
  setSteeps,
  setHash,
  setActiveStepForm,
  setFirma
} from "@reducers/Prestador/formularioJuridico/actions";

const steeper = ({ steeps, firma, hash, revision ='N',revisionBroker ="N"}) => {
  // Context
  const {
    loadData,
    modalVisible,
    setRevisionInterna,
    setRevisionInternaBroker
  } = useContext(JuridicoContext)

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  //
  useEffect(()=> {
    dispatch(setSteeps(steeps));
    // SI TIENE VALOR EN FIRMA SETEAMOS EL CAMPO EN EL ESTADO
    if(firma){
      dispatch(setFirma(firma));
    }
    // CONSULTAMOS Y MOSTRAMOS LOS DATOS DEL FORMULARIO, SINO EXISTE PIDE INGRESAR DATOS
    if(hash){
      loadDataFormulario(hash)
    }else{
      loadDataFormulario(id)
    }

    if (revision == "S"){
      setRevisionInterna(true)
    }

    if (revisionBroker == "S"){
      setRevisionInternaBroker(true)
    }

  }, []);

  const loadDataFormulario = async (id)=>{
    await getDatosFormularioById(id)

    setLoading(false)
  }

  // SI EL CODIGO NO EXISTE LO REDIRIGE A LA URL PARA PEDIR INFORMACION
  const getDatosFormularioById = async (id) => {
    try {
      const hash = (id ? id : '')

      const formData = await loadData(id);
      // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
      if (!formData) {
        navigate(`/${process.env.URL_PRESTADOR}`);
      } else {
        const { formulario, hash } = formData
        const { steep } = formulario
        // SETEAMOS EL NUMERO DE IDENTIFICACION QUE ESTAMOS PROCESANDO
        dispatch(setHash(hash));
        // SETEAMOS EL ULTIMO STEEP EN EL QUE NOS QUEDAMOS
        dispatch(setActiveStepForm(steep));
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
  }

  if (loading) {
    return "Cargando datos, por favor espere."
  }

  return (
    <Box>
      <ShowSteeps steeps={steeps} />

      {modalVisible && <ModalForm />}
    </Box>
  );
};

export default steeper;
