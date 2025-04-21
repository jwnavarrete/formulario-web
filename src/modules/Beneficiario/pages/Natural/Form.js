import React, { useState, useEffect, useContext } from 'react'
// MATERIAL COMPONENTS
import Box from '@mui/material/Box'
// COMPONENTS
import swal from 'sweetalert'
// CONTEXT
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'
import { useNavigate } from 'react-router-dom'
// import ShowSteeps from '@utils/Steep'
import ShowSteeps from '@modules/Beneficiario/Components/Steeps'

const index = ({ steeps, firma, hash, revision = 'N' }) => {
  // Context
  const {
    loadData,
    setSteeps,
    setTieneFirma,
    setRevisionInterna,
    setHash,
    setActiveStep,
    _steeps,
    setActiveStepForm,
  } = useContext(NaturalContext)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // SETEAMOS VALORES INICIALES DEL FORMULARIO
    setSteeps(steeps)
    setTieneFirma(firma === 'S' ? true : false)
    setRevisionInterna(revision === 'S' ? true : false)
    setHash(hash)

    // CONSULTAMOS Y MOSTRAMOS LOS DATOS DEL FORMULARIO, SINO EXISTE PIDE INGRESAR DATOS
    loadDataFormulario(hash)
  }, [])

  const loadDataFormulario = async (hash) => {
    await getDatosFormularioById(hash)
    setLoading(false)
  }

  // SI EL CODIGO NO EXISTE LO REDIRIGE A LA URL PARA PEDIR INFORMACION
  const getDatosFormularioById = async (hash) => {
    try {
      const formData = await loadData(hash)
      // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
      if (!formData) {
        navigate(`/${process.env.URL_BENEFICIARIOS}`)
      } else {
        const { formulario } = formData
        const { steep } = formulario
        setActiveStep(steep)
        if (steep > 0) {
          setActiveStepForm(steep)
        }
      }
    } catch (error) {
      swal({
        title: 'Formulario Online',
        text: `Error ${error}`,
        icon: 'error',
        buttons: {
          cerrar: 'Aceptar',
        },
      })
    }
  }

  if (loading) {
    return 'Cargando datos, por favor espere.'
  }

  return <Box>{_steeps && <ShowSteeps context={NaturalContext} />}</Box>
}

export default index
