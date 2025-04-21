import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  acceptTerms: Yup.string().required("Requerido"),
  lugar_declaracion: Yup.string().required("Requerido"),
  //seleccionar_pep: Yup.string().required("Requerido"),

}).when((values, schema) => {
  
  if (values.revisionInterna) {
    return schema.shape({
      nombre_ejecutivo:Yup.string().required("Requerido"),
      lugar_ejecutivo:Yup.string().required("Requerido"),
      observaciones:Yup.string().required("Requerido"),
    });
  }
  if (values.revisionInternaAsesor) {
    return schema.shape({
      nombre_razon_social:Yup.string().required("Requerido"),
      // identificacion_asesor:Yup.string().required("Requerido").matches(/^\d{10}$/, "número inválido"),
      identificacion_asesor:Yup.string().required("Requerido")
      .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
      nombre_asesor:Yup.string().required("Requerido"),
      lugar_fecha_asesor:Yup.string().required("Requerido"),
      observaciones:Yup.string().required("Requerido"),
    });
  }

});;
