import React, { useEffect, useState, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
//
const index = () => {
  const [anios, setAnios] = useState([])
  const { handleChangeFormacion, tieneReferenciaBancaria } = useContext(EmpleadoContext)

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    generaListaAnios()
    validateReferencias()
  }, []);

  useEffect(() => {
    validateReferencias();
  }, [watch('tiene_referencias')]);

  const validateReferencias = () =>{
    if(getValues('tiene_referencias') == "N"){
      setValue('tipo_cuenta','')
      setValue('institucion_financiera','')
      setValue('numero_cuenta','')
    }
  }

  const generaListaAnios = () => {
    const currentYear = new Date().getFullYear() + 1;
    const startYear = currentYear - 30;
    const years = [];
    for (let i = startYear; i <= currentYear; i++) {
      years.push({ codigo: i, descripcion: i });
    }
    setAnios(years)
  }



  return (
    <>
      <Grid item xs={12}>
        <h3>Referencias Financieras bancarias</h3>
      </Grid>
      
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tiene_referencias"
          label="Referencias Bancarias"
          onChange={handleChangeFormacion("referenciaBancaria")}
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      {tieneReferenciaBancaria && <>


        <Grid item xs={12} md={6} lg={3}>
          <SelectOption
            name="tipo_cuenta"
            label="Tipo de cuenta"
          >
            <MenuItem value={"A"}>Ahorro</MenuItem>
            <MenuItem value={"C"}>Corriente</MenuItem>
          </SelectOption>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Input name="institucion_financiera" label="Instituci&oacute;n Financiera" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Input name="numero_cuenta" label="N&uacute;mero de cuenta" />
        </Grid>
      </>}

    </>
  );
};

export default index;
