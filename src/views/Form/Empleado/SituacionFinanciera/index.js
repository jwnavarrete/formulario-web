import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import NumberFormat from "@components/ui/_NumberFormat";
import SelectOption from "@components/ui/_Select";
import Input from "@components/ui/_Input";
import { useFormContext } from "react-hook-form";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"


const index = () => {
  const { handleChangeDatosPersonales, handleChangeTipIdentificacionPrestador, formData } = useContext(EmpleadoContext)
  const [otrosIngresos, setOtrosIngresos] = useState(false)
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const { referencia_financiera } = formData

    if(referencia_financiera){
      handleChangeOtrosIngresos(referencia_financiera.otro_ingreso)
    }

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

  const handleChangeOtrosIngresos = (valor) => {
    setOtrosIngresos(false)
    if (valor == 'S'){
      setOtrosIngresos(true)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Situaci&oacute;n financiera</h3>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="ingreso_mensual" inputProps={{ maxLength: 23}} label="Ingreso mensual" fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="activos" label="Total de activos" inputProps={{ maxLength: 23}} onChange={handleChangeFinanciera("activos")} fullWidth />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="pasivos" label="Total de pasivos" inputProps={{ maxLength: 23}} onChange={handleChangeFinanciera("pasivos")} fullWidth />

      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="patrimonio" label="Total de Patrimonio" fullWidth disabled={true} />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="otro_ingreso"
          label="Tiene otros ingresos"
          onChange={(e) => handleChangeOtrosIngresos(e.target.value)}
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      {otrosIngresos && <>
        <Grid item xs={12} md={6} lg={3}>
          <Input name="fuente_ingreso" label="Fuente de ingresos" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <NumberFormat name="total_otros_ingresos" inputProps={{ maxLength: 23}} label="Total de otros ingresos" fullWidth />
        </Grid>
      </>}
    </>
  );
};

export default index;
