import React from "react";
import { SteepJuridico } from "../Steeps";
import FrmClienteJuridico from "./Form";
import JuridicoProvider from "@context/Cliente/JuridicoContext"

// FORMULARIO ACTIONS REDUX
const index = ({firma, hash,revision,revisionAsesor}) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <JuridicoProvider>
      <FrmClienteJuridico steeps={SteepJuridico} firma={firma} hash={hash} revision={revision} revisionAsesor={revisionAsesor}/>
    </JuridicoProvider>
  )
};

export default index;
