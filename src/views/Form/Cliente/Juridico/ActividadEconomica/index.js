import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
// 
import {
  setActiveStepForm,
  handleNext,
  setCompleted,
  setOtrosIngresosInfo,
} from "@reducers/Cliente/formularioNatural/actions";
// 
const index = () => {
  const { identificacion, activeStep, completed } = useSelector((state) => state.formNatural);
  
  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoSector, setCatalogoSector] = useState([]);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);
  const [especifiqueOcupacion, setEspecifiqueOcupacion] = useState(false);
  //
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const {
    reset,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("sector", setCatalogoSector);
    getCatalogo(`actividadeco/`, setCatalogoActividadEco);
    //
    // apiLoadData(identificacion);
  }, []);

  const handleChangeSector = (value) => {
    // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    if(value){
      getCatalogo(`actividadeco/${value}`, setCatalogoActividadEco);
    }
  };

  const handleChangeOcupacion = (value) => {
    setEspecifiqueOcupacion(false);
    if (value == "O") {
      setEspecifiqueOcupacion(true);
    } else {
      setValue("especifique", "");
    }
  };

  const apiLoadData = async (identificacion) => {
    try {
      // CONSUMIMOS EL API QUE LLENA LA INFORMACION DEL SOLICITANTE
      const { data } = await axiosPrivate.get(
        `cliente-natural/actividad/${identificacion}`
      );
      //
      if (data) {
        reset();
        //
        completed[activeStep] = true;
        dispatch(setCompleted(completed));

        Object.keys(data).map(function (name, index) {
          var value = data[name];
          if (value !== undefined && value !== null) {
            setValue(name, value);
          }
        });

        const oupacion = getValues("ocupacion");
        handleChangeOcupacion(oupacion);

        const sector = getValues("sector");
        handleChangeSector(sector);

        const otro_ingreso = getValues("otro_ingreso");
        // setDetalleIngresoMensual(true);
        if (otro_ingreso == "S") {
          dispatch(setOtrosIngresosInfo(false));
        } else {
          dispatch(setOtrosIngresosInfo(true));
        }


      }else{
        // SI NO ENCUENTRA INFORMACION OCULTA LA ACTIVIDAD ECONOMICA
        dispatch(setOtrosIngresosInfo(true));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {/* {identificacion} */}
      <Grid item xs={12}>
        <h3>Datos actividad econ&oacute;mica</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="ocupacion"
          label="Ocupaci&oacute;n"
          onChange={(e) => handleChangeOcupacion(e.target.value)}
        >
          <MenuItem value={"E"}>Empleado p&uacute;blico</MenuItem>
          <MenuItem value={"EP"}>Empleado privado</MenuItem>
          <MenuItem value={"N"}>Negocio propio</MenuItem>
          <MenuItem value={"J"}>Jubilado</MenuItem>
          <MenuItem value={"ES"}>Estudiante</MenuItem>
          <MenuItem value={"T"}>Tareas dom&eacute;sticas</MenuItem>
          <MenuItem value={"O"}>Otros</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="especifique"
          label="Especifique"
          fullWidth
          disabled={!especifiqueOcupacion ? true : false}
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
