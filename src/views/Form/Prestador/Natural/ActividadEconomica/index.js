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
import { NaturalContext } from "@context/Prestador/NaturalContext"
// 
import {
  setOtrosIngresosInfo,
} from "@reducers/Prestador/formularioNatural/actions";
// 
const index = () => {

  const initialNomLabel = { razon: "Nombre o razón social del lugar del trabajo", cargo: "Cargo que desempeña", pais: "País de trabajo" }

  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);
  const [especifiqueOcupacion, setEspecifiqueOcupacion] = useState(false);
  const [nombreLabel, setNombreLabel] = useState(initialNomLabel);
  const [displayCampo, setDisplayCampos] = useState(true);
  //
  const dispatch = useDispatch();
  const { formData, disabledOcupacion, setDisabledOcupacion } = useContext(NaturalContext)

  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const { actividad } = formData

    getCatalogo("pais", setCatalogoPais);
    // getCatalogo("sector", setCatalogoSector);
    getCatalogo(`actividadeco/`, setCatalogoActividadEco);
    //
    procesaAcciones(actividad)
  }, []);

  const handleChangeOcupacion = (value) => {
    setEspecifiqueOcupacion(false);
    setDisabledOcupacion(false)
    setNombreLabel(initialNomLabel)


    if (value == "0034") {
      setEspecifiqueOcupacion(true);
    } else {
      setValue("especifique", "");
    }

    // AQUI SETEAMOS DISABLED LOS CAMPOS QUE SON JUBILADO O ESTUDIANTE
    // JUBILADO, ESTUDIANTE
    setDisplayCampos(true)
    if (value == "0100" || value == "0106") {
      setDisabledOcupacion(true)
      if (value == "0100") {
        setNombreLabel({ razon: "Nombre o razón social del trabajo jubilado", cargo: "Cargo desempeñado", pais: "País de jubilación" })
      }
      if (value == "0106") {
        setDisplayCampos(false)
        setNombreLabel({ razon: "Nombre o razón social del lugar de estudios", cargo: "Carrera", pais: "País de estudio" })
      }
    }
  };

  const procesaAcciones = (data) => {
    if (data) {
      const oupacion = getValues("ocupacion");
      handleChangeOcupacion(oupacion);

      const otro_ingreso = getValues("otro_ingreso");
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

      {!disabledOcupacion &&
        <Grid item xs={12} md={6} lg={3}>
          <Input
            name="especifique"
            label="Especifique"
            fullWidth
            disabled={!especifiqueOcupacion ? true : false}
          />
        </Grid>
      }

      <Grid item xs={12} md={12} lg={6}>
        <Input
          name="razon_social"
          label={nombreLabel.razon}
          fullWidth
        />
      </Grid>

      {!disabledOcupacion &&
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
      }

      {displayCampo &&
        <Grid item xs={12} md={12} lg={6}>
          <Input name="cargo" label={nombreLabel.cargo} fullWidth />
        </Grid>
      }

      {!disabledOcupacion &&
        <Grid item xs={12}>
          <Input
            name="direccion_trabajo"
            label="Direcci&oacute;n del trabajo"
            fullWidth
          />
        </Grid>
      }
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption name="pais_trabajo" label={nombreLabel.pais}>
          {catalogoPais.map(({ codigo, descripcion }) => (
            <MenuItem key={codigo} value={codigo}>
              {descripcion}
            </MenuItem>
          ))}
        </SelectOption>
      </Grid>

      {!disabledOcupacion &&
        <Grid item xs={12} md={6} lg={3}>
          <Input name="ciudad_trabajo" label="Ciudad de trabajo" fullWidth />
        </Grid>
      }

      {!disabledOcupacion &&
        <Grid item xs={12} md={6} lg={3}>
          <Input
            name="telefono_trabajo"
            label="Tel&eacute;fono de trabajo"
            inputProps={{ maxLength: 13 }}
            fullWidth
          />
        </Grid>
      }
    </>
  );
};

export default index;