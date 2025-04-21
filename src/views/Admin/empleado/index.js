import React from "react";
import Container from '@mui/material/Container';
import PrestadorProvider from "@context/EmpleadoAPPContext";
import { EmpleadoAPPContext } from "@context/EmpleadoAPPContext"
import AdmPanel from "./Panel";

const index = () => {
  return (
    <PrestadorProvider>
      <Container fixed maxWidth="xl">
        <AdmPanel contexto={EmpleadoAPPContext} tipo="Empleado"/>
      </Container>
    </PrestadorProvider>
  );
};
export default index;
