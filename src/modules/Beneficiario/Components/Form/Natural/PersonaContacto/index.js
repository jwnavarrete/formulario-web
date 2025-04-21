import React, { useContext, useEffect } from 'react'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import { useFormContext } from 'react-hook-form'
// Controles nuevos para las validaciones
import Input from '@components/ui/_Input'
import NaturalContext from '@modules/Beneficiario/context/NaturalContext'

const index = () => {
  // const { } = useContext(NaturalContext)
  const formMethods = useFormContext()
  //
  useEffect(() => {}, [])

  return (
    <>
      <Grid item xs={12}>
        <h3>Persona de contacto</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="persona_contacto" label="Persona de contacto" />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Input name="email_contanto" label="E-mail personal" />
      </Grid>
    </>
  )
}

export default index
