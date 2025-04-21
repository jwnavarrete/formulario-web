import React from "react";
import Container from '@mui/material/Container';
import ClienteProvider from "@context/ClienteAPPContext";
import { ClienteAPPContext } from "@context/ClienteAPPContext"
import AdmPanel from "./Panel";

const index = () => {
  return (
    <ClienteProvider>
      <Container fixed maxWidth="xl">
        <AdmPanel contexto={ClienteAPPContext} tipo="Cliente"/>
      </Container>
    </ClienteProvider>
  );
};
export default index;
