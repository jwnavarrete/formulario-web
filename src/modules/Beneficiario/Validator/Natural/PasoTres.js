import * as Yup from 'yup'

export const validationSchema = Yup.object()
  .shape({
    ingreso_mensuales: Yup.number()
      .typeError('Campo debe ser numérico')
      .required('Ingresos mensuales es requerida')
      .min(1, 'Debe ser mayor a cero')
      .max(9999999999999999, 'Número inválido'),
    otro_ingreso: Yup.string().required('Requerido'),

    activos: Yup.number()
      .typeError('Campo debe ser numérico')
      .min(1, 'Debe ser mayor a cero')
      .max(9999999999999999, 'Número inválido'),
    pasivos: Yup.number()
      .typeError('Campo debe ser numérico')
      .min(1, 'Debe ser mayor a cero')
      .max(9999999999999999, 'Número inválido'),
    patrimonio: Yup.number()
      .typeError('Campo debe ser numérico')
      //   .min(1, 'Debe ser mayor a cero')
      .max(9999999999999999, 'Número inválido'),

    tipo_cliente_vinculacion: Yup.string().required('Requerido'),
    nombres_vinculacion: Yup.string().required('Requerido'),
    seleccionar_pep: Yup.string().required('Requerido'),
    referencias: Yup.number()
      .typeError('Por favor ingrese una referencia')
      .required('Por favor ingrese una referencia')
      .min(1, 'Por favor ingrese una referencia'),
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.otro_ingreso == 'S') {
      return schema.shape({
        otros_info: Yup.number()
          .typeError('Campo debe ser numérico')
          .required('Ingresos mensuales es requerida')
          .min(1, 'Debe ser mayor a cero')
          .max(9999999999999999, 'Número inválido'),
        fuente_ingreso_info: Yup.string().required('Requerido'),
      })
    }
  })
