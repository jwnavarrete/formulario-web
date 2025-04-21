import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import NumberFormat from "@components/ui/_NumberFormat";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
// 
const index = () => {
  const { infFinanciera, handleChangeOtrosIngresos } = useContext(JuridicoContext)

  const [catalogoPais, setCatalogoPais] = useState([]);
  const [catalogoSector, setCatalogoSector] = useState([]);
  const [catalogoActividadEco, setCatalogoActividadEco] = useState([]);

  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getCatalogo("pais", setCatalogoPais);
    getCatalogo("sector", setCatalogoSector);
    getCatalogo("actividadeco", setCatalogoActividadEco);
  }, []);

  const handleChangeSector = (value) => {
    // GENERAMOS ACCIONES DEPENDIENDO LAS LISTAS A SELECCIONAR
    if(value){
      getCatalogo(`actividadeco/${value}`, setCatalogoActividadEco);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <>
          <h3>Informaci&oacute;n financiera </h3>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <p>
            <small>
              Detalle de ingresos mensuales de la actividad declarada
            </small>
          </p>
        </>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat
          name="ingreso_mensuales"
          label="Ingresos mensuales USD"
          inputProps={{ maxLength: 23}}
          fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="otro_ingreso"
          label="Tiene otros ingresos diferentes"
          onChange={(e) => handleChangeOtrosIngresos(e.target.value)}
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      {!infFinanciera.otrosIngresos && (
        <>
          <Grid item xs={12}>
            <p>
              <small>
                Detalle de ingresos mensuales de la actividad declarada
              </small>
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <NumberFormat name="otros_info" label="Detalle de ingresos mensuales" inputProps={{ maxLength: 23}} fullWidth />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="fuente_ingreso_info"
              label="Fuente otros ingresos"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOption
              name="sector_uno_info"
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
          <Grid item xs={12} md={6} lg={3}>
            <SelectOption name="actividad_info" label="Actividad">
              {catalogoActividadEco.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                  {descripcion}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="cargo_desepena_info"
              label="Cargo que desempe&ntilde;a"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            <Input
              name="nombre_razonsocial_info"
              label="Nombre o raz&oacute;n social de lugar de trabajo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SelectOption
              name="pais_trabajo_info"
              label="Pa&iacute;s de trabajo"
            >
              {catalogoPais.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                  {descripcion}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="ciudad_trabajo_info"
              label="Ciudad de trabajo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Input
              name="direccion_trabajo_info"
              label="Direccion de trabajo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Input
              name="email_personal_info"
              label="E-mail personal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="telefono_domicilio_info"
              label="Tel&eacute;fono de trabajo"
              inputProps={{ maxLength: 13 }}
              fullWidth
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default index;
