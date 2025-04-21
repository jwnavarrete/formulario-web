import * as React from 'react';
// // COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
// // Controles nuevos para las validaciones
import SelectOption from '@components/ui/_Select';

function index() {
  return (
    <>
      <Grid item xs={12}>
        <h3>Conocimientos Varios</h3>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_excel" label="Excel">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_word" label="Word">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_powerpoint" label="Power Point">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_outlook" label="Outlook">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_project" label="Project">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="nivel_visio" label="Visio">
          <MenuItem value={'B'}>Básico</MenuItem>
          <MenuItem value={'I'}>Intermedio</MenuItem>
          <MenuItem value={'A'}>Avanzado</MenuItem>
          <MenuItem value={'N'}>No aplica</MenuItem>
        </SelectOption>
      </Grid>
    </>
  );
}

export default index;