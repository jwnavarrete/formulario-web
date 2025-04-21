import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  acceptTerms: Yup.string().required("Requerido"),
  lugar_declaracion: Yup.string().required("Requerido"),
  seleccionar_pep: Yup.string().required("Requerido")
}).when((values, schema) => {
  // SI ES ESTUDIANTE NO DEBE VALIDAR EL CAMPO CARGO
  if (values.revisionInterna) {
    return schema.shape({
      sucursal: Yup.string().required("Requerido"),
      identificacion_ejecutivo: Yup.string().required("Requerido"),
      nombre_ejecutivo: Yup.string().required("Requerido"),
      tipo_prestador: Yup.string().required("Requerido"),
      observaciones: Yup.string().required("Requerido"),
    });
  }
}).when(
  (values, schema) => {
    if (values.tip_prestador == "01") {
      return schema.shape({
        acceptTerms: Yup.string().notRequired(),
        lugar_declaracion: Yup.string().notRequired(),
        seleccionar_pep: Yup.string().notRequired(),
      })
    }
  }
);
