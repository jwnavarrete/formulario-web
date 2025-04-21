import React, { useEffect, useState } from "react";
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '@services/AuthService'
// COMPONENTES
import FormNatural from "./Natural"
import FormJuridico from "./Juridico"
import Loading from '@components/ui/Loading';
// PROVIDER
import swal from "sweetalert";
// FORMULARIO ACTIONS REDUX
const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  const [tipoPersona, setTipPersona] = useState('')
  const [hash, setHast] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setHast(id)
    // 
    validaTokenSeguridad(id)
  }, []);

  const authToken = async param => {
    const { data } = await axiosPrivate.post(`/auth/token-form`,
      {
        tipo: param.tipo,
        hash: param.hash
      })
    if (data) {
      AuthService.setToken(data.access_token)
    } else {
      window.alert('Error al generar token de acceso')
    }
    return data
  }

  const validaTokenSeguridad = async (hash) => {
    try {
      const dataToken = await authToken({ tipo: "prestador", hash: hash });
      const { data } = await axiosPrivate.get(`/formulario-prestador/${hash}`)
      // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
      const { tip_persona } = data
      //
      if (data) {
        setTipPersona(tip_persona)
      }
    } catch (error) {
      swal({
        title: "Formulario Online",
        text: `No se pudo encontrar el formulario`,
        icon: "info",
        buttons: {
          continuar: {
            text: "Aceptar",
            value: "continue",
          },
        },
      }).then((value) => {
        if (value == "continue") {
          // SI HAY UN ERROR AL CARGAR EL FORMULARIO, LO ENVIAMOS AL ENLACE PRINCIPAL PARA CREAR UN NUEVO REGISTRO
          navigate(`/${process.env.URL_PRESTADOR}`);
        }
      });
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (tipoPersona == 'N') {
    return <FormNatural hash={hash} />
  }

  if (tipoPersona == 'J') {
    return <FormJuridico hash={hash} />
  }
};

export default index;