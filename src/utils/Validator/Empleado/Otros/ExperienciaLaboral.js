import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
    .shape({
        nombre_empresa: Yup.string()
            .required("Requerido")
            .matches(expresionRegularTexto, "Solo se permiten letras"),
        cargo: Yup.string()
            .required("Requerido")
            .matches(/^[A-Za-z ]+$/, "Solo se permiten letras"),
        motivo_salida: Yup.string().required("Requerido"),
        fecha_ingreso: Yup.date()
            .required("Requerido")
            .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
            .typeError('Por favor ingrese una fecha')
            .test('checkDateInPast', 'Fecha no puede ser futura',
                (d) => {
                    return !!(d && d < new Date());
                })
            .when("fecha_salida",
                (fecha_salida, yup) => (!isNaN(new Date(fecha_salida))) ? yup.max(fecha_salida, "La fecha de ingreso no puede ser posterior a la fecha de salida"):yup.required("Fecha es requerida")),
                
        fecha_salida: Yup.date()
            .required("Requerido")
            .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
            .typeError('Por favor ingrese una fecha')
            .test('checkDateInPast', 'Fecha no puede ser futura',
                (d) => {
                    return !!(d && d < new Date());
                })
            ,
            
       
    })