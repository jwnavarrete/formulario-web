import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
    .shape({
        idioma: Yup.string()
            .required("Requerido")
            .matches(expresionRegularTexto, "Nombre inválido"),
        porc_hablado: Yup.number()
            .typeError("Campo debe ser numérico")
            .required("Suma asegurada es requerida")
            .min(1, "Debe ser mayor a cero")
            .max(100, "No puede ser mayor a 100"),
        porc_escrito: Yup.number()
            .typeError("Campo debe ser numérico")
            .required("Suma asegurada es requerida")
            .min(1, "Debe ser mayor a cero")
            .max(100, "No puede ser mayor a 100"),
        porc_lectura: Yup.number()
            .typeError("Campo debe ser numérico")
            .required("Suma asegurada es requerida")
            .min(1, "Debe ser mayor a cero")
            .max(100, "No puede ser mayor a 100"),
    })