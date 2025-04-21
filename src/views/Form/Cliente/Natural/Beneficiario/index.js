import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { getCatalogo } from "@utils/Api/Catalogo";
// Controles nuevos para las validaciones
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { NaturalContext } from "@context/Cliente/NaturalContext"
import {calcularEdad, getFormattedDate} from "@utils/Api/utils.js"

const index = () => {

  const { formData } = useContext(NaturalContext)
  const [catalogoNacionalidad, setCatalogoNacionalidad] = useState([]);
  const [today, setToday] = useState();
  const [disableTipBeneficiarioEspecif, setDisableTipBeneficiarioEspecif] =
    useState(true);

  const [isVisible,setIsVisible] = useState(true);
  const [nombre,setNombre] = useState('Nombres');
  const [otroGen,setOtroGen] = useState(true);
  // OBTENEMOS LAS VALIDACIONES DEL (USEFORMCONTEXT)
  const {
    reset,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    // reset();

    var todayDate = getFormattedDate();
    console.log(todayDate)

    
    setToday(todayDate);
    // 
    getCatalogo("nacionalidad", setCatalogoNacionalidad);
    
    const{solicitante} = formData;
    if(solicitante){
      validateTipoBenef(solicitante?.beneficiario_bene)
    }
    
  }, []);

  const handleTipoBeneficiario = (prop) => (event) => {
    validateTipoBenef(event.target.value );
  };

  const validateTipoBenef =(valor) =>{
    if (valor == "O") {
      setDisableTipBeneficiarioEspecif(false);
    } else {
      setDisableTipBeneficiarioEspecif(true);
      setValue('otro_asegurado_bene','')
    }
  }

  const handleTipoId=(value) =>{

    if(value == "R"){
      setIsVisible(false)
      setNombre('Nombres / Razón social')
    }else{
      setIsVisible(true)
      setNombre('Nombres')
    }
  }

  useEffect(()=>{

    handleTipoId(getValues('tipo_identificacion_bene'))

  },[watch('tipo_identificacion_bene')])

  useEffect(()=>{

    if(getValues('sexo_bene')=='O'){
      setOtroGen(true)
    }else{
      setOtroGen(false)
      setValue('otro_genero_bene','',{ shouldValidate: false })
    }

  },[watch('sexo_bene')])


  useEffect(()=>{
    if(getValues('sexo_bene') !='O' &&  getValues('sexo_bene')!='N'){
      setValue('sexo_bene','')
    }
  },[])

  const handleChangeFecha = (value) =>{
    const edad = calcularEdad(value)
    if(edad < 150 && !isNaN(edad) && value){
      
    }else{
      setValue("fech_nacimiento_bene",'')
    }
  }
  


  return (
    <>
      <Grid item xs={12}>
        <h3>V&iacute;nculo entre el solicitante y beneficiario:</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="beneficiario_bene"
            label="V&iacute;nculo"
            onChange={handleTipoBeneficiario()}
          >
            <MenuItem value={"C"}>Familiar</MenuItem>
            <MenuItem value={"P"}>Comercial</MenuItem>
            <MenuItem value={"L"}>Laboral</MenuItem>
            <MenuItem value={"N"}>Ninguna</MenuItem>
            <MenuItem value={"O"}>Otros</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="otro_asegurado_bene"
          label="Especifique"
          fullWidth
          disabled={disableTipBeneficiarioEspecif}
        />
      </Grid>
      <Grid item xs={12}>
        <h3>Datos del beneficiario:</h3>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption
            name="tipo_identificacion_bene"
            label="Tipo de identificaci&oacute;n"
            // onChange={handleTipoBeneficiario()}
          >
            <MenuItem value={"C"}>C&eacute;dula</MenuItem>
            <MenuItem value={"P"}>Pasaporte</MenuItem>
            <MenuItem value={"R"}>Ruc Jurídico</MenuItem>
            <MenuItem value={"U"}>Ruc Natural</MenuItem>
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="num_identificacion_bene"
          label="No.identificaci&oacute;n"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="nombres_bene" label={`${nombre??'Nombres'}`} fullWidth />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
            <Input name="apellidos_bene" label="Apellidos" fullWidth />
      </Grid>
      
      {
        isVisible &&
        <>
          
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption name="sexo_bene" label="Sexo">
                <MenuItem value={"N"}>No Especificado</MenuItem>
                <MenuItem value={"O"}>Otro</MenuItem>
              </SelectOption>
            </Box>
          </Grid>
          {
            otroGen &&
              <Grid item xs={12} md={6} lg={3}>
                <Input
                  name="otro_genero_bene"
                  label="Especifique"
                  fullWidth
                />
              </Grid>
          }
          
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ minWidth: 120 }}>
              <SelectOption name="est_civil_bene" label="Estado civil">
                <MenuItem value={"01"}>Soltero</MenuItem>
                <MenuItem value={"02"}>Casado</MenuItem>
                <MenuItem value={"05"}>Divorciado</MenuItem>
                <MenuItem value={"04"}>U/libre</MenuItem>
                <MenuItem value={"03"}>Viudo</MenuItem>
              </SelectOption>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="lugar_nacimiento_bene"
              label="Lugar de nacimiento"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              name="fech_nacimiento_bene"
              label="Fecha de nacimiento"
              type="Date"
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={(ev) => handleChangeFecha(ev.target.value)}
              inputProps={{ max: today }}
              fullWidth
            />

          </Grid>
        </>
      }
      
      
      
      <Grid item xs={12} md={6} lg={3}>
        <Box sx={{ minWidth: 120 }}>
          <SelectOption name="nacionalidad_bene" label="Nacionalidad">
            {catalogoNacionalidad.map(({ codigo, descripcion }) => (
              <MenuItem key={codigo} value={codigo}>
                {descripcion}
              </MenuItem>
            ))}
          </SelectOption>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Input
          name="direccion_domicilio_bene"
          label="Direcci&oacute;n del domicilio"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input
          name="telefono_domicilio_bene"
          label="Tel&eacute;fono de domicilio"
          inputProps={{ maxLength: 13 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Input name="email_bene" label="E-mail personal" fullWidth />
      </Grid>
    </>
  );
};

export default index;
