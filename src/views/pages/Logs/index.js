import React, { useEffect, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Logs";
// CONTEXT
import LogsProvider from "@context/LogsContext";
// COMPONENTES
import Search from "./Search";
import TableData from "./Table";

const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <FormProvider {...methods}>
      <LogsProvider>
        <Search />

        <TableData />
      </LogsProvider>
    </FormProvider>
  );
};
export default index;