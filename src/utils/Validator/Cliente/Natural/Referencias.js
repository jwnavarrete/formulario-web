import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object().shape({
  // PAGINA 3///
  //REFERENCIAS//
  nombres_apellidos: Yup.string().trim().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
  parentesco: Yup.string().trim().required("Requerido").matches(expresionRegularTexto, "Campo inválido"),
  // telefono: Yup.number().typeError("Campo debe ser numérico"),
  telefono: Yup.string().required("Requerido")
  .matches(/^\d{7,13}$/,'Número telefónico inválido'),
  tarjeta: Yup.string()
    // .required("Requerido")
    .matches(/^[X ]{14,}\d{4}$/, "Número inválido"),
  ins_fincanciera_1: Yup.string().trim().required("Requerido"),
  tipo_cuenta: Yup.string().required("Requerido"),
  ins_fincanciera_2: Yup.string().trim().required("Requerido"),
});
