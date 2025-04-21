import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    // PAGINA 3///
    // // SECCION EMISION DE FACTURA//
    solicitante: Yup.string().required("Requerido"),

    // SECCION INFORMACION ADICIONAL//
    referido: Yup.string().required("Requerido"),
    // 


    referencias: Yup.number()
      .typeError("Por favor ingrese una referencia")
      .required("Por favor ingrese una referencia")
      .min(1, "Por favor ingrese una referencia"),
    // SECCION PEP//
    // seleccionar_pep: Yup.string().required("Requerido"),

    // CANAL VINCULACION///
     tipo_cliente_vinculacion: Yup.string().required("Requerido"),
     nombre_referido: Yup.string().required("Requerido"),
    
    // FORMA DE PAGO //
    forma_pago: Yup.string().required("Requerido"),
    
    //::CANAL DE PAGO
    institucion_pago: Yup.string().required("Requerido"),
    tipo_cuenta_pago: Yup.string().required("Requerido"),
    num_tarjeta: Yup.string()
    .required("Requerido")
    .matches(/^[X ]{14,}\d{4}$/, "Número inválido"),
  
  })
  .when((values, schema) => {
    if (values.tipo_cuenta_pago === "O") {
      return schema
        .shape({
          tipo_cuenta_otro: Yup.string().required("Requerido"),
        })
    }
  })
  .when((values, schema) => {
    if (values.referido === "S") {
      return schema
        .shape({
          nombre_apellido: Yup.string().required("Requerido"),
          vinculo: Yup.string().required("Requerido"),
        })
    }
  })
  .when((values, schema) => {
    if (values.referido === "S" && (values.vinculo === "S" || values.vinculo === "") && values.tip_prestador != '01') {
      return schema
        .shape({
          especifique: Yup.string().required("Requerido"),
        })
    }
  })
  .when((values, schema) => {
    if (values.referido === "S" && (values.vinculo === "S" || values.vinculo === "" || values.vinculo === "O") && values.tip_prestador != '01') {
      return schema
        .shape({
          especifique: Yup.string().required("Requerido"),
        })
    }
  })

  // Emisión de factura
  .when((values, schema) => {
    if (values.solicitante === "O" && values.tip_prestador != "01") {
      return schema
        .shape({
          nombre_razonsocial: Yup.string().required("Requerido"),
          tipoid: Yup.string().required("Requerido"),
          
          direccion_fac: Yup.string().required("Requerido"),
          relacionsolicitante: Yup.string().required("Requerido"),
          num_identificacion_fac: Yup.string().required("Requerido"),
        })
        .when((values, schema) => {
          switch (values.tipoid) {
            case "C":
              return schema.shape({
                num_identificacion_fac: Yup.string()
                  .required("Requerido")
                  .matches(/^\d{10}$/, "número inválido"),
              });
            case "R":
              return schema.shape({
                num_identificacion_fac: Yup.string()
                  .required("Requerido")
                  .matches(/^\d{13}$/, "número inválido"),
              });
            case "P":
              return schema.shape({
                num_identificacion_fac: Yup.string()
                .required("Requerido")
                .matches(/^[a-zA-Z0-9]+$/, "Identificación inválida"),
              });
            default:
              return schema.shape({
                num_identificacion_fac: Yup.string().required("Requerido"),
              });
          }
        });
    }
  })

  // VALIDAR  INFORMACION ADICIONAL//
  .when((values, schema) => {
    if (values.esProveedor === false) {
      return schema.shape({
        pregunta1: Yup.string().required("Requerido"),
        pregunta2: Yup.string().required("Requerido"),
        pregunta3: Yup.string().required("Requerido"),
        pregunta4: Yup.string().required("Requerido"),
        pregunta5: Yup.string().required("Requerido"),
        pregunta6: Yup.string().required("Requerido"),
        pregunta7: Yup.string().required("Requerido"),
        pregunta8: Yup.string().required("Requerido"),
        pregunta9: Yup.string().required("Requerido"),
      })
        .when((values, schema) => {
          if ((values.pregunta1 === "NO" || values.pregunta1 === "NA" ) && values.tip_prestador != '01') {
            return schema.shape({
              respuesta1: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta2 === "NO" || values.pregunta2 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta2: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta3 === "NO" || values.pregunta3 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta3: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta4 === "NO" || values.pregunta4 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta4: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta5 === "NO" || values.pregunta5 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta5: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta6 === "NO" || values.pregunta6 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta6: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta7 === "NO" || values.pregunta7 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta7: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta8 === "NO" || values.pregunta8 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta8: Yup.string().required("Requerido"),
            })
          }
        })
        .when((values, schema) => {
          if ((values.pregunta9 === "NO" || values.pregunta9 === "NA") && values.tip_prestador != '01') {
            return schema.shape({
              respuesta9: Yup.string().required("Requerido"),
            })
          }
        })
    }
  })
  .when((values, schema) => {
    if (values.acreditacion_automatica === "S") {
      return schema.shape({
        tipo_identificacion: Yup.string().required("Requerido"),
        num_identificacion: Yup.string().required("Requerido"),
        representante_legal: Yup.string().required("Requerido"),
        direccion: Yup.string().required("Requerido"),
        
        /*mail_notificacion: Yup.string().required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),*/
        // especifique: Yup.string().required("Requerido"),
        entidad: Yup.string().required("Requerido"),
        banco: Yup.string().required("Requerido"),
        tipo_cuenta: Yup.string().required("Requerido"),
        numero_cuenta: Yup.string()
        .matches(/^\d{1,20}$/, "número inválido")
        .typeError("Campo debe ser numérico"),
        nombre: Yup.string().required("Requerido"),
      }).when((values, schema) => {
        if (
          values.acreditacion_automatica === "S") {
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
            case "U":
              return schema.shape({
                num_identificacion: Yup.string()
                  .required("Requerido")
                  .matches(/^\d{13}$/, "número inválido"),
              });
            case "P":
              case "P":
              return schema.shape({
                num_identificacion: Yup.string()
                .required("Requerido")
                .matches(/^[a-zA-Z0-9]+$/, "número inválido"),
              });
            default:
              return schema.shape({
                num_identificacion: Yup.string().required("Requerido"),
              });
          }
        }
      })
    }
    if(values.acreditacion_automatica === ""){
      return schema.shape({
        acreditacion_automatica: Yup.string().required("Requerido")
      })
    }
  }).when(
    (values, schema) => {
      if (values.tip_prestador == "01") {
        return schema.shape({

          pregunta1: Yup.string().notRequired(),
          pregunta2: Yup.string().notRequired(),
          pregunta3: Yup.string().notRequired(),
          pregunta4: Yup.string().notRequired(),
          pregunta5: Yup.string().notRequired(),
          pregunta6: Yup.string().notRequired(),
          pregunta7: Yup.string().notRequired(),
          pregunta8: Yup.string().notRequired(),
          pregunta9: Yup.string().notRequired(),

          acreditacion_automatica: Yup.string().notRequired(),
          referido: Yup.string().notRequired(),
          nombre_apellido: Yup.string().notRequired(),
          vinculo: Yup.string().notRequired(),
          //:: acreditacion automática
          tipo_identificacion: Yup.string().notRequired(),
          num_identificacion: Yup.string().notRequired(),
          representante_legal: Yup.string().notRequired(),
          direccion: Yup.string().notRequired(),
         
          //mail_notificacion: Yup.string().notRequired(),
          entidad: Yup.string().notRequired(),
          banco: Yup.string().notRequired(),
          tipo_cuenta: Yup.string().notRequired(),
          numero_cuenta: Yup.string().notRequired(),
          nombre: Yup.string().notRequired(),
          referencias : Yup.string().notRequired(),
          //::Emisión de factura
          solicitante: Yup.string().notRequired(),
          nombre_razonsocial: Yup.string().notRequired(),
          tipoid: Yup.string().notRequired(),
          direccion_fac: Yup.string().notRequired(),
          relacionsolicitante: Yup.string().notRequired(),
          num_identificacion_fac: Yup.string().notRequired(),
          
          //::Canal de vinculación
          tipo_cliente_vinculacion: Yup.string().notRequired(),
          nombre_referido: Yup.string().notRequired(),
          //::Forma de Pago
          forma_pago: Yup.string().notRequired(),
          institucion_pago: Yup.string().notRequired(),
          tipo_cuenta_pago: Yup.string().notRequired(),
          num_tarjeta: Yup.string().notRequired(),
  
          

        })
      }
    }
  ).when(
    (values, schema) => {
      if (values.tip_prestador == "01" && (values.telefono && values.telefono.trim()!='')) {
        return schema.shape({
          telefono: Yup.string().required('Requerido')
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        })
      }else if(values.tip_prestador == "01" && (values.telefono &&   values.telefono.trim()=='')){
        return schema.shape({
          telefono: Yup.string().notRequired(),
          // telefono: Yup.string().required()
          // .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        })
      }else if(values.tip_prestador != "01" &&   values.acreditacion_automatica == 'S'){
        return schema.shape({
          telefono: Yup.string().required('Requerido')
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
          
        })
      }
    }
  ).when(
    (values, schema) => {
      if (values.tip_prestador == "01" && (values.mail_notificacion && values.mail_notificacion.trim()!='')) {
        return schema.shape({
          mail_notificacion: Yup.string().required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
        })
      }else if(values.tip_prestador == "01" && (values.mail_notificacion &&   values.mail_notificacion.trim()=='')){
        return schema.shape({
          mail_notificacion: Yup.string().notRequired(),
          
        })
      }else if(values.tip_prestador != "01" &&   values.acreditacion_automatica == 'S'){
        return schema.shape({
          mail_notificacion: Yup.string().required("Requerido")
          .email("el formato debe ser ejemplo: validar@example.com"),
          
        })
      }
    }


    
  )
  
  .when(
    (values, schema) => {
      if (values.tip_prestador == "01" &&  (values.telefono_fac &&  values.telefono_fac.trim()!='')) {
        return schema.shape({
          // telefono_fac: Yup.string().required("Requerido").matches(/^\d{1,13}$/,'Número inválido'),
          telefono_fac: Yup.string().required("Requerido")
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
        })
      }else if(values.tip_prestador == "01"  && (values.telefono_fac && values.telefono_fac.trim()=='')){
        return schema.shape({
          telefono_fac: Yup.string().notRequired(),
          
        })
      }else if(values.tip_prestador !== "01" && values.solicitante === "O"){
        return schema.shape({
          telefono_fac: Yup.string().required()
          .matches(/^\d{7,13}$/,'Número telefónico inválido'),
          // telefono_fac: Yup.string().required("Requerido").matches(/^\d{1,13}$/,'Número inválido'),
          
        })
      }
    }
  );


  



  