import React from 'react'
import { SteepJuridico } from '../Steeps'
import FrmClienteJuridico from './Form'
import JuridicoProvider from '@modules/Beneficiario/context/JuridicoContext'

// FORMULARIO ACTIONS REDUX
const index = ({ firma, hash, revision }) => {
  // AQUI MOSTRAMOS EL FORMULARIO DEL CLIENTE
  return (
    <JuridicoProvider>
      <FrmClienteJuridico
        steeps={SteepJuridico}
        firma={firma}
        hash={hash}
        revision={revision}
      />
    </JuridicoProvider>
  )
}

export default index
