import {
  setActividadEconomica,
  estadoCivilValue,
  tipoIdentificacion,
  getEstado,
  tipoPersona,
  setTipoVinculacion,
  setValueSiNo,
  setValueZona,
  formatCurrency,
  getSexo,
} from './funciones'

const columnsNatural = [
  {
    field: 'formulario_beneficiario_id',
    headerName: 'Formulario ID',
    width: 200,
  },
  {
    field: 'tip_persona',
    headerName: 'Tipo Persona',
    width: 150,
    renderCell: (params) => {
      return tipoPersona(params.value)
    },
  },
  {
    field: 'tip_identificacion',
    headerName: 'Tipo Identificación',
    width: 150,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  { field: 'identificacion', headerName: 'Identificación', width: 150 },
  {
    field: 'correo_beneficiario',
    headerName: 'Correo Beneficiario',
    width: 200,
  },
  { field: 'correo_ejecutivo', headerName: 'Correo Ejecutivo', width: 200 },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 100,
    renderCell: (params) => {
      return getEstado(params.value)
    },
  },
  { field: 'steep', headerName: 'Steep', width: 100 },
  // { field: "firma_id", headerName: "Firma ID", width: 150 },
  // { field: "ruta", headerName: "Ruta", width: 200 },
  // { field: "archivo", headerName: "Archivo", width: 200 },
  { field: 'created_at', headerName: 'Fecha Creación', width: 200 },
  // { field: "firma_ejecutivo_id", headerName: "Firma Ejecutivo ID", width: 200 },
  // { field: 'formulario_id', headerName: 'Formulario ID', width: 150 },
  // { field: "hash", headerName: "Hash", width: 200 },
  // { field: "info_beneficiario_id", headerName: "Info Ben. ID", width: 200 },
  // { field: "actividad_economica_id", headerName: "Act. Eco. ID", width: 200 },
  // { field: "informacion_financiera_id", headerName: "Info. Fin. ID", width: 200 },
  // { field: "declaracion_id", headerName: "Declaración ID", width: 200 },
  {
    field: 'beneficiario_tipo_identificacion',
    headerName: 'Ben. Tipo Identificación',
    width: 200,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  {
    field: 'beneficiario_num_identificacion',
    headerName: 'Ben. Núm. Identificación',
    width: 200,
  },
  { field: 'beneficiario_apellidos', headerName: 'Ben. Apellidos', width: 200 },
  { field: 'beneficiario_nombres', headerName: 'Ben. Nombres', width: 200 },
  {
    field: 'beneficiario_sexo',
    headerName: 'Ben. Sexo',
    width: 100,
    renderCell: (params) => {
      return getSexo(params.value)
    },
  },
  {
    field: 'beneficiario_est_civil',
    headerName: 'Ben. Estado Civil',
    width: 200,
    renderCell: (params) => {
      return estadoCivilValue(params.value)
    },
  },
  {
    field: 'beneficiario_lugar_nacimiento',
    headerName: 'Ben. Lugar Nacimiento',
    width: 200,
  },
  {
    field: 'beneficiario_fech_nacimiento',
    headerName: 'Ben. Fecha Nacimiento',
    width: 200,
  },
  {
    field: 'beneficiario_direccion_domicilio',
    headerName: 'Ben. Dirección Domicilio',
    width: 200,
  },
  // { field: "beneficiario_pais_domicilio", headerName: "Ben. País Domicilio", width: 200 },
  {
    field: 'beneficiario_pais_descripcion',
    headerName: 'Ben. País',
    width: 200,
  },
  {
    field: 'beneficiario_ciudad_domicilio',
    headerName: 'Ben. Ciudad Domicilio',
    width: 200,
  },
  // {
  //   field: 'beneficiario_provincia_domicilio',
  //   headerName: 'Ben. Provincia Domicilio',
  //   width: 200,
  // },
  {
    field: 'beneficiario_provincia_descripcion',
    headerName: 'Ben. Provincia',
    width: 200,
  },
  {
    field: 'beneficiario_canton_domicilio_desc',
    headerName: 'Ben. Cantón Domicilio',
    width: 200,
  },
  { field: 'beneficiario_profesion', headerName: 'Ben. Profesión', width: 200 },
  { field: 'beneficiario_edad', headerName: 'Ben. Edad', width: 100 },
  {
    field: 'beneficiario_telefono_domicilio',
    headerName: 'Ben. Teléfono Domicilio',
    width: 200,
  },
  { field: 'beneficiario_celular', headerName: 'Ben. Celular', width: 200 },
  {
    field: 'beneficiario_persona_contacto',
    headerName: 'Ben. Persona Contacto',
    width: 200,
  },
  {
    field: 'beneficiario_email_contanto',
    headerName: 'Ben. Email Contacto',
    width: 200,
  },
  // { field: "beneficiario_nacionalidad", headerName: "Ben. Nacionalidad", width: 200 },
  {
    field: 'beneficiario_nacionalidad_descripcion',
    headerName: 'Ben. Nacionalidad',
    width: 200,
  },
  {
    field: 'beneficiario_nombres_cony',
    headerName: 'Ben. Nombres Cónyuge',
    width: 200,
  },
  // {
  //   field: 'beneficiario_lugar_nacimiento_cony',
  //   headerName: 'Ben. Lugar Nacimiento Cónyuge',
  //   width: 200,
  // },
  {
    field: 'beneficiario_actividad_eco_cony',
    headerName: 'Ben. Act. Eco. Cónyuge',
    width: 200,
  },
  {
    field: 'beneficiario_domicilio_cony',
    headerName: 'Ben. Domicilio Cónyuge',
    width: 300,
  },
  // { field: "beneficiario_nacionalidad_cony", headerName: "Ben. Nac. Cónyuge", width: 200 },
  {
    field: 'beneficiario_nacionalidad_cony_descripcion',
    headerName: 'Ben. Nac. Cónyuge',
    width: 200,
  },
  // {
  //   field: 'beneficiario_pais_domicilio_cony',
  //   headerName: 'Ben. País Domicilio Cónyuge',
  //   width: 200,
  // },
  {
    field: 'beneficiario_pais_domicilio_cony_descripcion',
    headerName: 'Ben. País Domicilio Cónyuge',
    width: 200,
  },
  {
    field: 'beneficiario_email_cony',
    headerName: 'Ben. Email Cónyuge',
    width: 200,
  },
  {
    field: 'beneficiario_tipo_identificacion_cony',
    headerName: 'Ben. Tipo Identificación Cónyuge',
    width: 200,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  {
    field: 'beneficiario_num_identificacion_cony',
    headerName: 'Ben. Núm. Identificación Cónyuge',
    width: 200,
  },
  {
    field: 'beneficiario_vinculo_sol_aseg',
    headerName: 'Ben. Vínculo Solicitante Asegurado',
    width: 200,
    renderCell: (params) => {
      return setTipoVinculacion(params.value)
    },
  },
  {
    field: 'beneficiario_otro_asegurado',
    headerName: 'Ben. Otro Asegurado',
    width: 200,
  },
  {
    field: 'actividad_economica_ocupacion',
    headerName: 'Act. Eco. Ocupación',
    width: 200,
    renderCell: (params) => {
      return setActividadEconomica(params.value)
    },
  },
  {
    field: 'actividad_economica_ocupacion_especifique',
    headerName: 'Act. Eco. Ocupación Especifique',
    width: 200,
  },
  {
    field: 'actividad_economica_razon_social',
    headerName: 'Act. Eco. Razón Social',
    width: 200,
  },
  // { field: "actividad_economica_actividad_economica", headerName: "Act. Eco.", width: 200 },
  {
    field: 'actividad_economica_cargo',
    headerName: 'Act. Eco. Cargo',
    width: 200,
  },
  {
    field: 'actividad_economica_direccion_trabajo',
    headerName: 'Act. Eco. Dirección Trabajo',
    width: 200,
  },
  {
    field: 'actividad_economica_email',
    headerName: 'Act. Eco. Email',
    width: 200,
  },
  {
    field: 'actividad_economica_telefono_trabajo',
    headerName: 'Act. Eco. Teléfono Trabajo',
    width: 200,
  },
  {
    field: 'actividad_economica_barrio_sector',
    headerName: 'Act. Eco. Barrio Sector',
    width: 200,
  },
  {
    field: 'actividad_economica_ciudad_trabajo',
    headerName: 'Act. Eco. Ciudad Trabajo',
    width: 200,
  },
  { field: 'actividad_economica_fax', headerName: 'Act. Eco. Fax', width: 200 },
  // { field: "actividad_economica_pais_trabajo", headerName: "Act. Eco. País Trabajo", width: 200 },
  {
    field: 'actividad_economica_pais_trabajo_descripcion',
    headerName: 'Act. Eco. País Trabajo',
    width: 200,
  },
  {
    field: 'informacion_financiera_ingreso_mensuales',
    headerName: 'Info. Fin. Ingreso Mensuales',
    width: 200,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'informacion_financiera_otro_ingreso',
    headerName: 'Info. Fin. Otro Ingreso',
    width: 200,
    renderCell: (params) => {
      return setValueSiNo(params.value)
    },
  },
  {
    field: 'informacion_financiera_activos',
    headerName: 'Info. Fin. Activos',
    width: 200,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'informacion_financiera_pasivos',
    headerName: 'Info. Fin. Pasivos',
    width: 200,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'informacion_financiera_patrimonio',
    headerName: 'Info. Fin. Patrimonio',
    width: 200,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'informacion_financiera_tipo_cliente_vinculacion',
    headerName: 'Info. Fin. Tipo Cliente Vinculación',
    width: 200,
    renderCell: (params) => {
      return setTipoVinculacion(params.value)
    },
  },
  {
    field: 'informacion_financiera_nombres_vinculacion',
    headerName: 'Info. Fin. Nombres Vinculación',
    width: 200,
  },
  {
    field: 'informacion_financiera_seleccionar_pep',
    headerName: 'Info. Fin. Seleccionar PEP',
    width: 200,
    renderCell: (params) => {
      return setValueSiNo(params.value)
    },
  },
  {
    field: 'informacion_financiera_otros_info',
    headerName: 'Info. Fin. Otros Info',
    width: 200,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'informacion_financiera_fuente_ingreso_info',
    headerName: 'Info. Fin. Fuente Ingreso Info',
    width: 200,
  },
  {
    field: 'declaracion_lugar_declaracion',
    headerName: 'Declaración Lugar Declaración',
    width: 200,
  },
  {
    field: 'declaracion_acceptterms',
    headerName: 'Declaración Aceptación Términos',
    width: 200,
    renderCell: (params) => {
      return setValueSiNo(params.value)
    },
  },
  // {
  //   field: 'declaracion_identificacion_ejecutivo',
  //   headerName: 'Declaración Identificación Ejecutivo',
  //   width: 200,
  // },
  {
    field: 'declaracion_nombre_ejecutivo',
    headerName: 'Declaración Nombre Ejecutivo',
    width: 200,
  },
  {
    field: 'declaracion_lugar_ejecutivo',
    headerName: 'Declaración Lugar Ejecutivo',
    width: 200,
  },
  {
    field: 'declaracion_sucursal',
    headerName: 'Declaración Sucursal',
    width: 200,
    renderCell: (params) => {
      return setValueZona(params.value)
    },
  },
  {
    field: 'declaracion_observaciones',
    headerName: 'Declaración Observaciones',
    width: 200,
  },
]

export { columnsNatural }
