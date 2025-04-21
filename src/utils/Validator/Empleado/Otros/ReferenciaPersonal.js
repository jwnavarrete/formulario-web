import * as Yup from "yup";

export const validationSchema = Yup.object()
    .shape({
        nombre_completo: Yup.string()
            .required("Requerido")
            .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
        parentesco: Yup.string()
            .required("Requerido")
            .matches(/^[A-Za-z ]+$/, "Solo se permiten letras"),
        telefono: Yup.string().required("Requerido")
        .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    })