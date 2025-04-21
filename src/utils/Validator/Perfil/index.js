import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        // id: Yup.string().required("El campo ID es requerido"),
        descripcion: Yup.string().required("El perfil es requerido"),
        estado: Yup.string().required("El estado es requerido"),
    });
