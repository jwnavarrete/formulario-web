import React from "react";
import { SteepForm } from "./Steeps";
import FrmEmpleado from "./Formulario/Form";
import EmpleadoProvider from "@context/Empleado/EmpleadoContext"

// FORMULARIO ACTIONS REDUX
const index = () => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <EmpleadoProvider>
      <FrmEmpleado steeps={SteepForm} />
    </EmpleadoProvider>
  )
};

export default index;