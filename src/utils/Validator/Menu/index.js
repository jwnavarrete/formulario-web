import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        // id: Yup.string().required("El campo ID es requerido"),
        titulo: Yup.string().required("El Titulo es requerido"),
        tipo: Yup.string().required("El Tipo requerido"),
        // icono: Yup.string().required("El Icono es requerido"),
        // url: Yup.string().required("Url requerida"),
        // parent_id: Yup.string().required("El Menu Padre es requerido"),
    });