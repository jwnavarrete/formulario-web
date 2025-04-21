import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // ACTIVIDAD ECONOMICA (SECTION)
    ocupacion: Yup.string().required("Requerido"),
    razon_social: Yup.string().required("Requerido"),
    sector: Yup.string().required("Requerido"),
    actividad_econonica: Yup.string().required("Requerido"),
    cargo: Yup.string().required("Requerido"),
    direccion_trabajo: Yup.string().required("Requerido"),
    pais_trabajo: Yup.string().required("Requerido"),
    ciudad_trabajo: Yup.string().required("Requerido"),
    email_personal: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    telefono_trabajo: Yup.string().required("Requerido")
              .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    // INFORMACION FINANCIERA (SECTION)
    ingreso_mensuales: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Ingresos mensuales es requerida")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    total_ingresos: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Ingresos mensuales es requerida")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    total_egresos: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Ingresos mensuales es requerida")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    otro_ingreso: Yup.string().required("Requerido"),
    declara_impuesto_renta: Yup.string().required("Requerido"),
    lleva_contabilidad: Yup.string().required("Requerido"),
    // SITUACION FINANCIERA (SECTION)
    activos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    pasivos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    // patrimonio: Yup.number()
    //   .typeError("Campo debe ser numérico")
    //   .min(1, "Debe ser mayor a cero"),
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.ocupacion == "0034") {
      return schema.shape({
        especifique: Yup.string().trim().required("Requerido"),
      });
    }else{
      return schema.shape({
        especifique: Yup.string().notRequired(),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.otro_ingreso == "S") {
      return schema.shape({
        otros_info: Yup.number()
          .typeError("Campo debe ser numérico")
          .required("Ingresos mensuales es requerida")
          .min(1, "Debe ser mayor a cero")
          .max(9999999999999999, "Número inválido"),
        fuente_ingreso_info: Yup.string().required("Requerido"),
        sector_uno_info: Yup.string().required("Requerido"),
        actividad_info: Yup.string().required("Requerido"),
        cargo_desepena_info: Yup.string().required("Requerido"),
        nombre_razonsocial_info: Yup.string().required("Requerido"),
        direccion_trabajo_info: Yup.string().required("Requerido"),
        pais_trabajo_info: Yup.string().required("Requerido"),
        ciudad_trabajo_info: Yup.string().required("Requerido"),
        email_personal_info: Yup.string()
          .required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
        telefono_domicilio_info: Yup.string().required("Requerido")
                  .matches(/^\d{7,13}$/,'Número telefónico inválido'),
      });
    }
  });
