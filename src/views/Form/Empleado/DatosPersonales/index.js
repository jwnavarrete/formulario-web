import React, { useState, useEffect, useContext } from "react";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
import {calcularEdad} from "@utils/Api/utils.js"
//
const index = () => {
    const [today, setToday] = useState();
    const [loading, setLoading] = useState(true);
    const [disableIdentificacion, setDisableIdentificacion] = useState(false)
    const { handleChangeDatosPersonales, handleChangeTipIdentificacionPrestador, formData } = useContext(EmpleadoContext)
    const [otroGen,setOtroGen] = useState(true);

    const {
        register,
        reset,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        const { datos_personales } = formData

        // DESACTIVAMOS LOS CAMPOS QUE VIENEN POR DEFINICION
        setDisableIdentificacion(true)

        var todayDate = new Date().toISOString().slice(0, 10);
        setToday(todayDate);

        if (!datos_personales) {
            clearData();
            setInitialData()
        }
        
        setLoading(false)
    }, []);

    useEffect(()=>{

        if(getValues('sexo')=='O'){
          setOtroGen(true)
        }else{
          setOtroGen(false)
          setValue('otro_genero','',{ shouldValidate: false })
        }
    
      },[watch('sexo')])
 

    const clearData = () => {
        reset();
    }

    const handleChangeFecNacimiento = event => {
        const edad = calcularEdad(event.target.value)
        if(edad > 0 && edad < 150 && !isNaN(edad) && event.target.value){
            setValue("edad",edad)
          }else{
            setValue("edad",'')
            setValue("fech_nacimiento",'')
          }
    }

    const setInitialData = () => {
        const { formulario } = formData
        if (formulario) {
            setValue("tipo_identificacion", formulario.tip_identificacion);
            setValue("num_identificacion", formulario.identificacion);
            setValue("email", formulario.correo_empleado);
            setValue("email_recibir", formulario.correo_empleado);
        }
    }

    if (loading) {
        return "Cargando datos, seccion datos personales"
    }

    return (
        <>
            <Grid item xs={12}>
                <h3>Datos personales</h3>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Box sx={{ minWidth: 120 }}>
                    <SelectOption
                        name="tipo_identificacion"
                        label="Tipo de identificaci&oacute;n"
                        onChange={(e) => handleChangeTipIdentificacionPrestador(e.target.value)}
                        disabled={disableIdentificacion}
                    >
                        <MenuItem value={"C"}>C&eacute;dula</MenuItem>
                        <MenuItem value={"P"}>Pasaporte</MenuItem>
                        <MenuItem value={"U"}>Ruc</MenuItem>
                    </SelectOption>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="num_identificacion"
                    label="No.identificaci&oacute;n"
                    fullWidth
                    disabled={disableIdentificacion}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input name="nombres" label="Nombres" />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input name="apellidos" label="Apellidos" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Input name="titulo" label="T&iacute;tulo profesional" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Input name="lugar_nacimiento" label="Lugar de nacimiento" />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="fech_nacimiento"
                    label="Fecha de nacimiento"
                    type="Date"
                    fullWidth
                    onBlur={(e) => handleChangeFecNacimiento(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ max: today }}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input name="edad" label="Edad" disabled={true} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Box sx={{ minWidth: 120 }}>
                    <SelectOption name="sexo" label="Sexo">
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Femenino</MenuItem>
                    <MenuItem value={"N"}>No Especificado</MenuItem>
                    <MenuItem value={"O"}>Otro</MenuItem>
                    </SelectOption>
                </Box>
            </Grid>
            {
            otroGen &&
              <Grid item xs={12} md={6} lg={3}>
                <Input
                  name="otro_genero"
                  label="Especifique"
                  fullWidth
                />
              </Grid>
          }

            <Grid item xs={12} md={6} lg={3}>
                <Box sx={{ minWidth: 120 }}>
                    <SelectOption
                        name="est_civil"
                        label="Estado civil"
                        onChange={handleChangeDatosPersonales("est_civil")}
                    >
                        <MenuItem value="01">Soltero</MenuItem>
                        <MenuItem value="02">Casado</MenuItem>
                        <MenuItem value="05">Divorciado</MenuItem>
                        <MenuItem value="04">Unión de hecho</MenuItem>
                        <MenuItem value="03">Viudo</MenuItem>
                    </SelectOption>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input name="tipo_sangre" label="Tipo de sangre" />
            </Grid>

            <Grid item xs={12} md={6} lg={9}>
                <Input
                    name="direccion_domicilio"
                    label="Direcci&oacute;n del domicilio"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Input name="telefono_personal" inputProps={{ maxLength: 13 }} label="Tel&eacute;fono personal" />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Input name="email" label="E-mail personal" />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <Box sx={{ minWidth: 120 }}>
                    <SelectOption
                        name="tiene_vehiculo"
                        label="Posee Veh&iacute;culo"
                        onChange={handleChangeDatosPersonales("vehiculo")}
                    >
                        <MenuItem value="S">Si</MenuItem>
                        <MenuItem value="N">No</MenuItem>
                    </SelectOption>
                </Box>
            </Grid>
        </>
    );
};

export default index;
