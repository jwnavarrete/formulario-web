import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validationSchema } from "@utils/Validator/Perfil"
// CONTEXT
import PerfilProvider from "@context/PerfilContext"
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
        <PerfilProvider>
          <Formulario />

          <TableData />
        </PerfilProvider>
      </FormProvider>
    </>
  )
}

export default index
