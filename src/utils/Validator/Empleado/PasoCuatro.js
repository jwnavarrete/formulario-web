import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    acceptTerms: Yup.string().required("Requerido"),
    lugar_declaracion: Yup.string().required("Requerido"),
    seleccionar_pep  : Yup.string().required("Requerido"),
  })
  .when((values, schema) => {
    // SI ES ESTUDIANTE NO DEBE VALIDAR EL CAMPO CARGO
    if (values.revisionInterna) {
      return schema.shape({
        identificacion_ejecutivo: Yup.string().required("Requerido"),
        nombre_ejecutivo: Yup.string().required("Requerido"),
        perfil_cargo: Yup.string().required("Requerido"),
        perfil_competencias: Yup.string().required("Requerido"),
      });
    }
  });