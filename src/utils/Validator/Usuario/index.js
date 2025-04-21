import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        // id: Yup.string().required("El campo ID es requerido"),
        email: Yup.string().required("El Email es requerido"),
        password: Yup.string().required("La Contraseña es requerida"),
        perfil_id: Yup.string().required("El Perfil es requerido"),
        estado: Yup.string().required("El Estado es requerido"),
    });
