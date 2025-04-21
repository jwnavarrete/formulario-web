import * as Yup from "yup";

export const validationSchema = Yup.object()
  .shape({
    tipo_prestador: Yup.string().required("Requerido"),
    // PRESTADOR DE SERVICIOS
    tipo_identificacion_empresa: Yup.string().required("Requerido"),
    num_identificacion_empresa: Yup.string().required("Requerido"),
    num_identificacion_empresa: Yup.string()
      .required("Requerido"),
      //.matches(/^\d{13}$/, "número inválido"),
    razon_social_empresa: Yup.string().required("Requerido"),
    sector_empresa: Yup.string().required("Requerido"),
    actividad_empresa: Yup.string().required("Requerido"),
    objeto_social_empresa: Yup.string().required("Requerido"),
    direccion_empresa: Yup.string().required("Requerido"),
    ciudad_empresa: Yup.string().required("Requerido"),
    correo_empresa: Yup.string()
      .required("Requerido")
      .email("el formato debe ser ejemplo: validar@example.com"),
    telefono_empresa: Yup.string().required("Requerido")
                .matches(/^\d{7,13}$/,'Número telefónico inválido'),
    pais_empresa: Yup.string().required("Requerido"),
    tipo_empresa: Yup.string().required("Requerido"),
    regimen: Yup.string().required("Requerido"),
    is_contrib_especial: Yup.string().required("Requerido"),

    tipo_inversion: Yup.string().required("Requerido"),
    situacion_legal: Yup.string().required("Requerido"),
    tipo_mercado: Yup.string().required("Requerido"),
  })
  .when((values, schema) => {
    
    if ((values.tipo_empresa == '36' || values.tipo_empresa == "") && values.tipo_prestador != "01") {
      return schema.shape({
        tipo_empresa_especifique: Yup.string().required("Requerido"),
      });
    }
  })
  .when((values, schema) => {
    
    if (values.sector_empresa == 7) {
      return schema.shape({
        sector_empresa_especifique: Yup.string().required("Requerido"),
      });
    }
  }).when((values,schema) =>{
    if(values.is_contrib_especial == 'S'){
      return schema.shape({
        gran_contrib: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        gran_contrib: Yup.string().notRequired()
      })
    }
  }).when((values,schema)=>{
    if (values.tipo_prestador == "01") {
      return schema.shape({
        tipo_identificacion_empresa: Yup.string().notRequired(),
        num_identificacion_empresa: Yup.string().notRequired(),
        num_identificacion_empresa: Yup.string()
          .notRequired(),
          //.matches(/^\d{13}$/, "número inválido"),
        sector_empresa: Yup.string().notRequired(),
        actividad_empresa: Yup.string().notRequired(),
        objeto_social_empresa: Yup.string().notRequired(),
        direccion_empresa: Yup.string().notRequired(),
        ciudad_empresa: Yup.string().notRequired(),
        correo_empresa: Yup.string()
          .notRequired()
          .email("el formato debe ser ejemplo: validar@example.com"),
       
        pais_empresa: Yup.string().notRequired(),
        tipo_empresa: Yup.string().notRequired(),
        regimen: Yup.string().notRequired(),
        is_contrib_especial: Yup.string().notRequired(),
        gran_contrib: Yup.string().notRequired(),
        tipo_inversion: Yup.string().notRequired(),
        situacion_legal: Yup.string().notRequired(),
        tipo_mercado: Yup.string().notRequired(),
      });
    }
  }).when((values,schema)=>{
    if (values.tipo_mercado == "O") {
      return schema.shape({
        tipo_mercado_especifique: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
        tipo_mercado_especifique: Yup.string().notRequired(),
      });
    }
  }).when(
    (values, schema) => {
      if (values.tipo_prestador == "01" &&  values.telefono_empresa.trim()!='') {
        return schema.shape({
          telefono_empresa: Yup.string().required()
          .matches(/^\d{7,13}$/,'Número inválido'),
        })
      }else if(values.tipo_prestador == "01" &&  values.telefono_empresa.trim()==''){
        return schema.shape({
          telefono_empresa: Yup.string().notRequired(),
          
        })
      }
    }
  )
  
  ;/*.when((values,schema) =>{
    if(values.regimen == 'contribuyente_especial'){
      return schema.shape({
        gran_contrib: Yup.string().required("Requerido"),
      });
    }else{
      return schema.shape({
      gran_contrib: Yup.string().notRequired()
      })
    }
  });*/
  