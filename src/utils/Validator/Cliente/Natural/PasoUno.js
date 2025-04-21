import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // PAGINA 1
    tipo_cliente: Yup.string().required("Requerido"),
    tipo_seguro: Yup.string().required("Requerido"),
    val_asegurado: Yup.number()
      .typeError("Campo debe ser numérico")
      .required("Suma asegurada es requerida")
      .min(1, "Debe ser mayor a cero")
      .max(9999999999999999, "Número inválido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    nombres: Yup.string().required("Requerido"),
    apellidos: Yup.string().required("Requerido"),
    // nombres: Yup.string()
    //   .required("Requerido")
    //   .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
    // apellidos: Yup.string()
    //   .required("Requerido")
    //   .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
    nacionalidad: Yup.string().required("Requerido"),
    sexo: Yup.string().required("Requerido"),
    est_civil: Yup.string().required("Requerido"),
    // fech_nacimiento: Yup.string().required("Requerido"),
    fech_nacimiento: Yup.date()
        .required("Requerido")
        .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
        .typeError('Por favor ingrese una fecha')
        .test('checkDateInPast', 'Fecha no puede ser futura',
          (d) => {
            return !!(d && d < new Date());
          }),
    edad:Yup.number().typeError(
      "Campo debe ser numérico"
    ),
    profesion: Yup.string().required("Requerido"),
    pais_domicilio: Yup.string().required("Requerido"),
    ciudad_domicilio: Yup.string().required("Requerido"),
    telefono_domicilio: Yup.string().required("Requerido")
    .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    celular: Yup.string().required("Requerido")
      .matches(/^\d{10,13}$/,'Número telefónico inválido'),
    direccion_domicilio: Yup.string().required("Requerido"),
    lugar_nacimiento: Yup.string().required("Requerido"),
    persona_contacto: Yup.string().required("Requerido"),
    celular_contacto: Yup.string().required("Requerido")
      .matches(/^\d{10,13}$/,'Número telefónico inválido'),
    email: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    email_recibir: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    select_asegurado: Yup.string().required("Requerido"),
    select_beneficiario: Yup.string().required("Requerido"),
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if (values.pais_domicilio == "EC" || values.pais_domicilio == "") {
      return schema.shape({
        provincia_domicilio: Yup.string().required("Requerido"),
        canton_domicilio: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        provincia_domicilio: Yup.string().notRequired(),
        canton_domicilio: Yup.string().notRequired(),
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
      case "R":
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
    if (values.select_asegurado === "N") {
      // SECTION ASEGURADO
      return schema.shape({
        tipo_identificacion_aseg: Yup.string().required("Requerido"),
        tipo_asegurado: Yup.string().required("Requerido"),
        nombres_aseg: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
        apellidos_aseg: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
        sexo_aseg: Yup.string().required("Requerido"),
        est_civil_aseg: Yup.string().required("Requerido"),
        lugar_nacimiento_aseg: Yup.string().required("Requerido"),
        // fech_nacimiento_aseg: Yup.string().required("Requerido"),
        fech_nacimiento_aseg: Yup.date()
        .required("Requerido")
        .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
        .typeError('Por favor ingrese una fecha')
        .test('checkDateInPast', 'Fecha no puede ser futura',
          (d) => {
            return !!(d && d < new Date());
          }),
        nacionalidad_aseg: Yup.string().required("Requerido"),
        direccion_domicilio_aseg: Yup.string().required("Requerido"),
        telefono_domicilio_aseg: Yup.string().required("Requerido")
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        email_aseg: Yup.string()
          .required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
      })
      .when((values, schema) => {
        switch (values.tipo_identificacion_aseg) {
          case "C":
            return schema.shape({
              num_identificacion_aseg: Yup.string()
                .required("Requerido")
                .matches(/^\d{10}$/, "número inválido"),
            });
          case "U":
          case "R":
            return schema.shape({
              num_identificacion_aseg: Yup.string()
                .required("Requerido")
                .matches(/^\d{13}$/, "número inválido"),
            });
          case "P":
              return schema.shape({
                num_identificacion_aseg: Yup.string()
                .required("Requerido")
                .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
              });
          default:
            return schema.shape({
              num_identificacion_aseg: Yup.string().required("Requerido"),
            });
        }
      })
    }
  })
  .when((values, schema) => {
    if (values.select_asegurado === "N") {
      if (values.tipo_asegurado === "O" || values.tipo_asegurado === "") {
        // VALIDAR TIPO ASEGURADO OTROS
        return schema.shape({
          otro_asegurado: Yup.string().required("Requerido"),
        });
      }
    }
  })

  .when((values, schema) => {
    if (values.select_beneficiario === "N") {
      // SECTION BENEFICIARIO
      return schema.shape({
        beneficiario_bene: Yup.string().required("Requerido"),
        tipo_identificacion_bene: Yup.string().required("Requerido"),
        nombres_bene: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
        apellidos_bene: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
        sexo_bene: Yup.string().required("Requerido"),
        est_civil_bene: Yup.string().required("Requerido"),
        lugar_nacimiento_bene: Yup.string().required("Requerido"),
        
        // fech_nacimiento_bene: Yup.string().required("Requerido"),
        fech_nacimiento_bene: Yup.date()
        .required("Requerido")
        .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
        .typeError('Por favor ingrese una fecha')
        .test('checkDateInPast', 'Fecha no puede ser futura',
          (d) => {
            return !!(d && d < new Date());
          }),
        nacionalidad_bene: Yup.string().required("Requerido"),
        direccion_domicilio_bene: Yup.string().required("Requerido"),
        telefono_domicilio_bene: Yup.string().required("Requerido")
        .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        email_bene: Yup.string()
          .required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
      })
      .when((values, schema) => {
        switch (values.tipo_identificacion_bene) {
          case "C":
            return schema.shape({
              num_identificacion_bene: Yup.string()
                .required("Requerido")
                .matches(/^\d{10}$/, "número inválido"),
            });
          case "U":
          case "R":
            return schema.shape({
              num_identificacion_bene: Yup.string()
                .required("Requerido")
                .matches(/^\d{13}$/, "número inválido"),
              apellidos_bene: Yup.string()
                .notRequired()
                .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
              sexo_bene: Yup.string().notRequired(),
              est_civil_bene: Yup.string().notRequired(),
              lugar_nacimiento_bene: Yup.string().notRequired(),
              fech_nacimiento_bene: Yup.string()
                .notRequired()
            });
          case "P":
              return schema.shape({
                num_identificacion_bene: Yup.string()
                .required("Requerido")
                .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
              });
          default:
            return schema.shape({
              num_identificacion_bene: Yup.string().required("Requerido"),
            });
        }
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
      return schema.shape({
        tipo_identificacion_cony: Yup.string().required("Requerido"),
        num_identificacion_cony: Yup.string()
          .required("Requerido")
          .matches(/^\d{10}$/, "número inválido"),
        nombres_cony: Yup.string().matches(/^[A-Za-z ]*$/, "Nombre inválido").required("Requerido"),
        apellidos_cony: Yup.string().matches(/^[A-Za-z ]*$/, "Apellido inválido").required("Requerido"),
        email_cony: Yup.string()
                    .required("Requerido")
                    .email("el formato debe ser ejemplo: validar@example.com"),
        separacion_bienes_cony: Yup.string().required("Requerido"),
        actividad_eco_cony: Yup.string().required("Requerido"),
        domicilio_cony: Yup.string().required("Requerido"),
        pais_domicilio_cony: Yup.string().required("Requerido"),
      });
    }
  })
  .when((values, schema) => {
    if (
      values.est_civil == "02" ||
      values.est_civil == "04" ||
      values.est_civil == "06"
    ) {
      switch (values.tipo_identificacion_cony) {
        case "C":
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required("Requerido")
              .matches(/^\d{10}$/, "número inválido"),
          });
        case "R":
          return schema.shape({
            num_identificacion_cony: Yup.string()
              .required("Requerido")
              .matches(/^\d{13}$/, "número inválido"),
          });
        case "P":
            return schema.shape({
              num_identificacion_cony: Yup.string()
              .required("Requerido")
              .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
            });
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string().required("Requerido"),
          });
      }
    }
  })
  .when((values, schema) => {
    if (values.select_beneficiario === "N") {
      if (
        values.beneficiario_bene === "O" ||
        values.beneficiario_bene === ""
      ) {
        // VALIDAR TIPO ASEGURADO OTROS
        return schema.shape({
          otro_asegurado_bene: Yup.string().required("Requerido"),
        });
      }
    }
  })
  .when((values,schema)=>{
    if(values.sexo_bene == 'O'){
      return schema.shape({
        otro_genero_bene:Yup.string().required("Requerido")
      });
      
    }else{
      return schema.shape({
        otro_genero_bene:Yup.string().notRequired(),
      });
    }
  })
  
  ;
