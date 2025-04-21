import * as Yup from "yup";

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

export const validationSchema = Yup.object()
  .shape({
    // SECCION DEL SOLICITANTE
    tipo_identificacion_empresa: Yup.string().required("Requerido"),
    num_identificacion_empresa: Yup.string().required("Requerido"),
    num_identificacion_empresa: Yup.string()
      .required("Requerido")
      .matches(/^\d{13}$/, "número inválido"),
    razon_social_empresa: Yup.string().required("Requerido"),
    sector_empresa: Yup.string().required("Requerido"),
    actividad_empresa: Yup.string().required("Requerido"),
    objeto_social_empresa: Yup.string().required("Requerido"),
    direccion_empresa: Yup.string().required("Requerido"),
    ciudad_empresa: Yup.string().required("Requerido"),
    // fecha_constitucion_empresa: Yup.string().required("Requerido"),
    fecha_constitucion_empresa: Yup.date()
      .required("Requerido")
      .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
      .typeError('Por favor ingrese una fecha')
      .test('checkDateInPast', 'Fecha no puede ser futura',
        (d) => {
          return !!(d && d < new Date());
        }),
    // correo_empresa: Yup.string().required("Requerido"),
    correo_empresa: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    // telefono_empresa: Yup.string().required("Requerido"),
    telefono_empresa: Yup.string().required("Requerido")
    .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    pais_empresa: Yup.string().required("Requerido"),
    tipo_empresa: Yup.string().required("Requerido"),
    // mail_empresa: Yup.string().required("Requerido"),
    mail_empresa: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    contacto_empresa: Yup.string().required("Requerido"),
    tipo_cliente: Yup.string().required("Requerido"),
    tipo_seguro: Yup.string().required("Requerido"),
    val_asegurado: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Suma asegurada es requerida")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    tipo_inversion: Yup.string().required("Requerido"),
    tipo_mercado: Yup.string().required("Requerido"),
    situacion_legal: Yup.string().required("Requerido"),
  }).when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tipo_empresa == '36') {
      return schema.shape({
        tipo_empresa_especifique: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        tipo_empresa_especifique: Yup.string().notRequired(),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tipo_mercado == "O") {
      return schema.shape({
        tipo_mercado_especifique: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        tipo_mercado_especifique: Yup.string().notRequired(),
      });
    }
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.pais_empresa == "EC" || values.pais_empresa == "") {
      return schema.shape({
        provincia_empresa: Yup.string().required("Requerido"),
        canton_empresa: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        provincia_empresa: Yup.string().notRequired(),
        canton_empresa: Yup.string().notRequired(),
      });
    }
  })

