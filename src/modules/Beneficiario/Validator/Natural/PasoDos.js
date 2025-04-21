import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  ocupacion: Yup.string().required('Requerido'),
  // ocupacion_especifique: Yup.string().required('Requerido'),
  razon_social: Yup.string().required('Requerido'),
  actividad_economica: Yup.string().required('Requerido'),
  cargo: Yup.string().required('Requerido'),
  direccion_trabajo: Yup.string().required('Requerido'),
  email: Yup.string()
    .required('Requerido')
    .email('el formato debe ser ejemplo: validar@example.com'),
  telefono_trabajo: Yup.string()
    .required('Requerido')
    .matches(/^\d{7,13}$/, 'Número telefónico inválido'),
  barrio_sector: Yup.string().required('Requerido'),
  ciudad_trabajo: Yup.string().required('Requerido'),
  fax: Yup.string()
    .required('Requerido')
    .matches(/^\d{7,13}$/, 'Número telefónico inválido'),
  pais_trabajo: Yup.string().required('Requerido'),
})
.when((values, schema) => {
  // VALIDACION DE PROVINCIA
  if (values.ocupacion == "0034") {
    return schema.shape({
      ocupacion_especifique: Yup.string().trim().required("Requerido"),
    });
  }else{
    return schema.shape({
      ocupacion_especifique: Yup.string().notRequired(),
    });
  }
})