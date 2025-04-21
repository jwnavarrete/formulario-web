import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        perfil_id: Yup.string().required("El Perfil es requerido"),
    });