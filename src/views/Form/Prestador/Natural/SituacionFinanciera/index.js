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
        <NumberFormat name="activos" label="Total de activos" inputProps={{ maxLength: 23}} onChange={handleChangeFinanciera("activos")} fullWidth />

      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="pasivos" label="Total de pasivos" inputProps={{ maxLength: 23}} onChange={handleChangeFinanciera("pasivos")} fullWidth />

      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="patrimonio" label="Patrimonio" inputProps={{ maxLength: 23}} fullWidth  disabled={true}/>
      </Grid>
    </>
  );
};

export default index;
