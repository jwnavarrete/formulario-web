import React from "react";
import { SteepNatural } from "../Steeps";
import FrmClienteNatural from "./Form";
import NaturalProvider from "@context/Prestador/NaturalContext"

// FORMULARIO ACTIONS REDUX
const index = ({firma, hash, revision}) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <NaturalProvider>
      <FrmClienteNatural steeps={SteepNatural} firma={firma} hash={hash} revision={revision}/>
    </NaturalProvider>
  )
};

export default index;