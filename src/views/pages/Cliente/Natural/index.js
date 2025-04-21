import React from "react";
import { SteepNatural } from "../Steeps";
import FrmClienteNatural from "./Form";
import NaturalProvider from "@context/Cliente/NaturalContext"

// FORMULARIO ACTIONS REDUX
const index = ({firma, hash,revision,revisionAsesor}) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <NaturalProvider>
      <FrmClienteNatural steeps={SteepNatural} firma={firma} hash={hash} revision={revision} revisionAsesor={revisionAsesor}/>
    </NaturalProvider>
  )
};

export default index;