import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  // PAGINA 3///
  //REFERENCIAS//
  // tipo_persona: Yup.string().required("Requerido"),
  tipo_identificacion: Yup.string().required("Requerido"),
  num_identificacion_accionista: Yup.string().required("Requerido"),
  razon_social_nombre_completos: Yup.string().required("Requerido"),
  razon_social_nombre_completos: Yup.string().required("Requerido"),
  capital_accionista : Yup.number()
  .typeError("Campo debe ser numérico")
  .min(1, "Debe ser mayor a cero")
  .max(9999999999999999, "Número inválido"),
  porc_participacion: Yup.number()
    .typeError("Campo debe ser numerico")
    .required("Suma asegurada es requerida")
    .min(10, "Debe ser mayor o igual a 10%")
    .max(100, "Debe ser menor o igual a 100%"),
  nac_accionista: Yup.string().required("Requerido"),
  tip_inversion_accionista: Yup.string().required("Requerido"),
})
  .when((values, schema) => {
    switch (values.tipo_identificacion) {
      case "C":
        return schema.shape({
          num_identificacion_accionista: Yup.string()
            .required("Requerido")
            .matches(/^\d{10}$/, "número inválido"),
        });
      case "R":
        return schema.shape({
          num_identificacion_accionista: Yup.string()
            .required("Requerido")
            .matches(/^\d{13}$/, "número inválido"),
        });
      default:
        return schema.shape({
          num_identificacion_accionista: Yup.string().required("Requerido"),
        });
    }
  });
