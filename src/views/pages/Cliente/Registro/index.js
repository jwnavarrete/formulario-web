import React, { useEffect } from "react";
import { SteepNatural } from "../Steeps";
import FrmRegistro from "./Form";
import authService from '@services/AuthService'
import { useAuth } from '@hooks/useAuth'

const index = () => {
    const auth = useAuth()

    useEffect(() => {
        if(!authService.isLoggedIn() && !authService.getUser()){
            const authLogin = async () => {
                authService.signIn({ username: process.env.FVONLINE_API_USER, password: process.env.FVONLINE_API_PASSWD })
            }
            authLogin();
        }
    }, [auth])

    return (
        <FrmRegistro steeps={SteepNatural} />
    )
};

export default index;