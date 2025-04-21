import React from "react";
import { SteepNatural } from "./Steeps";
import FrmClienteNatural from "./Natural/Form";
import NaturalProvider from "@context/Prestador/NaturalContext"

// FORMULARIO ACTIONS REDUX
const index = () => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <NaturalProvider>
      <FrmClienteNatural steeps={SteepNatural} />
    </NaturalProvider>
  )
};

export default index;