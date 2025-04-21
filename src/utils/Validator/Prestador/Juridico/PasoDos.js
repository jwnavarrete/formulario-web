import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // REPRESENTAN.TE

    nombres: Yup.string()
      .required("Requerido")
      .matches(/^[A-Za-zñÑ\s]+$/, "Nombre inválido"),
    apellidos: Yup.string()
      .required("Requerido")
      .matches(/^[A-Za-zñÑ\s]+$/, "Apellido inválido"),
    tipo_identificacion: Yup.string().required("Requerido"),
    nacionalidad: Yup.string().required("Requerido"),
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
    edad:Yup.number().typeError(
          "Campo debe ser numérico"
        ),
    profesion: Yup.string().required("Requerido"),
    pais_domicilio: Yup.string().required("Requerido"),
    ciudad_domicilio: Yup.string().required("Requerido"),
    telefono_domicilio: Yup.string().required("Requerido")
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    direccion_domicilio: Yup.string().required("Requerido"),
    // lugar_nacimiento: Yup.string().required("Requerido"),
    email: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    // email_recibir: Yup.string()
    //   .required("Requerido")
    //   .email("el formato debe ser ejemplo: validar@example.com"),
    
  })
  // ******* REPRESENTANTE ********
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
      case "P":
        return schema.shape({
          num_identificacion: Yup.string()
          .required("Requerido")
          .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
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
      values.est_civil == "04"
    ) {
      // SECTION CONYUGE
      return schema.shape({
        tipo_identificacion_cony: Yup.string().required("Requerido"),        
        nombres_cony: Yup.string().matches(/^[A-Za-z ]*$/, "Nombre inválido").required("Requerido"),
        apellidos_cony: Yup.string().matches(/^[A-Za-z ]*$/, "Apellido inválido").required("Requerido"),
        email_cony: Yup.string().required("Requerido").email("el formato debe ser ejemplo: validar@example.com"),
        domicilio_cony: Yup.string().required("Requerido"),
        separacion_bienes_cony: Yup.string().required("Requerido"),
        nacionalidad_cony: Yup.string().required("Requerido"),
      });
    }
  }).when((values, schema) => {
    if (
      values.est_civil == "02" ||
      values.est_civil == "04"
    ) {
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
            .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
          });               
        default:
          return schema.shape({
            num_identificacion_cony: Yup.string().required("Requerido"),
          });
      }
    }

  }).when((values,schema)=>{
    if (values.tipo_prestador == '01') {
      return schema.shape({
        tipo_identificacion: Yup.string().notRequired(),
        num_identificacion: Yup.string().notRequired(),
        nombres: Yup.string().notRequired().matches(/^[A-Za-z ]*$/, "Nombre inválido"),
        apellidos: Yup.string().matches(/^[A-Za-z ]*$/, "Apellido inválido"),
        apellidos: Yup.string().notRequired(),
        sexo: Yup.string().notRequired(),
        provincia_domicilio : Yup.string().notRequired(),
        est_civil: Yup.string().notRequired(),
        nacionalidad: Yup.string().notRequired(),
        pais_domicilio: Yup.string().notRequired(),
        canton_domicilio: Yup.string().notRequired(),
        ciudad_domicilio: Yup.string().notRequired(),
        //telefono_domicilio: Yup.string().notRequired(),
        direccion_domicilio: Yup.string().notRequired(),
        //email: Yup.string().notRequired(),
        edad:Yup.string().notRequired(),
        profesion :Yup.string().notRequired(),
        //conyuge
        num_identificacion_cony:Yup.string().notRequired(), 
        tipo_identificacion_cony:Yup.string().notRequired(),       
        nombres_cony:Yup.string().notRequired(),
        apellidos_cony: Yup.string().notRequired(),
        email_cony: Yup.string().notRequired(),
        domicilio_cony: Yup.string().notRequired(),
        separacion_bienes_cony: Yup.string().notRequired(),
        nacionalidad_cony: Yup.string().notRequired(),
      });
    }
  }).when(
    (values, schema) => {
      if (values.tipo_prestador == "01"  && (values.est_civil == "02" || values.est_civil == "04") &&  (values.email_cony && values.email_cony.trim()!='')) {
        return schema.shape({
          email_cony: Yup.string().required("Requerido").email("el formato debe ser ejemplo: validar@example.com"),
        })
        
      }
    }
  )
  
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
  )
  .when((values, schema) => {
    // VALIDACION DE PROVINCIA
    if ((values.pais_domicilio == "EC")) {
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
  }).when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  ( values.telefono_domicilio.trim()!='')) {
        return schema.shape({
          telefono_domicilio: Yup.string().required("Requerido")
                  .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        })
      }else if(values.tipo_prestador == "01" && (values.telefono_domicilio.trim()=='')){
        return schema.shape({
          telefono_domicilio: Yup.string().notRequired(),
          
        })
      }
    }
  )
  .when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  ( values.email.trim()!='')) {
        return schema.shape({
          email: Yup.string()
          .required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
        })
      }else if(values.tipo_prestador == "01" && (values.email.trim()=='')){
        return schema.shape({
          email: Yup.string().notRequired(),
          
        })
      }
    }
  );

  



  