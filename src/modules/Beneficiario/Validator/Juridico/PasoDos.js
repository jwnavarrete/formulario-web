import * as Yup from 'yup'

export const validationSchema = Yup.object()
  .shape({
    tipo_identificacion: Yup.string().required(
      'El tipo de identificación es obligatorio',
    ),
    apellidos: Yup.string().required('Los apellidos son obligatorios'),
    nombres: Yup.string().required('Los nombres son obligatorios'),
    sexo: Yup.string().required('El sexo es obligatorio'),
    est_civil: Yup.string().required('El estado civil es obligatorio'),
    lugar_nacimiento: Yup.string().required(
      'El lugar de nacimiento es obligatorio',
    ),
    nacionalidad: Yup.string().required('La nacionalidad es obligatoria'),
    direccion_domicilio: Yup.string().required(
      'La dirección de domicilio es obligatoria',
    ),
    pais_domicilio: Yup.string().required(
      'El país de domicilio es obligatorio',
    ),
    ciudad_domicilio: Yup.string().required(
      'La ciudad de domicilio es obligatoria',
    ),
    profesion: Yup.string().required('La profesión es obligatoria'),
    fech_nacimiento: Yup.date()
      .required('Requerido')
      .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
      .typeError('Por favor ingrese una fecha')
      .test('checkDateInPast', 'Fecha no puede ser futura', (d) => {
        return !!(d && d < new Date())
      }),
    edad: Yup.number().typeError('Campo debe ser numérico'),
    telefono_domicilio: Yup.string()
      .required('El teléfono de domicilio es obligatorio')
      .matches(
        /^[0-9]{10,13}$/,
        'El teléfono de domicilio debe tener entre 10 y 13 dígitos',
      ),
    telefono_celular: Yup.string()
      .required('El teléfono celular es obligatorio')
      .matches(
        /^[0-9]{10,13}$/,
        'El teléfono celular debe tener entre 10 y 13 dígitos',
      ),
    email: Yup.string()
      .required('El correo electrónico es obligatorio')
      .email('El correo electrónico no es válido'),
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
    if (
      values.est_civil == '02' ||
      values.est_civil == '04' ||
      values.est_civil == '06'
    ) {
      // SECTION CONYUGE
      return schema.shape({
        tipo_identificacion_cony: Yup.string().required('Requerido'),
        // num_identificacion_cony: Yup.string()
        //   .required('Requerido')
        //   .matches(/^\d{10}$/, 'número inválido'),
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
      // SECTION CONYUGE
      switch (values.tipo_identificacion_cony) {
        case 'C':
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required('Requerido')
              .matches(/^\d{10}$/, 'número inválido'),
          })
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required('Requerido')
              .matches(/^[a-zA-Z0-9]{0,13}$/, 'Indetificación inválida'),
          })
      }
    }
  })
