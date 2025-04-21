import * as Yup from "yup";
const expresionRegularTexto = /^(?=.{1,})[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+(?:\s[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚüÜ]+)*$/

export const validationSchema = Yup.object()
  .shape({
    nombres: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Nombre inválido"),
    apellidos: Yup.string()
      .required("Requerido")
      .matches(expresionRegularTexto, "Apellido inválido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    sexo: Yup.string().required("Requerido"),
    est_civil: Yup.string().required("Requerido"),
    fech_nacimiento: Yup.date()
      .required("Requerido")
      .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
      .typeError('Por favor ingrese una fecha')
      .test('checkDateInPast', 'Fecha no puede ser futura',
        (d) => {
          return !!(d && d < new Date());
        }),
    telefono_personal: Yup.string().required("Requerido")
    .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    direccion_domicilio: Yup.string()
      .trim()
      .required("Requerido")
      .min(1, "Debe ingresar una dirección válida"),
    lugar_nacimiento: Yup.string().required("Requerido"),
    tiene_vehiculo: Yup.string().required("Requerido"),
    edad: Yup.string().required("Requerido"),
    tipo_sangre: Yup.string().required("Requerido"),
    titulo: Yup.string().required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .matches(/^.{0,70}$/,'El email no puede superar un máximo de 70 caracteres')
      .email("el formato debe ser ejemplo: validar@example.com"),
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.tiene_vehiculo == "S") {
      return schema.shape({
        placa: Yup.string().required("Requerido").matches(/^[a-zA-Z0-9]{0,10}$/,"Ingrese una placa válida"),
        marca: Yup.string().required("Requerido"),
        modelo: Yup.string().required("Requerido"),
        anio: Yup.number().typeError("Campo debe ser numérico"),
      });
    }
  })
  .when((values, schema) => {
    switch (values.tipo_identificacion) {
      case "C":
        return schema.shape({
          num_identificacion: Yup.string()
            .required("Requerido")
            .matches(/^\d{10}$/, "número inválido"),
        });
      case "U":
        return schema.shape({
          num_identificacion: Yup.string()
            .required("Requerido")
            .matches(/^\d{13}$/, "número inválido"),
        });
      default:
        return schema.shape({
          num_identificacion: Yup.string().required("Requerido"),
        });
    }
  })
  .when((values, schema) => {
    if (
      values.est_civil == "02" ||
      values.est_civil == "04" ||
      values.est_civil == "06"
    ) {
      return schema.shape({
        tipo_identificacion_cony: Yup.string().required("Requerido"),
        num_identificacion_cony: Yup.string()
          .required("Requerido")
          .matches(/^\d{10}$/, "número inválido"),
        nombres_cony: Yup.string()
          .required("Requerido")
          .matches(expresionRegularTexto, "Nombre inválido"),
        apellidos_cony: Yup.string()
          .required("Requerido")
          .matches(expresionRegularTexto, "Apellido inválido"),
      })
    }
  })
  .when((values, schema) => {
    if (
      values.est_civil == "02" ||
      values.est_civil == "04" ||
      values.est_civil == "06"
    ) {
      // SECTION CONYUGE
      switch (values.tipo_identificacion_cony) {
        case "C":
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required("Requerido")
              .matches(/^\d{10}$/, "número inválido"),
          });
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string().required("Requerido").matches(/^[a-zA-Z0-9]{0,13}$/,'Indetificación inválida'),
          });
      }
    }
  })
  .when((values,schema)=>{
    if(values.sexo == 'O'){
      return schema.shape({
        otro_genero:Yup.string().required("Requerido")
      });
      
    }else{
      return schema.shape({
        otro_genero:Yup.string().notRequired(),
      });
    }
  })