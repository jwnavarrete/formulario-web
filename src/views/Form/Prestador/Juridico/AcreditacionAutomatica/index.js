import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
// MATERIAL UI LIBRARY
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"
// FORMULARIO ACTIONS REDUX
const index = () => {
  const { referencias, disableTipoinfoadicional, handleTipoAsegurado, handleChangeAcreditacionAutomatica } = useContext(JuridicoContext)
  // 

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="h3">
            Acreditaci&oacute;n autom&aacute;tica
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography variant="small" component="p">
            <small>
              ¿Desea procesar automáticamente el pago de su factura?
            </small>
          </Typography>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="acreditacion_automatica"
          label="Acreditación automática"
          onChange={(e) => handleChangeAcreditacionAutomatica(e.target.value)}
        >
          <MenuItem value={"S"}>SI</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>

      <Grid item xs={12}></Grid>

      {referencias.acreditacionAutomatica && (
        <>
          <Grid item xs={12}>
            <small>Datos Generales</small>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="nombre"
              label="Nombre o Razón Social"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption
                name="tipo_identificacion"
                label="Tipo de identificaci&oacute;n"
              >
                <MenuItem value={"C"}>C&eacute;dula</MenuItem>
                <MenuItem value={"P"}>Pasaporte</MenuItem>
                <MenuItem value={"R"}>Ruc</MenuItem>
              </SelectOption>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="num_identificacion"
              label="No.identificaci&oacute;n"
              inputProps={{ maxLength: 13 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="representante_legal"
              label="Representante legal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="direccion"
              label="Direcci&oacute;n"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="telefono"
              label="Tel&eacute;fono"
              inputProps={{ maxLength: 13 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="mail_notificacion"
              label="Mail notificaci&oacute;n"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <small>Datos para la factura</small>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption
                name="entidad"
                label="Entidad"
              >
                <MenuItem value={"L"}>Local</MenuItem>
                <MenuItem value={"I"}>Internacional</MenuItem>
              </SelectOption>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="banco"
              label="Banco"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="tipo_cuenta"
              label="Tipo de cuenta"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="numero_cuenta"
              label="Número de cuenta"
              fullWidth
            />
          </Grid>

          
        </>
      )}
    </>
  );
};

export default index;
