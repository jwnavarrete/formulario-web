import * as Yup from "yup"

export const validationSchema = Yup.object()
  .shape({
    parametro_id: Yup.string().required("Requerido"),
    factor: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Suma asegurada es requerida")
  })
  .when((values, schema) => {
    // // VALIDACION DE PROVINCIA
    switch (values.tipo_id) {
      case 1:
        return schema.shape({
          nivel1_id: Yup.string().required("Requerido"),
        })
        break
      case 2:
        return schema.shape({
          nivel1_id: Yup.string().required("Requerido"),
          nivel2_id: Yup.string().required("Requerido")
        })
        break
      case 5:
        if (values.rango == 3) {
          return schema.shape({
            nivel1_id: Yup.string().required("Requerido"),
            rango: Yup.string().required("Requerido"),
            desde: Yup.number()
              .typeError("Campo debe ser numérico")
              .required("Requerido"),
            factor: Yup.number()
              .typeError("Campo debe ser numérico")
              .required("Suma asegur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ada es requerida")
          })
        }
        if (values.rango == 2) {
          return schema.shape({
            nivel1_id: Yup.string().required("Requerido"),
            rango: Yup.string().required("Requerido"),
            desde: Yup.number()
              .typeError("Campo debe ser numérico")
              .required("Requerido"),
            hasta: Yup.number()
              .typeError("Campo debe ser numérico")
              .required("Requerido")
          })
        }
        if (values.rango == 1) {
          return schema.shape({
            nivel1_id: Yup.string().required("Requerido"),
            rango: Yup.string().required("Requerido"),
            hasta: Yup.number()
              .typeError("Campo debe ser numérico")
              .required("Requerido")
          })
        }

        break
    }
  })