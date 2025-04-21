import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import NumberFormat from "@components/ui/_NumberFormat";
// FORMULARIO ACTIONS REDUX
import { getCatalogo } from "@utils/Api/Catalogo";
// 
import { NaturalContext } from "@context/Prestador/NaturalContext"
// 
const index = () => {
  const { infFinanciera } = useSelector((state) => state.formNatural);
  const [catalogoSector, setCatalogoSector] = useState([]);
  const { handleChangeOtrosIngresos, formData } = useContext(NaturalContext)


  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getCatalogo("sector", setCatalogoSector);
  }, []);


  const handleOtrosIngresos=(value) =>{
    handleChangeOtrosIngresos(value)
    if( value ==  "N"){
      setValue('otros_info',0)
      setValue('fuente_ingreso_info','')
      setValue('sector_uno_info','')
    }
  }

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
        <NumberFormat name="ingreso_mensuales" label="Ingresos mensuales USD"  inputProps={{ maxLength: 23}} fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="total_ingresos" label="Total de ingresos USD" inputProps={{ maxLength: 23}}  fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <NumberFormat name="total_egresos" label="Total de egresos USD" inputProps={{ maxLength: 23}}  fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="declara_impuesto_renta"
          label="Declara impuesto a la renta"
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="lleva_contabilidad"
          label="Lleva contabilidad"
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="otro_ingreso"
          label="Tiene otros ingresos diferentes"
          onChange={(e) => handleOtrosIngresos(e.target.value)}
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      {infFinanciera.otrosIngresos && (
        <>
          <Grid item xs={12}>
            <p>
              <small>
                Detalle de ingresos mensuales de la actividad declarada
              </small>
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <NumberFormat name="otros_info" inputProps={{ maxLength: 23}} label="Detalle de ingresos mensuales" fullWidth />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="fuente_ingreso_info"
              label="Fuente otros ingresos"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <SelectOption
              name="sector_uno_info"
              label="Sector"
              // onChange={(e) => handleChangeSector(e.target.value)}
            >
              {catalogoSector.map(({ id, descripcion }) => (
                <MenuItem key={id} value={id}>
                  {descripcion}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <SelectOption name="actividad_info" label="Actividad">
              {catalogoActividadEco.map(({ codigo, descripcion }) => (
                <MenuItem key={codigo} value={codigo}>
                  {descripcion}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid> */}
        </>
      )}
    </>
  );
};

export default index;
