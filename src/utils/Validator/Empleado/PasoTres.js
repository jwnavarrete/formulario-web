import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
  .shape({
    //
    ingreso_mensual: Yup.number().typeError("Campo debe ser numérico").min(1, "Debe ser mayor a cero").max(9999999999999999, "Número inválido"),
    activos: Yup.number().typeError("Campo debe ser numérico").min(1, "Debe ser mayor a cero").max(9999999999999999, "Número inválido"),
    pasivos: Yup.number().typeError("Campo debe ser numérico").min(1, "Debe ser mayor a cero").max(9999999999999999, "Número inválido"),
    // patrimonio: Yup.number().typeError("Campo debe ser numérico").min(1, "Debe ser mayor a cero"),
    patrimonio: Yup.number().typeError("Campo debe ser numérico"),
    // 
    otro_ingreso: Yup.string().required("Requerido"),
    tiene_referencias: Yup.string().required("Requerido"),
    tiene_refe_comercial: Yup.string().required("Requerido"),

    referencias: Yup.number()
      .typeError("Por favor registre almenos  una referencia")
      .required("Por favor registre almenos una referencia")
      .min(1, "Por favor registre almenos una referencia"),
    

  }).when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.otro_ingreso == "S") {
      return schema.shape({
        fuente_ingreso: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        total_otros_ingresos: Yup.number().typeError("Campo debe ser numérico").min(1, "Debe ser mayor a cero").max(9999999999999999, "Número inválido"),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tiene_referencias == "S") {
      return schema.shape({
        tipo_cuenta: Yup.string().required("Requerido"),
        institucion_financiera: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        numero_cuenta: Yup.string().required("Requerido").matches(/^\d{1,15}$/,'Número inválido , máximo 15 dígitos'),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tiene_refe_comercial == "S") {
      return schema.shape({
        nombre_tarjeta_comercial: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        inst_financiera_comercial: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        tipo_cuenta_comercial: Yup.string().required("Requerido"),
      });
    }
  })


