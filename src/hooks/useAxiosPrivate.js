import React, { useEffect } from "react";
import { axiosPrivate } from "@api/axios";
import { useNavigate } from "react-router-dom";
import authService from "@services/AuthService";

const useAxiosPrivate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = (request) => {
      const token = authService.getToken();

      if (!request.headers["Authorization"]) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }

      return request;
    };

    const reqError = (error) => Promise.reject(error);

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      const prevRequest = error?.config;
      
      if (error.response.status === 401) {
        authService.logOut();
        navigate("/auth/login");
        error.message = "la sesion ha expirado";
      }

      return Promise.reject(error);
    };

    const interceptorRequest = axiosPrivate.interceptors.request.use(
      reqInterceptor,
      reqError
    );
    const interceptorResponse = axiosPrivate.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      axiosPrivate.interceptors.request.eject(interceptorRequest);
      axiosPrivate.interceptors.response.eject(interceptorResponse);
    };
  }, [navigate]);

  return axiosPrivate;
};

export { useAxiosPrivate };
