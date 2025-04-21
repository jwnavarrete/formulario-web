import React, { useState, useEffect } from 'react'

import styled from '@emotion/styled'

// api
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'

import { operadores } from '@utils/operadores.js'
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import {
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
// icons
import { FaSave } from 'react-icons/fa'
import { AiOutlineCheck, AiOutlineClear } from 'react-icons/ai'
import { SET_FORMULA } from '@store/actions'
import { display } from '@mui/system'

const index = props => {
  const dispatch = useDispatch()
  //
  const handleChangeFormulaRedux = formula => {
    dispatch({ type: SET_FORMULA, formula: formula })
  }

  const axiosPrivate = useAxiosPrivate()

  const formulaDefault = {
    id: '',
    rubro: '',
    formula: '',
    resultado: ''
  }
  const [formula, setFormula] = useState(formulaDefault)
  const [rubros, setRubros] = useState([])
  const [hizoClickCalcular, setHizoClickCalcular] = useState(false)

  const SetearValorFormula = objFormula => {
    setFormula(objFormula)
    handleChangeFormulaRedux(objFormula.formula)
  }

  useEffect(() => {
    let copiedFormula = { ...formula }

    copiedFormula.id = props?.id
    copiedFormula.formula = props?.valor

    SetearValorFormula(copiedFormula)

    const cargarRubros = async () => {
      const { data } = await axiosPrivate.get(
        `/formula_det/${copiedFormula.id}`
      )
      setRubros(data)
    }

    cargarRubros()
  }, [])

  const handleChangeRubro = e => {
    crear_formula(e.target.value)
  }

  const handleClickFormula = e => {
    crear_formula(e.target.value)
  }

  const crear_formula = valor => {
    let copiedFormula = { ...formula }
    copiedFormula.formula =
      copiedFormula?.formula === ''
        ? valor
        : `${copiedFormula.formula} ${valor}`
    copiedFormula.resultado = ''

    handleChangeFormulaRedux(copiedFormula.formula)
    SetearValorFormula(copiedFormula)
  }

  const convertir_formula = async valor => {
    const arr = valor.split(' ')
    let newFormula = valor

    const { data } = await axiosPrivate.get(`/formula_det/${formula.id}`)

    data.map(item => {
      arr.map(item2 => {
        if (item?.rubro?.codigo === item2) {
          newFormula = newFormula.replace(item2, parseFloat(item?.valor))
        }
      })
    })

    return newFormula
  }

  const handleClickCalcular = () => {
    let copiedFormula = { ...formula }

    const calcular = async () => {
      const resultado = await convertir_formula(copiedFormula.formula)
      copiedFormula.resultado = eval(resultado)

      SetearValorFormula(copiedFormula)
      setHizoClickCalcular(true)
    }

    calcular()
  }

  const handleClickClear = () => {
    let copiedFormula = { ...formula }
    copiedFormula.formula = ''

    SetearValorFormula(copiedFormula)
  }

  const handleClickAceptar = () => {
    props.handleClickAceptarFormula()
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6}>
            <TextField
              id='outlined-basic'
              label='ID'
              variant='outlined'
              size='small'
              disabled
              value={formula.id}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label' size='small'>
                Rubro
              </InputLabel>
              <Select
                id='outlined-basic'
                label='Rubro'
                variant='outlined'
                size='small'
                value={formula.rubro}
                onChange={e => handleChangeRubro(e)}
                required
              >
                {rubros.map(item => {
                  return (
                    <MenuItem key={item?.rubro?.id} value={item?.rubro?.codigo}>
                      {item?.rubro?.codigo} - {item?.rubro?.nombre}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <p>Operadores</p>
            <Box>
              <ButtonGroup
                size='small'
                variant='outlined'
                aria-label='outlined primary button group'
                type=''
                style={{ margin: 2 }}
              >
                {operadores.map(item => {
                  return (
                    <div key={item.id} style={{ padding: 2 }}>
                      <Button
                        value={item.signo}
                        onClick={e => handleClickFormula(e)}
                      >
                        {item.signo}
                      </Button>
                    </div>
                  )
                })}
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <input
              value={formula.formula}
              style={{ width: '100%', height: '150px' }}
              disabled
              required
            />
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Button onClick={handleClickCalcular}>Calcular</Button>
            <input
              style={{ width: '250px', height: '30px' }}
              disabled
              value={formula.resultado}
              placeholder='Resultado'
            />
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={e => handleClickClear(e)}
            >
              <AiOutlineClear />
            </Button>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Button
              variant='contained'
              color='success'
              value={formula.formula}
              onClick={handleClickAceptar}
              disabled={!hizoClickCalcular}
            >
              <AiOutlineCheck />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default index
