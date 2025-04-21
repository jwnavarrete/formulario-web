import React from "react";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/MenuPerfil";
// CONTEXT
import MenuPerfilProvider from "@context/MenuPerfilContext";

// COMPONENTES
import Formulario from "./Form";
import MenuList from './MenuList'

const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <FormProvider {...methods}>
        <MenuPerfilProvider>
          <Formulario />

          <MenuList />
        </MenuPerfilProvider>
      </FormProvider>
    </>
  )
}

export default index
