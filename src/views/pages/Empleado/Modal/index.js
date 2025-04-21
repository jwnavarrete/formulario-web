import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/FormRegistro";
import ClientCaptcha from 'react-client-captcha'
import { useNavigate } from 'react-router-dom';

// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// LIBRERIAS PARA CAMPOS
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";
import swal from "sweetalert";
import { Typography } from '@mui/material';

// 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const index = () => {
    const axiosPrivate = useAxiosPrivate();
    const [captchaValue, setCaptchaValue] = useState('');
    const [openModal, setOpenModal] = useState(true);
    const [tipIdentificacionList, setTipIdentificacionlist] = useState([])
    const [formularios,setFormularios] = useState();
    const navigate = useNavigate();

    const getCaptcha = (code) => { setCaptchaValue(code); }

    const handleTipPersona = (valor) => {
        let listTipIdenti = []
        // 
        if (valor == 'N') {
            listTipIdenti.push({ "codigo": 'C', "descripcion": "Cédula" })
            listTipIdenti.push({ "codigo": 'P', "descripcion": "Pasaporte" })
            // listTipIdenti.push({ "codigo": 'U', "descripcion": "Ruc" })
        }
        // if (valor == 'J') {
        //     listTipIdenti.push({ "codigo": 'R', "descripcion": "Ruc" })
        // }
        // LIMPIAMOS LO QUE SE HAYA SELECCIONADO PREVIAMENTE PARA QUE SE VALIDE NUEVAMENTE
        setValue("tipo_identificacion", "")
        setTipIdentificacionlist(listTipIdenti)
    }

    const grabaDatos = (datos) => {
        if (datos.captcha != captchaValue) {
            alert('El codigo no es valido');
            return;
        }

        const jsonData = {
            tip_persona: datos.tip_persona,
            tip_identificacion: datos.tipo_identificacion,
            identificacion: datos.num_identificacion,
            correo_empleado: datos.email,
            correo_ejecutivo: datos.email_ejecutivo,
            estado: "P",
            steep: 0
        }
        callApi(jsonData);
    }

    const callApi = async (jsonData) => {
        const { data } = await axiosPrivate.post(
            `/formulario-empleado`,
            jsonData
        );
        
        await envioCorreoInicio(data.hash)

        setOpenModal(false)

        swal({
            title: "Formulario Online",
            text: `Revisa en tu correo el link con el que puedes continuar llenando el Formulario de Vinculación`,
            icon: "info",
            buttons: {
                continuar: {
                    text: "Aceptar",
                    value: "continue",
                },
            },
        }).then((value) => {
            if (value == "continue") {
                data.url ? window.location.href = data.url : alert('Se presenta un error, por favor vuelva a intentar');
            }
        });

    }

    const envioCorreoInicio = async (hash) =>{
        const { data } = await axiosPrivate.post(
          `formulario-empleado/correo-envio/${hash}`
        );

        return data
    }

    const methods = useForm({ resolver: yupResolver(validationSchema), });
    const { handleSubmit, setValue,getValues } = methods;

    const handleFindFormulario  = async (valor) =>{
        
        const { data } = await axiosPrivate.post(
            `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario-empleado/find-formulario`,
            {
                tip_persona: methods.getValues('tip_persona'),
                tip_identificacion: methods.getValues('tipo_identificacion'),
                identificacion: valor
            }
        );
        
        setFormularios(data);
    }

    const handleRenovar = async(formulario) =>{
        
        

        const {data} = await axiosPrivate.post(
            `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario-empleado/renovar`,
            {
                "formulario":{
                    "tip_persona": formulario.tip_persona,
                    "tip_identificacion": formulario.tip_identificacion,
                    "identificacion": formulario.identificacion,
                    "correo_empleado": getValues('email')!=''?getValues('email'):formulario.correo_empleado,
                    "correo_ejecutivo": getValues('email_ejecutivo')!=''? getValues('email_ejecutivo'):formulario.correo_ejecutivo,
                    "estado": "P",
                    "steep": 0
                },
                "id_parent":formulario.id
            }
        );
        console.log('formulario',data)

         navigate(`/${process.env.URL_EMPLEADO}/${data.hash}`);
         window.location.reload();

    }

    useEffect(()=>{

        if(methods.getValues('num_identificacion')){
            handleFindFormulario(methods.getValues('num_identificacion'))
        }
        
    },[methods.watch('tip_persona'),methods.watch('tipo_identificacion')])

    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FormProvider {...methods}>
                    <Grid item xs={12} md={6} lg={3}>
                        <SelectOption name="tip_persona" label="Tipo de Persona" required onChange={(e) => handleTipPersona(e.target.value)}>
                            <MenuItem value={"N"}>Natural</MenuItem>
                            {/* <MenuItem value={"J"}>Jurídico</MenuItem> */}
                        </SelectOption>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} pt={1}>
                        <SelectOption name="tipo_identificacion" label="Tipo de identificaci&oacute;n" required>
                            {tipIdentificacionList.map(({ codigo, descripcion }) => (
                                <MenuItem key={codigo} value={codigo}>
                                    {descripcion}
                                </MenuItem>
                            ))}
                        </SelectOption>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} pt={1}>
                        <Input name="num_identificacion" label="No.identificaci&oacute;n" fullWidth required onBlur={(e) => handleFindFormulario(e.target.value)} />
                    </Grid>
                    { formularios?.length > 0 &&
                        
                        <Typography variant="h4" color="black">
                            {`Formularios disponibles para renovación`}
                        </Typography>
                   
                    }
                    {
                        formularios?.length > 0 &&
                            <div className='d-flex justify-content-center mt-4' style={{maxHeight:'30vh', overflowY:'auto'}}>
                            {formularios.map((formulario,key) =>{
                              return (
                                
                                <div className='d-flex flex-row' key={key}>
                                    <hr style={{marginTop:'1rem'}}/>
                                    <Grid item sm={9} md={9} >
                                        <Grid item sm={4} md={4}>
                                            <Typography variant="overline" color="black" style={{fontWeight:'bold'}}>
                                                {`Correo:`}
                                            </Typography>
                                            <Typography variant="caption" color="black">
                                                {`${formulario.correo_empleado}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={4} md={4}>
                                            <Typography variant="overline" color="black" style={{fontWeight:'bold'}}>
                                                {`Fecha: `}
                                            </Typography>
                                            <Typography variant="caption" color="black">
                                            {`${formulario.created_at?(formulario.created_at.slice(0,10)):''}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <div className='d-flex flex-row justify-content-center'>
                                    <Button
                                    style={{width:'100%'}}
                                    onClick={(e)=>handleRenovar(formulario)}
                                        variant="contained"
                                        color="primary">
                                        Renovar
                                    </Button>
                                    </div>
                                </div>
                                
                              )
                            })}
                             </div>
                        
                        
                    }
                    {!formularios?.length > 0 &&
                        <>
                            <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
                                <Input name="email" label="E-mail personal" />
                            </Grid>

                            <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
                                <Input name="email_ejecutivo" label="E-mail RRHH"/>
                            </Grid>

                    
                            <ClientCaptcha
                                captchaCode={(code) => getCaptcha(code)} />
                            <Grid item xs={12} pt={1}>
                                <Input name="captcha" label="Ingrese c&oacute;digo de verificaci&oacute;n" required />
                            </Grid>

                            <Grid item sm={12} md={12} lg={12} pt={1}>
                                <Button
                                    style={{width:'100%'}}
                                    onClick={handleSubmit(grabaDatos)}
                                    variant="contained"
                                    color="primary">
                                    Guardar
                                </Button>
                            </Grid>
                        </>
                    }
                </FormProvider>
            </Box>
        </Modal>
    )
}

export default index