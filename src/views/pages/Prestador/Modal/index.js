import React, { useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@utils/Validator/Prestador/FormRegistro";
import ClientCaptcha from 'react-client-captcha'

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

const urlApi = `http://${process.env.HOST_API}:${process.env.PORT_API}/formulario`;

const index = () => {
    const axiosPrivate = useAxiosPrivate();
    const [captchaValue, setCaptchaValue] = useState('');
    const [openModal, setOpenModal] = useState(true);
    const [tipIdentificacionList, setTipIdentificacionlist] = useState([])

    const getCaptcha = (code) => { setCaptchaValue(code); }

    const handleTipPersona = (valor) => {
        let listTipIdenti = []
        // 
        if (valor == 'N') {
            listTipIdenti.push({ "codigo": 'C', "descripcion": "Cédula" })
            listTipIdenti.push({ "codigo": 'P', "descripcion": "Pasaporte" })
            listTipIdenti.push({ "codigo": 'U', "descripcion": "Ruc" })
        }
        if (valor == 'J') {
            listTipIdenti.push({ "codigo": 'R', "descripcion": "Ruc" })
        }
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
            correo_prestador: datos.correo_prestador,
            correo_ejecutivo: datos.correo_ejecutivo,
            estado: "P",
            steep: 0
        }
        callApi(jsonData);
    }

    const callApi = async (jsonData) => {

        const data = await axiosPrivate.post('formulario-prestador', jsonData);

        await envioCorreoInicio(data.data.hash)

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
                data.data.url ? window.location.href = data.data.url : alert('Se presenta un error, por favor vuelva a intentar');
            }
        });

    }

    const envioCorreoInicio = async (hash) =>{
        const { data } = await axiosPrivate.post(
          `formulario-prestador/correo-envio/${hash}`
        );

        return data
    }

    const methods = useForm({ resolver: yupResolver(validationSchema), });
    const { handleSubmit, setValue } = methods;

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
                            <MenuItem value={"J"}>Jurídico</MenuItem>
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
                        <Input name="num_identificacion" label="No.identificaci&oacute;n" fullWidth required />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
                        <Input name="correo_prestador" inputProps={{ maxLength: 45 }} label="E-mail prestador de servicios de seguros" />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} pt={1} pb={1}>
                        <Input name="correo_ejecutivo" inputProps={{ maxLength: 45 }} label="E-mail ejecutivo Generali" helperText="Ingrese el correo de su ejecutivo aqui..." />
                    </Grid>
                    <ClientCaptcha
                        captchaCode={(code) => getCaptcha(code)} />
                    <Grid item xs={12} pt={1}>
                        <Input name="captcha" label="Ingrese c&oacute;digo de verificaci&oacute;n" required />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} pt={1}>
                        <Button
                            onClick={handleSubmit(grabaDatos)}
                            variant="contained"
                            color="primary">
                            Guardar
                        </Button>
                    </Grid>
                </FormProvider>
            </Box>
        </Modal>
    )
}

export default index