import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validationSchema } from "@utils/Validator/Usuario"
// CONTEXT
import UsuarioProvider from "@context/UsuarioContext"
// COMPONENTES
import Formulario from "./Form"
import TableData from "./Table"

const index = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })

  return (
    <>
      <FormProvider {...methods}>
        <UsuarioProvider>
          <Formulario />
          <TableData />
        </UsuarioProvider>
      </FormProvider>
    </>
  )
}

export default index
