import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    tip_persona: Yup.string().required("Requerido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    num_identificacion: Yup.string().required("Requerido"),
    captcha: Yup.string().required("Requerido"),
    correo_prestador: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    correo_ejecutivo: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
  })
  .when((values, schema) => {
    switch (values.tipo_identificacion) {
      case "C":
        return schema.shape({
          num_identificacion: Yup.string()
            .required("Requerido")
            .matches(/^\d{10}$/, "número inválido"),
        });
      case "R":
      case "U":
        return schema.shape({
          num_identificacion: Yup.string()
            .required("Requerido")
            .matches(/^\d{13}$/, "número inválido"),
        });
      default:
        return schema.shape({
          num_identificacion: Yup.string().required("Requerido"),
        });
    }
  })
  // .when((values, schema) => {
  //   if (values.email_agente) {
  //     return schema.shape({

  //     })
  //   }
  // })

