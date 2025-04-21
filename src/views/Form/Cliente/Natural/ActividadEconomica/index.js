import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
// 
import { NaturalContext } from "@context/Cliente/NaturalContext"
// 
import {
  setActiveStepForm,
  handleNext,
  setCompleted,
  setOtrosIngresosInfo,
} from "@reducers/Cliente/formularioNatural/actions";
// 
const index = () => {
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoSector, setCatalogoSector] = useState([]);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);
  // 
  const dispatch = useDispatch();
  const { formData,handleDependInput ,getDisableByName} = useContext(NaturalContext)

  const formMethods = useFormContext();
  const {
    getValues,
    setValue,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    const { actividad } = formData
    
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("sector", setCatalogoSector);
    if(actividad?.sector){
      getCatalogo(`actividadeco/${actividad.sector}`, setCatalogoActividadEco);
      setValue('actividad_econonica');
    }
    if(actividad?.actividad_econonica){
      setValue('actividad_econonica',actividad.actividad_econonica);
    }
    //getCatalogo(`actividadeco/`, setCatalogoActividadEco);
    //
    procesaAcciones(actividad)
  }, []);

  const handleChangeSector = (value) => {
   
    // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    setValue('actividad_econonica','')
    if(value){
      setValue('actividad_econonica', '');
      getCatalogo(`actividadeco/${value}`, setCatalogoActividadEco);
   
    }
  };

  const handleChangeOcupacion = (value) => {
    handleDependInput(
      value,
      '0034',
      ['especifique'],
      formMethods
  )
  };

  const procesaAcciones = (data) => {
    if (data) {
      const { ocupacion, sector, otro_ingreso } = data;

      // const oupacion = getValues("ocupacion");
      setValue('ocupacion', ocupacion);
      handleChangeOcupacion(ocupacion);

      // const sector = getValues("sector");
      setValue('sector', sector);
      handleChangeSector(sector);
      
      if (otro_ingreso == "S") {
        dispatch(setOtrosIngresosInfo(true));
      } else {
        dispatch(setOtrosIngresosInfo(false));
      }
    } else {
      // SI NO ENCUENTRA INFORMACION OCULTA LA ACTIVIDAD ECONOMICA
      dispatch(setOtrosIngresosInfo(false));
    }
  }
 
  return (
    <>
      <Grid item xs={12}>
        <h3>Datos actividad econ&oacute;mica</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="ocupacion"
          label="Ocupaci&oacute;n"
          onChange={(e) => handleChangeOcupacion(e.target.value)}
        >
          <MenuItem value={"0059"}>Empleado p&uacute;blico</MenuItem>
          <MenuItem value={"0094"}>Empleado privado</MenuItem>
          <MenuItem value={"0054"}>Negocio propio</MenuItem>
          <MenuItem value={"0100"}>Jubilado</MenuItem>
          <MenuItem value={"0106"}>Estudiante</MenuItem>
          <MenuItem value={"0020"}>Tareas dom&eacute;sticas</MenuItem>
          <MenuItem value={"0034"}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="especifique"
          label="Especifique"
          fullWidth
          disabled={getDisableByName('especifique')}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Input
          name="razon_social"
          label="Nombre o raz&oacute;n social del lugar del trabajo"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="sector"
          label="Sector"
          onChange={(e) => handleChangeSector(e.target.value)}
        >
          {catalogoSector.map(({ id, descripcion }) => (
            <MenuItem key={id} value={id}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <SelectOption
          name="actividad_econonica"
          label="Actividad econ&oacute;mica"
        >
          {catalogoActividadEco.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <Input name="cargo" label="Cargo que desempe&ntilde;a" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Input
          name="direccion_trabajo"
          label="Direcci&oacute;n del trabajo"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="pais_trabajo" label="Pa&iacute;s de trabajo">
          {catalogoPais.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="ciudad_trabajo" label="Ciudad de trabajo" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input name="email_personal" label="E-mail personal" fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_trabajo"
          label="Tel&eacute;fono de trabajo"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
    </>
  );
};

export default index;