import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import Typography from "@mui/material/Typography";
//
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
// 
const initialState = {
  pregunta1: true,
  pregunta2: true,
  pregunta3: true,
  pregunta4: true,
  pregunta5: true,
  pregunta6: true,
  pregunta7: true,
  pregunta8: true,
  pregunta9: true,
}

const index = () => {
  const [disablePregunta, setDisabledPregunta] = useState(initialState)
  const { prestador, formData } = useContext(JuridicoContext)
  const [loading, setLoading] = useState(true)

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const { cuestionario } = formData
    if (cuestionario) {
      loadChangePreguntas(cuestionario)
    }
    setValue('esProveedor', prestador.esProveedor);
    setDefaultCuestionario();
    setLoading(false)
  }, []);

  const setDefaultCuestionario = () =>
  {
    if (formData.info_prestador.tipo_prestador == '01'){
      setValue('pregunta1','NA')
      setValue('pregunta2','NA')
      setValue('pregunta3','NA')
      setValue('pregunta4','NA')
      setValue('pregunta5','NA')
      setValue('pregunta6','NA')
      setValue('pregunta7','NA')
      setValue('pregunta8','NA')
      setValue('pregunta9','NA')

    }
      
  }


  const loadChangePreguntas = (cuestionario) => {
    setDisabledPregunta({
      pregunta1: _checkIfDisable(cuestionario.pregunta1),
      pregunta2: _checkIfDisable(cuestionario.pregunta2),
      pregunta3: _checkIfDisable(cuestionario.pregunta3),
      pregunta4: _checkIfDisable(cuestionario.pregunta4),
      pregunta5: _checkIfDisable(cuestionario.pregunta5),
      pregunta6: _checkIfDisable(cuestionario.pregunta6),
      pregunta7: _checkIfDisable(cuestionario.pregunta7),
      pregunta8: _checkIfDisable(cuestionario.pregunta8),
      pregunta9: _checkIfDisable(cuestionario.pregunta9),
    })
  }

  const handleChangePregunta = (pregunta) => (event) => {
    changeStatusPreguntaById(pregunta, event.target.value)
  }

  const _checkIfDisable = (valor) => {
    return (valor == 'NO' || valor == 'NA') ? false : true
  }

  const changeStatusPreguntaById = (codigo, valor) => {
    const nomPregunta = `pregunta${codigo}`
    const disabled = _checkIfDisable(valor)
    // 
    if (disabled) {
      setValue(`respuesta${codigo}`, '')
    }
    setDisabledPregunta({ ...disablePregunta, [nomPregunta]: disabled })
  }

  if (loading) {
    return "Cargando cuestionario"
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Favor responda el siguiente Cuestionario (excepto para proveedores)</h3>
      </Grid>

      {/* ---------PREGUNTA 1----------- */}
      <Grid item xs={12}>
        <h5>a) ¿Dispone de procedimientos o controles para prevenir el lavado de activos que incluya:</h5>
      </Grid>

      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          Pol&iacute;ticas y procedimientos para la aceptaci&oacute;n y verificaci&oacute;n de clientes
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta1"
          label=""
          onChange={handleChangePregunta(1)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta1" label="" fullWidth disabled={disablePregunta.pregunta1} />
      </Grid>

      {/* ----------PREGUNTA 2---------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          Procedimientos para la conservaci&oacute;n de registros de clientes
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta2"
          label=""
          onChange={handleChangePregunta(2)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta2" label="" fullWidth disabled={disablePregunta.pregunta2} />
      </Grid>

      {/* ---------PREGUNTA 3----------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          ¿Procesos para la validaci&oacute;n de datos del cliente, contra listas de observados y durante la relaci&oacute;n comercial?
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta3"
          label=""
          onChange={handleChangePregunta(3)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta3" label="" fullWidth disabled={disablePregunta.pregunta3} />
      </Grid>

      {/* ---------PREGUNTA 4----------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          ¿Procesos para la validaci&oacute;n de datos del cliente, para detectar transacciones inusuales?
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta4"
          label=""
          onChange={handleChangePregunta(4)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta4" label="" fullWidth disabled={disablePregunta.pregunta4} />
      </Grid>

      {/* ---------PREGUNTA 5----------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          ¿Procesos para la validaci&oacute;n de datos del cliente, para detectar transacciones inusuales?
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta5"
          label=""
          onChange={handleChangePregunta(5)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta5" label="" fullWidth disabled={disablePregunta.pregunta5} />
      </Grid>

      {/* ---------PREGUNTA 6----------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          Su instituci&oacute;n cuenta con un c&oacute;digo de &Eacute;tica
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta6"
          label=""
          onChange={handleChangePregunta(6)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta6" label="" fullWidth disabled={disablePregunta.pregunta6} />
      </Grid>

      {/* ---------PREGUNTA 7----------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Typography align="justify">
          Procedimientos para relacionarse con PEP'S (personas expuestas politicamente)
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta7"
          label=""
          onChange={handleChangePregunta(7)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta7" label="" fullWidth disabled={disablePregunta.pregunta7} />
      </Grid>

      {/* ---------PREGUNTA 8----------- */}
      <Grid item xs={12}>
        <h5>b) ¿Ud. esta registrado por leyes/normales legales para prevenir el lavado de activos?</h5>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta8"
          label=""
          onChange={handleChangePregunta(8)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta8" label="" fullWidth disabled={disablePregunta.pregunta8} />
      </Grid>

      {/* ---------PREGUNTA 9----------- */}
      <Grid item xs={12}>
        <h5>c) ¿Ha sido objeto de investigaci&oacute;n o sanciones por no aplicar medidas de prevenci&oacute;n de lavado de activos?</h5>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <SelectOption
          name="pregunta9"
          label=""
          onChange={handleChangePregunta(9)}
        >
          <MenuItem value={"SI"}>SI</MenuItem>
          <MenuItem value={"NO"}>NO</MenuItem>
          <MenuItem value={"NA"}>N/A</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Input name="respuesta9" label="" fullWidth disabled={disablePregunta.pregunta9} />
      </Grid>
    </>
  );
};

export default index;
