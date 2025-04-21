import React, { useContext ,useEffect} from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"

const index = () => {
  const { disableTipAseguradoEspecif,handleDependInput ,getDisableByName ,formData} = useContext(JuridicoContext)
  const formMethods = useFormContext()
  const {
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(()=>{
      console.log('formData',formData)
      const {accionista} = formData
      if(accionista?.Vincul_Rel_Sol){
        handleTipoAsegurado(accionista?.Vincul_Rel_Sol)
       // setValue('otro_asegurado',accionista?.otro_asegurado)
      }
  },[])

  const handleTipoAsegurado = (value) =>{
    handleDependInput(
      value,
      'O',
      ['otro_asegurado'],
      formMethods
    )
  }

  return (
    <>
      <Grid item xs={12}>
        <h3>V&iacute;nculo entre el solicitante y asegurado</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="Vincul_Rel_Sol"
          label="Vínculo"
          onChange={(e) => handleTipoAsegurado(e.target.value)}
        >
          <MenuItem value={"C"}>Familiar</MenuItem>
          <MenuItem value={"P"}>Comercial</MenuItem>
          <MenuItem value={"L"}>Laboral</MenuItem>
          <MenuItem value={"N"}>Ninguna</MenuItem>
          <MenuItem value={"O"}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="otro_asegurado"
          label="Especifique"
          disabled={getDisableByName('otro_asegurado')}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;
