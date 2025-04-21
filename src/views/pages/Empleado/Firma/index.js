import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import FrmEmpleado from '../Formulario'

const index = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const [loading, setLoading] = useState(true)
    const [hash, setHash] = useState('')

    useEffect(() => {
        generaFirmaCliente(id)
    }, []);

    const generaFirmaCliente = async (id) => {
        const { data } = await axiosPrivate.get(`/formulario-empleado/${id}/firma`)
        // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
        const { formulario, hash } = data
        // 
        if (hash) {
            setHash(hash)
            setLoading(false)
        }
    }

    if (loading) {
        return "Cargando datos, seccion solicitante."
    }


    return <FrmEmpleado firma={'S'} hash={hash} />
}

export default index