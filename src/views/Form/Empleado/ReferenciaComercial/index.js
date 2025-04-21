import React, { useEffect, useContext } from "react";
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
  const { handleChangeFormacion, tieneReferenciaComercial ,formData} = useContext(EmpleadoContext)

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(()=>{
      validateRefComer()
  },[])

  useEffect(() => {
      validateRefComer();
  }, [watch('tiene_refe_comercial')]);

  const validateRefComer=()=>{
    if(getValues('tiene_refe_comercial') == "N"){
      setValue('nombre_tarjeta_comercial','')
      setValue('inst_financiera_comercial','')
      setValue('tipo_cuenta_comercial','')
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>Referencia Comercial</h3>
      </Grid>


      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="tiene_refe_comercial"
          label="Referencias Comercial"
          onChange={handleChangeFormacion("referenciaComercial")}
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      {tieneReferenciaComercial && <>
        <Grid item xs={12} md={6} lg={6}>
          <Input name="nombre_tarjeta_comercial" label="Nombre de la tarjeta" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Input name="inst_financiera_comercial" label="Instituci&oacute;n financiera" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <SelectOption
            name="tipo_cuenta_comercial"
            label="Tipo de cuenta"
          >
            <MenuItem value={"N"}>Nacional</MenuItem>
            <MenuItem value={"I"}>Internacional</MenuItem>
          </SelectOption>
        </Grid>
      </>}
    </>
  );
};

export default index;
