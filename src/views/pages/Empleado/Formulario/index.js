import React from "react";
import { SteepForm } from "../Steeps";
import FrmEmpleado from "./Form";
import EmpleadoProvider from "@context/Empleado/EmpleadoContext"

// FORMULARIO ACTIONS REDUX
const index = ({firma, hash, revision}) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <EmpleadoProvider>
      <FrmEmpleado steeps={SteepForm} firma={firma} hash={hash} revision={revision}/>
    </EmpleadoProvider>
  )
};

export default index;