import * as Yup from "yup"

export const validationSchema = Yup.object()
  .shape({
    tip_persona: Yup.string().required("Requerido"),
  })
  .when((values, schema) => {
    if(values.tip_busqueda ==='I'){
      return schema.shape({
        busqueda: Yup.string().required("Requerido"),
      })
    }
    if(values.tip_busqueda ==='N'){
      return schema.shape({
        busqueda: Yup.string().required("Requerido"),
      })
    }
  })