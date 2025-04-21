
import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // ACTIVIDAD ECONOMICA (SECTION)
    ocupacion: Yup.string().required("Requerido"),
    razon_social: Yup.string().required("Requerido"),
    pais_trabajo: Yup.string().required("Requerido"),
    direccion_trabajo: Yup.string().required("Requerido"),
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
    declara_impuesto_renta: Yup.string().required("Requerido"),
    lleva_contabilidad: Yup.string().required("Requerido"),
    otro_ingreso: Yup.string().required("Requerido"),
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
    // SI ES ESTUDIANTE NO DEBE VALIDAR EL CAMPO CARGO
    if (values.ocupacion != "0106") {
      return schema.shape({
        cargo: Yup.string().required("Requerido"),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.ocupacion != "0100" && values.ocupacion != "0106") {
      return schema.shape({
        // sector: Yup.string().required("Requerido"),
        actividad_econonica: Yup.string().required("Requerido"),
        ciudad_trabajo: Yup.string().required("Requerido"),
        // email_personal: Yup.string()
        //   .required("Requerido")
        //   .email("el formato debe ser ejemplo: validar@example.com"),
        
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.ocupacion == "0034") {
      return schema.shape({
        especifique: Yup.string().required("Requerido"),
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
        // actividad_info: Yup.string().required("Requerido"),
      });
    }
  }).when(
    (values, schema) => {
      if (values.tip_prestador == "01") {
        return schema.shape({
          ocupacion: Yup.string().notRequired(),
          razon_social: Yup.string().notRequired(),
          pais_trabajo: Yup.string().notRequired(),
          cargo: Yup.string().notRequired(),
          actividad_econonica: Yup.string().notRequired(),
          direccion_trabajo: Yup.string().notRequired(),
          ciudad_trabajo: Yup.string().notRequired(),
          
          ingreso_mensuales:Yup.string().notRequired(),
          otro_ingreso:Yup.string().notRequired(),
          activos:Yup.string().notRequired(),
          pasivos:Yup.string().notRequired(),
          patrimonio:Yup.string().notRequired(),
          otros_info: Yup.string().notRequired(),
          declara_impuesto_renta: Yup.string().notRequired(),
          lleva_contabilidad: Yup.string().notRequired(),
          total_ingresos: Yup.string().notRequired(),
          total_egresos: Yup.string().notRequired(),
          
        })
      }
    }
  ).when(
    (values, schema) => {
      if (values.tip_prestador === "01" &&  values.telefono_trabajo.trim()!=='') {
        return schema.shape({
          telefono_trabajo: Yup.string().required()
          .matches(/^\d{7,13}$/,'Número inválido'),
        })
      }else if(values.tip_prestador === "01" &&  values.telefono_trabajo.trim() ===''){
        return schema.shape({
          telefono_trabajo: Yup.string().notRequired(),
          
        })
      }
    }
  );
