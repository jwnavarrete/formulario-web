import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
// Controles nuevos para las validaciones
import NumberFormat from "@components/ui/_NumberFormat";
import { useFormContext } from "react-hook-form";

const index = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    
  }, []);

  const replaceCurrencySymbol = (value) => {
    if (value) {
      return value.replace(/$|,|/g, "");
    }
    return value;
  };

  const handleChangeFinanciera = (prop) => (event) => {
    setValue(prop, replaceCurrencySymbol(event.target.value));
    const activos = getValues("activos");
    const pasivos = getValues("pasivos");
    let patrimonio = activos - pasivos;
    setValue("patrimonio", replaceCurrencySymbol(patrimonio.toFixed(2)));
  };

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Situaci&oacute;n financiera</h3>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="activos" label="Total de activos" onChange={handleChangeFinanciera("activos")} inputProps={{ maxLength: 23}} fullWidth />

      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="pasivos" label="Total de pasivos" onChange={handleChangeFinanciera("pasivos")} inputProps={{ maxLength: 23}} fullWidth />

      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="patrimonio" label="Patrimonio" fullWidth  disabled={true}/>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="total_ingresos" inputProps={{ maxLength: 23}} label="Total de ingresos USD" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="total_egresos" inputProps={{ maxLength: 23}} label="Total de egresos USD" fullWidth />
      </Grid>
    </>
  );
};

export default index;
