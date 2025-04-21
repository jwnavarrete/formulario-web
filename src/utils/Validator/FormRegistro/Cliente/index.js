import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    tip_persona: Yup.string().required("Requerido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    num_identificacion: Yup.string().required("Requerido"),
    captcha: Yup.string().required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    // correo_ejecutivo: Yup.string()
    //     .required("Requerido")
    //     .email("el formato debe ser ejemplo: validar@example.com"),
  })
  .when((values, schema) => {
    switch (values.tipo_identificacion) {
      case "C":
        return schema.shape({
          num_identificacion: Yup.string().trim()
            .required("Requerido")
            .matches(/^\d{10}$/, "número inválido"),
        });
      case "R":
      case "U":
        return schema.shape({
          num_identificacion: Yup.string().trim()
            .required("Requerido")
            .matches(/^\d{13}$/, "número inválido"),
        });
      case "P":
          return schema.shape({
            num_identificacion: Yup.string().trim()
              .required("Requerido")
              .matches(/^.{1,13}$/, "Extensión máxima 13 caracteres"),
          });
      default:
        return schema.shape({
          num_identificacion: Yup.string().required("Requerido").trim(),
        });
    }
  })
  .when((values, schema) => {
    if (values.email_agente) {
      return schema.shape({
        email_agente: Yup.string()
          .required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
        
      })
    }
  })

