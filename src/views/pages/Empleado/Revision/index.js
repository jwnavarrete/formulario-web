import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'
import Formulario from '../Formulario'
import Loading from '@components/ui/Loading';


const index = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const [hash, setHash] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        generaFirma(id)
    }, []);

    const generaFirma = async (id) => {
        const { data } = await axiosPrivate.get(`/formulario-empleado/${id}/firma`)
        // SI NO TIENE DATA RETORNAMOS A LA URL PARA QUE LLENE LA INFORMACION
        const { hash } = data
        // 
        if (data) {
            setHash(hash)
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <Loading />
    }
    
    return <Formulario firma={'S'} hash={hash} revision={"S"}/>
}

export default index