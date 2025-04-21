import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        // id: Yup.string().required("El campo ID es requerido"),
        fecha_desde: Yup.string().required("El campo desde es requerido"),
        fecha_hasta: Yup.string().required("El campo hasta es requerido"),
    });
