import * as Yup from 'yup'

export const validationSchema2 = Yup.object().shape({})

export const validationSchema = Yup.object()
  .shape({
    acceptterms: Yup.string().required('Requerido'),
    lugar_declaracion: Yup.string().required('Requerido'),
    //seleccionar_pep: Yup.string().required("Requerido"),
  })
  .when((values, schema) => {
    if (values.revisionInterna) {
      return schema.shape({
        nombre_ejecutivo: Yup.string().required('Requerido'),
        lugar_ejecutivo: Yup.string().required('Requerido'),
        observaciones: Yup.string().required('Requerido'),
        sucursal: Yup.string().required('Requerido'),
      })
    }
  })
