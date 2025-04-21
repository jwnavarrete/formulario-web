import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    tipo_prestador: Yup.string().required("Requerido"),
    nombres: Yup.string()
      .required("Requerido")
      .matches(/^[A-Za-zñÑ\s]+$/, "Nombre inválido"),
    apellidos: Yup.string()
      .required("Requerido")
      .matches(/^[A-Za-zñÑ\s]+$/, "Apellido inválido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    nacionalidad: Yup.string().required("Requerido"),
    profesion: Yup.string().required("Requerido"),
    edad:Yup.number().typeError(
      "Campo debe ser numérico"
    ),
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
    pais_domicilio: Yup.string().required("Requerido"),
    ciudad_domicilio: Yup.string().required("Requerido"),
    // telefono_convencional: Yup.string().required("Requerido")
    //                   .matches(/^\d{1,13}$/,'Número inválido'),
    telefono_convencional: Yup.string().required("Requerido")
      .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    telefono_celular: Yup.string().required("Requerido")
      .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    direccion_domicilio: Yup.string().required("Requerido"),
    lugar_nacimiento: Yup.string().required("Requerido"),
    // persona_contacto: Yup.string().required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    // email_recibir: Yup.string()
    //   .required("Requerido")
    //   .email("el formato debe ser ejemplo: validar@example.com"),
    // select_asegurado: Yup.string().required("Requerido"),
    // select_beneficiario: Yup.string().required("Requerido"),
    regimen: Yup.string().required("Requerido"),
    is_contrib_especial: Yup.string().required("Requerido"),
    celular_contacto: Yup.string().required("Requerido")
                .matches(/^\d{7,13}$/,'Número telefónico inválido'),
            
    /*val_asegurado: Yup.number()
                .typeError("Campo debe ser numérico")
                .required("Suma asegurada es requerida")
                .min(1, "Debe ser mayor a cero"),*/
  })
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if ((values.pais_domicilio == "EC" || values.pais_domicilio == "") && values.tipo_prestador != "01") {
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
      case "U":
        return schema.shape({
          num_identificacion: Yup.string()
            .required("Requerido")
            //.matches(/^\d{13}$/, "número inválido"),
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
          .matches(/^[A-Za-z ]*$/, "Nombre inválido"),
        apellidos_cony: Yup.string()
          .required("Requerido")
          .matches(/^[A-Za-z ]*$/, "Apellido inválido"),
        actividad_eco_cony: Yup.string().required("Requerido"),
        domicilio_cony: Yup.string().required("Requerido"),
        nacionalidad_cony: Yup.string().required("Requerido")
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
        case "P":
          return schema.shape({
            num_identificacion_cony: Yup.string()
            .required("Requerido")
            .matches(/^[a-zA-Z0-9]+$/, "número inválido"),
          });
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string().required("Requerido"),
          });
      }
    }
  })
  .when((values,schema) =>{
    if(values.is_contrib_especial == 'S'){
      return schema.shape({
        gran_contrib: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        gran_contrib: Yup.string().notRequired()
      })
    }
  })
  .when((values,schema)=>{
    if (values.tipo_prestador == "01") {
      return schema.shape({
        tipo_prestador: Yup.string().notRequired(),
      tipo_identificacion: Yup.string().notRequired(),
      nacionalidad: Yup.string().notRequired(),
      profesion: Yup.string().notRequired(),
      sexo: Yup.string().notRequired(),
      est_civil: Yup.string().notRequired(),
      pais_domicilio: Yup.string().notRequired(),
      ciudad_domicilio: Yup.string().notRequired(),
      telefono_convencional: Yup.string().notRequired(),
      
      direccion_domicilio: Yup.string().notRequired(),
      lugar_nacimiento: Yup.string().notRequired(),
      email: Yup.string()
        .notRequired()
        .email("el formato debe ser ejemplo: validar@example.com"),
      regimen: Yup.string().notRequired(),
      is_contrib_especial : Yup.string().notRequired(),
      gran_contrib: Yup.string().notRequired(),
      canton_domicilio: Yup.string().notRequired(),
      edad:Yup.string().notRequired(),

      val_asegurado: Yup.string().notRequired(),
      /* datos del conyuge */
      tipo_identificacion_cony: Yup.string().notRequired(),
      num_identificacion_cony:Yup.string().notRequired(),
      nombres_cony: Yup.string().notRequired(),
      apellidos_cony: Yup.string().notRequired(),
      actividad_eco_cony: Yup.string().notRequired(),
      domicilio_cony: Yup.string().notRequired(),
      nacionalidad_cony: Yup.string().notRequired(),
    })
    }
  })
  .when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  values.fech_nacimiento.trim()!='') {
        return schema.shape({
          fech_nacimiento: Yup.date()
            .notRequired()
            .min(new Date('1900-01-01'), 'Fecha debe ser mayor a 01/01/1900.')
            .typeError('Por favor ingrese una fecha')
            .test('checkDateInPast', 'Fecha no puede ser futura',
              (d) => {
                return !!(d && d < new Date());
              })
        })
      }else if(values.tipo_prestador == "01" &&  values.fech_nacimiento.trim()==''){
        return schema.shape({
          fech_nacimiento: Yup.string()
          .notRequired()
        })
      }
    }
  ).when((values,schema) =>{
    if(values.is_contrib_especial == 'S'){
      return schema.shape({
        gran_contrib: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
      gran_contrib: Yup.string().notRequired()
      })
    }
  }).when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  values.celular_contacto.trim()!='') {
        return schema.shape({
          celular_contacto: Yup.string().required()
          .matches(/^\d{7,13}$/,'Número inválido'),
        })
      }else if(values.tipo_prestador == "01" &&  values.celular_contacto.trim()==''){
        return schema.shape({
          celular_contacto: Yup.string().notRequired(),
          
        })
      }
    }
  ).when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  values.telefono_celular.trim()!='') {
        return schema.shape({
          telefono_celular: Yup.string().required()
          .matches(/^\d{7,13}$/,'Número inválido'),
        })
      }else if(values.tipo_prestador == "01" &&  values.telefono_celular.trim()==''){
        return schema.shape({
          telefono_celular: Yup.string().notRequired(),
          
        })
      }
    }
  ).when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  values.telefono_convencional.trim()!='') {
        return schema.shape({
          telefono_convencional: Yup.string().required()
          .matches(/^\d{1,13}$/,'Número inválido'),
        })
      }else if(values.tipo_prestador == "01" &&  values.telefono_convencional.trim()==''){
        return schema.shape({
          telefono_convencional: Yup.string().notRequired(),
          
        })
      }
    }
  );


 