const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "created_at", headerName: "Fecha Creación", width: 200 },
  {
    field: "estado", headerName: "Estado", width: 100, renderCell: (params) => {
      switch (params.value) {
        case 'T':
          return 'Terminado';
        case 'A':
          return 'Aprobado';
        case 'P':
          return 'Pendiente';
        default:
          return params.value;
      }
    }
  },
  { field: "steep", headerName: "Steep", width: 100 },
  {
    field: "tip_identificacion", headerName: "Tipo Identificación", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'C':
          return 'Cédula';
        case 'R':
          return 'Ruc';
        case 'P':
          return 'Pasaporte';
        default:
          return params.value;
      }
    }
  },
  { field: "identificacion", headerName: "Identificación", width: 150 },
  { field: "nombres", headerName: "Nombres", width: 200 },
  { field: "apellidos", headerName: "Apellidos", width: 200 },
  { field: "titulo", headerName: "Título", width: 250 },
  { field: "lugar_nacimiento", headerName: "Lugar Nacimiento", width: 200 },
  { field: "fech_nacimiento", headerName: "Fecha Nacimiento", width: 150 },
  { field: "edad", headerName: "Edad", width: 100 },
  {
    field: "sexo", headerName: "Sexo", width: 100, renderCell: (params) => {
      switch (params.value) {
        case 'M':
          return 'Masculino';
        case 'F':
          return 'Femenino';
        case 'O':
          return 'Otro';
        case 'N':
          return 'No especificado';
        default:
          return params.value;
      }
    }
  },
  {
    field: "est_civil", headerName: "Estado Civil", width: 150, renderCell: (params) => {
      switch (params.value) {
        case '01':
          return 'Soltero';
        case '02':
          return 'Casado';
        case '03':
          return 'Viudo';
        case '04':
          return 'Unión de hecho';
        case '05':
          return 'Divorciado';
        default:
          return params.value;
      }
    }
  },
  { field: "tipo_sangre", headerName: "Tipo Sangre", width: 150 },
  { field: "direccion_domicilio", headerName: "Dirección Domicilio", width: 250 },
  { field: "telefono_personal", headerName: "Teléfono Personal", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "tiene_vehiculo", headerName: "Tiene Vehículo", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  { field: "placa", headerName: "Placa", width: 150 },
  { field: "marca", headerName: "Marca", width: 150 },
  { field: "modelo", headerName: "Modelo", width: 150 },
  { field: "anio", headerName: "Año", width: 100 },
  {
    field: "tipo_identificacion_cony", headerName: "Tipo Identificación Cónyuge", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'C':
          return 'Cédula';
        case 'P':
          return 'Pasaporte';
        default:
          return params.value;
      }
    }
  },
  { field: "num_identificacion_cony", headerName: "Número Identificación Cónyuge", width: 200 },
  { field: "nombres_cony", headerName: "Nombres Cónyuge", width: 200 },
  { field: "apellidos_cony", headerName: "Apellidos Cónyuge", width: 200 },
  { field: "nombre_inst_primaria", headerName: "Nombre Inst Primaria", width: 200 },
  { field: "lugar_primaria", headerName: "Lugar Primaria", width: 200 },
  { field: "anio_crusado_primaria", headerName: "Anio Crusado Primaria", width: 200 },
  { field: "anio_salida_primaria", headerName: "Anio Salida Primaria", width: 200 },
  { field: "nombre_inst_secundaria", headerName: "Nombre Inst. Secundaria", width: 200 },
  { field: "lugar_secundaria", headerName: "Lugar Secundaria", width: 200 },
  { field: "anio_crusado_secundaria", headerName: "Anio Crusado Secundaria", width: 200 },
  { field: "anio_salida_secundaria", headerName: "Anio Salida Secundaria", width: 200 },
  { field: "nombre_inst_superior", headerName: "Nombre Inst. Superior", width: 200 },
  { field: "lugar_superior", headerName: "Lugar Superior", width: 200 },
  { field: "anio_crusado_superior", headerName: "Anio crusado superior", width: 200 },
  { field: "anio_salida_superior", headerName: "Anio salida superior", width: 200 },
  {
    field: "tiene_certificaciones", headerName: "Tiene certificaciones", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  {
    field: "tiene_idiomas", headerName: "Tiene idiomas", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_excel", headerName: "Nivel Excel", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_word", headerName: "Nivel Word", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_powerpoint", headerName: "Nivel PowerPoint", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_outlook", headerName: "Nivel Outlook", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_project", headerName: "Nivel Project", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "nivel_visio", headerName: "Nivel Visio", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'B':
          return 'Básico';
        case 'I':
          return 'Intermedio';
        case 'A':
          return 'Avanzado';
        case 'N':
          return 'No aplica';
        default:
          return params.value;
      }
    }
  },
  {
    field: "tiene_superior", headerName: "Tiene superior", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  { field: "idioma", headerName: "Idioma", width: 150 },
  { field: "porc_hablado", headerName: "Porcentaje Hablado", width: 150 },
  { field: "porc_escrito", headerName: "Porcentaje Escrito", width: 150 },
  { field: "porc_lectura", headerName: "Porcentaje Lectura", width: 150 },
  {
    field: "tiene_refe_comercial", headerName: "Tiene Referencia Comercial", width: 200, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  {
    field: "tipo_cuenta", headerName: "Tipo Cuenta", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'A':
          return 'Ahorro';
        case 'C':
          return 'Corriente';
        default:
          return params.value;
      }
    }
  },
  { field: "institucion_financiera", headerName: "Institución Financiera", width: 200 },
  { field: "numero_cuenta", headerName: "Número Cuenta", width: 200 },
  { field: "nombre_tarjeta_comercial", headerName: "Nombre Tarjeta Comercial", width: 250 },
  { field: "inst_financiera_comercial", headerName: "Institución Financiera Comercial", width: 250 },
  { field: "tipo_cuenta_comercial", headerName: "Tipo Cuenta Comercial", width: 200 },
  { field: "ingreso_mensual", headerName: "Ingreso Mensual", width: 150 },
  { field: "activos", headerName: "Activos", width: 150 },
  { field: "pasivos", headerName: "Pasivos", width: 150 },
  { field: "patrimonio", headerName: "Patrimonio", width: 150 },
  {
    field: "otro_ingreso", headerName: "Otro Ingreso", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  { field: "fuente_ingreso", headerName: "Fuente Ingreso", width: 200 },
  { field: "total_otros_ingresos", headerName: "Total Otros Ingresos", width: 200 },
  {
    field: "tiene_referencias", headerName: "Tiene Referencias", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  { field: "correo_empleado", headerName: "Correo Empleado", width: 200 },
  { field: "correo_ejecutivo", headerName: "Correo RRHH", width: 200 },
  // { field: "hash", headerName: "Hash", width: 200 },
  { field: "lugar_declaracion", headerName: "Lugar Declaración", width: 200 },
  {
    field: "acceptTerms", headerName: "Acepta Términos", width: 150, renderCell: (params) => {
      switch (params.value) {
        case 'S':
          return 'Si';
        case 'N':
          return 'No';
        default:
          return params.value;
      }
    }
  },
  { field: "identificacion_ejecutivo", headerName: "Identificación Ejecutivo", width: 200 },
  { field: "nombre_ejecutivo", headerName: "Nombre Ejecutivo", width: 200 },
  { field: "perfil_cargo", headerName: "Perfil Cargo", width: 200 },
  { field: "perfil_competencias", headerName: "Perfil Competencias", width: 200 }
];

export { columns };