import React, { useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Menu";
// CONTEXT
import MenuProvider from "@context/MenuContext";
// COMPONENTES
import Formulario from "./Form";
import TableData from "./Table";

const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <FormProvider {...methods}>
        <MenuProvider>
          <Formulario />

          <TableData />
        </MenuProvider>
      </FormProvider>
    </>
  )
}

export default index
