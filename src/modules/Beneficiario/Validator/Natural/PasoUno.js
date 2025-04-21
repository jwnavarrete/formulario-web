import * as Yup from 'yup'

export const validationSchema = Yup.object()
  .shape({
    // INFORMACION DEL BENEFICIARIO
    tipo_identificacion: Yup.string().required('Requerido'),
    nombres: Yup.string().required('Requerido'),
    apellidos: Yup.string().required('Requerido'),
    nacionalidad: Yup.string().required('Requerido'),
    sexo: Yup.string().required('Requerido'),
    est_civil: Yup.string().required('Requerido'),
    fech_nacimiento: Yup.date()
      .required('Requerido')
      .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
      .typeError('Por favor ingrese una fecha')
      .test('checkDateInPast', 'Fecha no puede ser futura', (d) => {
        return !!(d && d < new Date())
      }),
    profesion: Yup.string().required('Requerido'),
    edad: Yup.number().typeError('Campo debe ser numérico'),
    pais_domicilio: Yup.string().required('Requerido'),
    ciudad_domicilio: Yup.string().required('Requerido'),
    telefono_domicilio: Yup.string()
      .required('Requerido')
      .matches(/^\d{7,13}$/, 'Número telefónico inválido'),
    celular: Yup.string()
      .required('Requerido')
      .matches(/^\d{10,13}$/, 'Número telefónico inválido'),
    direccion_domicilio: Yup.string().required('Requerido'),
    lugar_nacimiento: Yup.string().required('Requerido'),
    persona_contacto: Yup.string().required('Requerido'),
    email_contanto: Yup.string()
      .required('Requerido')
      .email('el formato debe ser ejemplo: validar@example.com'),
    vinculo_sol_aseg: Yup.string().required('Requerido'),
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.pais_domicilio == 'EC' || values.pais_domicilio == '') {
      return schema.shape({
        provincia_domicilio: Yup.string().required('Requerido'),
        canton_domicilio: Yup.string().required('Requerido'),
      })
    } else {
      return schema.shape({
        provincia_domicilio: Yup.string().notRequired(),
        canton_domicilio: Yup.string().notRequired(),
      })
    }
  })
  .when((values, schema) => {
    switch (values.tipo_identificacion) {
      case 'C':
        return schema.shape({
          num_identificacion: Yup.string()
            .required('Requerido')
            .matches(/^\d{10}$/, 'número inválido'),
        })
      case 'R':
        return schema.shape({
          num_identificacion: Yup.string()
            .required('Requerido')
            .matches(/^\d{13}$/, 'número inválido'),
        })
      default:
        return schema.shape({
          num_identificacion: Yup.string().required('Requerido'),
        })
    }
  })

  .when((values, schema) => {
    if (
      values.est_civil == '02' ||
      values.est_civil == '04' ||
      values.est_civil == '06'
    ) {
      // SECTION CONYUGE
      return schema.shape({
        tipo_identificacion_cony: Yup.string().required('Requerido'),
        num_identificacion_cony: Yup.string()
          .required('Requerido')
          .matches(/^\d{10}$/, 'número inválido'),
        nombres_cony: Yup.string()
          .matches(/^[A-Za-z ]*$/, 'Nombre inválido')
          .required('Requerido'),
        // lugar_nacimiento_cony: Yup.string().required('Requerido'),
        actividad_eco_cony: Yup.string().required('Requerido'),
        domicilio_cony: Yup.string().required('Requerido'),
        nacionalidad_cony: Yup.string().required('Requerido'),
        pais_domicilio_cony: Yup.string().required('Requerido'),

        email_cony: Yup.string()
          .required('Requerido')
          .email('el formato debe ser ejemplo: validar@example.com'),
      })
    }
  })
  .when((values, schema) => {
    if (
      values.est_civil == '02' ||
      values.est_civil == '04' ||
      values.est_civil == '06'
    ) {
      switch (values.tipo_identificacion_cony) {
        case 'C':
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required('Requerido')
              .matches(/^\d{10}$/, 'número inválido'),
          })
        case 'R':
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required('Requerido')
              .matches(/^\d{13}$/, 'número inválido'),
          })
        case 'P':
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required('Requerido')
              .matches(/^[a-zA-Z0-9]+$/, 'Identificación inválida'),
          })
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string().required('Requerido'),
          })
      }
    }
  })
  .when((values, schema) => {
    if (values.vinculo_sol_aseg == 'O') {
      return schema.shape({
        otro_asegurado: Yup.string().required('Requerido'),
      })
    }
  })
