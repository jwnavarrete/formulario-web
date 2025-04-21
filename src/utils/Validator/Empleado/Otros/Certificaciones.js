import * as Yup from "yup";

const expresionRegularTexto = /^(?=.{1,})[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
    .shape({
        titulo: Yup.string()
            .required("Requerido")
            .matches(expresionRegularTexto, "Nombre inválido"),
        institucion: Yup.string()
            .required("Requerido")
            .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
        lugar: Yup.string().required("Requerido"),
        anio: Yup.number().typeError("Campo debe ser numérico"),
    })