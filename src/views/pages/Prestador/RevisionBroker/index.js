import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import FormNatural from '../Natural'
import FormJuridico from '../Juridico'

const index = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const [tipoPersona, setTipPersona] = useState('')
    const [hash, setHash] = useState('')

    useEffect(() => {
        generaFirmaCliente(id)
    }, []);

    const generaFirmaCliente = async (id) => {
        const { data } = await axiosPrivate.get(`/formulario-prestador/${id}/firma`)
        // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
        const { formulario, hash } = data
        // 
        if (data) {
            setHash(hash)
            setTipPersona(formulario.tip_persona)
        }
    }

    /*if (tipoPersona == 'N') {
        return <FormNatural firma={'S'} hash={hash} revision={"N"} revisionBroker={"S"}/>
    }*/

    if (tipoPersona == 'J') {
        return <FormJuridico firma={'N'} hash={hash} revision={"N"} revisionBroker={"S"}/>
    }

    return <div>Error, consulte con sistemas</div>
}

export default index