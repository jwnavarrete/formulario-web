import React from "react";
import { SteepJuridico } from "../Steeps";
import FrmClienteNatural from "./Form";
import JuridicoProvider from "@context/Prestador/JuridicoContext"

// FORMULARIO ACTIONS REDUX
const index = ({firma, hash, revision,revisionBroker}) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <JuridicoProvider>
      <FrmClienteNatural steeps={SteepJuridico} firma={firma} hash={hash} revision={revision} revisionBroker={revisionBroker}/>
    </JuridicoProvider>
  )
};

export default index;