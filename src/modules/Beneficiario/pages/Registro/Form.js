import React from 'react'
// MATERIAL COMPONENTS
import Box from '@mui/material/Box'
// COMPONENTS
import ModalForm from './Modal'
import ShowSteeps from '@utils/Steep'
import NaturalProvider from '@modules/Beneficiario/context/NaturalContext'

const steeper = ({ steeps }) => {
  return (
    <Box>
      <NaturalProvider>
        {/* MOSTRAMOS LOS PASOS DEL FORMULARIO NATURAL PERO EL MODAL VISIBLE */}
        <ShowSteeps steeps={steeps} />

        {/* MODAL VISIBLE */}
        <ModalForm />
      </NaturalProvider>
    </Box>
  )
}

export default steeper
