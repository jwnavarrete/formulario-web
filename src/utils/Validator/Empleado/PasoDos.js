import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
  .shape({
    // PRIMARIA
    nombre_inst_primaria: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Campo inválido"),
    lugar_primaria: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Campo inválido"),
    anio_crusado_primaria: Yup.string()
                 .required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
    anio_salida_primaria: Yup.number().typeError("Campo debe ser numérico"),
    // SECUNDARIA
    nombre_inst_secundaria: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Campo inválido"),
    lugar_secundaria: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Campo inválido"),
    anio_crusado_secundaria: Yup.string()
                   .required("Requerido").matches(expresionRegularTexto, "Campo inválido") ,
    anio_salida_secundaria: Yup.number().typeError("Campo debe ser numérico"),

    // ADICIONALES
    tiene_certificaciones: Yup.string().required("Requerido"),
    tiene_idiomas: Yup.string().required("Requerido"),
    tiene_superior: Yup.string().required("Requerido"),
    // CONOCIMIENTOS VARIOS
    nivel_excel: Yup.string().required("Requerido"),
    nivel_word: Yup.string().required("Requerido"),
    nivel_powerpoint: Yup.string().required("Requerido"),
    nivel_outlook: Yup.string().required("Requerido"),
    nivel_project: Yup.string().required("Requerido"),
    nivel_visio: Yup.string().required("Requerido"),
    
    

  })
  .when((values, schema) => {
    // VALIDACION DE CERTIFICACIONES
    if (values.tiene_certificaciones &&  values.tiene_certificaciones  == 'S') {
      return schema.shape({
        // SUPERIOR
        certificaciones: Yup.number()
      .typeError("Por favor ingrese una certificación")
      .required("Por favor ingrese una certificación")
      .min(1, "Por favor ingrese una certificación"),
      });
    }else{
      return schema.shape({
        certificaciones: Yup.string().notRequired("")
      })
    }
  })
  
  .when((values, schema) => {
    // VALIDACION DE IDIOMAS
    if (values.tiene_idiomas &&  values.tiene_idiomas  == 'S') {
      return schema.shape({
        // SUPERIOR
        idiomas: Yup.number()
      .typeError("Por favor registre un idioma")
      .required("Por favor registre un idioma")
      .min(1, "Por favor registre un idioma"),
      });
    }else{
      return schema.shape({
        idiomas: Yup.string().notRequired("")
      })
    }
  })
  
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tiene_superior == "S") {
      return schema.shape({
        // SUPERIOR
        nombre_inst_superior: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        lugar_superior: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        anio_crusado_superior: Yup.string().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
        anio_salida_superior: Yup.number().typeError("Campo debe ser numérico"),
      });
    }
  })
  // .when((values, schema) => {
  //   switch (values.tipo_identificacion) {
  //     case "C":
  //       return schema.shape({
  //         num_identificacion: Yup.string()
  //           .required("Requerido")
  //           .matches(/^\d{10}$/, "número inválido"),
  //       });
  //     case "U":
  //       return schema.shape({
  //         num_identificacion: Yup.string()
  //           .required("Requerido")
  //           .matches(/^\d{13}$/, "número inválido"),
  //       });
  //     default:
  //       return schema.shape({
  //         num_identificacion: Yup.string().required("Requerido"),
  //       });
  //   }
  // })
  // .when((values, schema) => {
  //   if (
  //     values.est_civil == "02" ||
  //     values.est_civil == "04" ||
  //     values.est_civil == "06"
  //   ) {
  //     return schema.shape({
  //       tipo_identificacion_cony: Yup.string().required("Requerido"),
  //       num_identificacion_cony: Yup.string()
  //         .required("Requerido")
  //         .matches(/^\d{10}$/, "número inválido"),
  //       nombres_cony: Yup.string()
  //         .required("Requerido")
  //         .matches(expresionRegularTexto, "Campo inválido"),
  //       apellidos_cony: Yup.string()
  //         .required("Requerido")
  //         .matches(expresionRegularTexto, "Apellido inválido"),
  //     })
  //   }
  // })
  // .when((values, schema) => {
  //   if (
  //     values.est_civil == "02" ||
  //     values.est_civil == "04" ||
  //     values.est_civil == "06"
  //   ) {
  //     // SECTION CONYUGE
  //     switch (values.tipo_identificacion_cony) {
  //       case "C":
  //         return schema.shape({
  //           num_identificacion_cony: Yup.string()
  //             .required("Requerido")
  //             .matches(/^\d{10}$/, "número inválido"),
  //         });
  //       default:
  //         return schema.shape({
  //           num_identificacion_cony: Yup.string().required("Requerido"),
  //         });
  //     }
  //   }
  // })