import React from "react";
import Container from '@mui/material/Container';
import PrestadorProvider from "@context/PrestadorAPPContext";
import { PrestadorAPPContext } from "@context/PrestadorAPPContext"
import AdmPanel from "./Panel";

const index = () => {
  return (
    <PrestadorProvider>
      <Container fixed maxWidth="xl">
        <AdmPanel contexto={PrestadorAPPContext} tipo="Prestador"/>
      </Container>
    </PrestadorProvider>
  );
};
export default index;
