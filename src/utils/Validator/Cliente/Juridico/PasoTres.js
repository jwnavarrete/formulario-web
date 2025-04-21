import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // PAGINA 3///
    // tipo_asegurado: Yup.string().required("Requerido"),
    Vincul_Rel_Sol: Yup.string().required("Requerido"),
    // SECCION EMISION DE FACTURA//
    solicitante: Yup.string().required("Requerido"),

    // SECCION INFORMACION ADICIONAL//
    referido: Yup.string().required("Requerido"),

    // SECCION PEP//
    seleccionar_pep: Yup.string().required("Requerido"),

    // CANAL VINCULACION///
    tipo_cliente_vinculacion: Yup.string().required("Requerido"),
    nombres_vinculacion: Yup.string().required("Requerido"),

    // SITUACION FINANCIERA (SECTION)
    activos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    pasivos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    patrimonio: Yup.number()
      .typeError("Campo debe ser numérico"),
      // .min(0, "Debe ser mayor o igual a cero"),
    total_ingresos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor  a cero")
      .max(9999999999999999, "Número inválido"),
    total_egresos: Yup.number()
      .typeError("Campo debe ser numérico")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    // FORMA DE PAGO //
    forma_pago: Yup.string().required("Requerido"),
    institucion_pago: Yup.string().required("Requerido"),
    tipo_cuenta_pago: Yup.string().required("Requerido"),
    num_tarjeta: Yup.string()
    .required("Requerido")
    .matches(/^[X ]{14,}\d{4}$/, "Número inválido"),
  })
  .when((values, schema) => {
    if (values.tipo_cuenta_pago === "O") {
      return schema.shape({
        tipo_cuenta_otro: Yup.string().required("Requerido"),
      })
    }else{
      return schema.shape({
        tipo_cuenta_otro: Yup.string().notRequired(),
      })
    }
  })
  .when((values, schema) => {
    if (values.Vincul_Rel_Sol === "O") {
      // VALIDAR TIPO ASEGURADO OTROS
      return schema.shape({
        otro_asegurado: Yup.string().trim().required("Requerido"),
      });
    }
  })
  .when((values, schema) => {
    if (values.incluyeReferencia === true) {
      return schema
        .shape({
          referencias: Yup.number()
            .typeError("Por favor ingrese una referencia")
            .required("Por favor ingrese una referencia")
            .min(1, "Por favor ingrese una referencia"),
        })
    }
  })

  // Emisión de factura
  .when((values, schema) => {
    if (values.solicitante === "O") {
      return schema
        .shape({
          nombre_razonsocial: Yup.string().required("Requerido"),
          tipoid: Yup.string().required("Requerido"),
          telefono: Yup.string().required("Requerido")
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
          direccion: Yup.string().required("Requerido"),
          relacionsolicitante: Yup.string().required("Requerido"),
        })
        .when((values, schema) => {
          switch (values.tipoid) {
            case "C":
              return schema.shape({
                num_identificacion_emi_factura: Yup.string()
                  .required("Requerido")
                  .matches(/^\d{10}$/, "número inválido"),
              });
            case "R":
              return schema.shape({
                num_identificacion_emi_factura: Yup.string()
                  .required("Requerido")
                  .matches(/^\d{13}$/, "número inválido"),
              });
            case "P":
                return schema.shape({
                  num_identificacion_emi_factura: Yup.string()
                  .required("Requerido")
                  .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
                });
            default:
              return schema.shape({
                num_identificacion_emi_factura: Yup.string().required("Requerido"),
              });
          }
        });
    }
  })

  // VALIDAR  INFORMACION ADICIONAL//
  .when((values, schema) => {
    if (values.referido === "S") {
      return schema.shape({
        nombre_apellido: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
          seleccionar_info_adicional: Yup.string().required("Requerido"),
      })
        .when((values, schema) => {
          if (
            values.seleccionar_info_adicional === "O" ||
            values.seleccionar_info_adicional === ""
          ) {
            // VALIDAR TIPO ASEGURADO OTROS
            return schema.shape({
              especifique: Yup.string().required("Requerido"),
            });
          }
        })
    }
  })

  .when((values, schema) => {
    if (values.seleccionar_pep === "N") {
      return schema.shape({
        // nombre_apellido: Yup.string().required("Requerido"),
        // seleccionar: Yup.string().required("Requerido"),
      })
    }
  })
