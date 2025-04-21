import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
// FORMULARIO ACTIONS REDUX
import { setPeep } from '@modules/Beneficiario/reducer/Natural/actions'
// Controles nuevos para las validaciones
import SelectOption from '@components/ui/_Select'
import { NaturalContext } from '@modules/Beneficiario/context/NaturalContext'

const index = () => {
  const { handleChangePeps } = useContext(NaturalContext)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Personas Expuestas Pol&iacute;ticamente</h3>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <p>
            <small>
              &iquest;Usted o sus familiares (c&oacute;nyuge, padres, hijos,
              abuelos, suegros, hijos del c&oacute;nyuge) o colaboradores
              cercanos desempe&ntilde;an o han desempe&ntilde;ado funciones
              p&uacute;blicas de alto grado en el &uacute;ltimo a&ntilde;o?
            </small>
          </p>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="seleccionar_pep"
          label="Seleccionar"
          onChange={(e) => handleChangePeps(e.target.value)}
          fullWidth
        >
          <MenuItem value={'S'}>Si</MenuItem>
          <MenuItem value={'N'}>No</MenuItem>
        </SelectOption>
      </Grid>
    </>
  )
}

export default index
