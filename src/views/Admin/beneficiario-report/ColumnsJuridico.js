import {
  estadoCivilValue,
  tipoIdentificacion,
  getEstado,
  tipoPersona,
  tipoMercadoDescri,
  setValueSiNo,
  setValueZona,
  formatCurrency,
  tipoEmpresa,
  getSexo,
} from './funciones'

const columnsJuridico = [
  { field: 'formulario_id', headerName: 'Formulario ID', width: 150 },
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
  // { field: 'firma_id', headerName: 'Firma ID', width: 150 },
  // { field: "ruta", headerName: "Ruta", width: 200 },
  // { field: "archivo", headerName: "Archivo", width: 200 },
  { field: 'created_at', headerName: 'Fecha Creación', width: 200 },
  // { field: 'firma_ejecutivo_id', headerName: 'Firma Ejecutivo ID', width: 150 },
  { field: 'tip_contribuyente', headerName: 'Tipo Contribuyente', width: 150 },
  // {
  //   field: 'benjur_formulario_id',
  //   headerName: 'Benjur Formulario ID',
  //   width: 200,
  // },
  // { field: "hash", headerName: "Hash", width: 200 },
  // { field: 'solicitante_id', headerName: 'Solicitante ID', width: 150 },
  // { field: 'Rep._apoderado_id', headerName: 'Rep. Apoderado ID', width: 200 },
  // { field: 'declaracion_id', headerName: 'Declaración ID', width: 150 },
  {
    field: 'patrimonio',
    headerName: 'Patrimonio',
    width: 150,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'pasivos',
    headerName: 'Pasivos',
    width: 150,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'activos',
    headerName: 'Activos',
    width: 150,
    renderCell: (params) => {
      return formatCurrency(params.value)
    },
  },
  {
    field: 'tipo_mercado',
    headerName: 'Tipo Mercado',
    width: 150,
    renderCell: (params) => {
      return tipoMercadoDescri(params.value)
    },
  },
  {
    field: 'tipo_mercado_especifique',
    headerName: 'Tipo Mercado Especifique',
    width: 200,
  },
  {
    field: 'tipo_empresa',
    headerName: 'Tipo Empresa',
    width: 150,
    renderCell: (params) => {
      return tipoEmpresa(params.value)
    },
  },
  {
    field: 'tipo_empresa_especifique',
    headerName: 'Tipo Empresa Especifique',
    width: 200,
  },
  { field: 'tipo_empresa_desc', headerName: 'Tipo Empresa', width: 200 },
  { field: 'ciudad_empresa', headerName: 'Ciudad Empresa', width: 150 },
  // { field: 'pais_empresa', headerName: 'País Empresa', width: 150 },
  { field: 'pais_empresa_desc', headerName: 'País Empresa', width: 200 },
  // { field: 'actividad_empresa', headerName: 'Actividad Empresa', width: 150 },
  {
    field: 'actividad_empresa_desc',
    headerName: 'Actividad Empresa',
    width: 200,
  },
  { field: 'telefono_empresa', headerName: 'Teléfono Empresa', width: 150 },
  { field: 'correo_empresa', headerName: 'Correo Empresa', width: 200 },
  { field: 'direccion_empresa', headerName: 'Dirección Empresa', width: 200 },
  {
    field: 'objeto_social_empresa',
    headerName: 'Objeto Social Empresa',
    width: 200,
  },
  { field: 'tipo_inversion', headerName: 'Tipo Inversión', width: 150 },
  {
    field: 'razon_social_empresa',
    headerName: 'Razón Social Empresa',
    width: 200,
  },
  {
    field: 'num_identificacion_empresa',
    headerName: 'Número Identificación Empresa',
    width: 200,
  },
  {
    field: 'tipo_identificacion_empresa',
    headerName: 'Tipo Identificación Empresa',
    width: 200,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  {
    field: 'seleccionar_pep',
    headerName: 'Seleccionar PEP',
    width: 150,
    renderCell: (params) => {
      return setValueSiNo(params.value)
    },
  },
  {
    field: 'rep_tipo_identificacion',
    headerName: 'Rep. Tipo Identificación',
    width: 200,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  {
    field: 'rep_num_identificacion',
    headerName: 'Rep. Número Identificación',
    width: 200,
  },
  { field: 'rep_nombres', headerName: 'Rep. Nombres', width: 200 },
  { field: 'rep_apellidos', headerName: 'Rep. Apellidos', width: 200 },
  { field: 'rep_email', headerName: 'Rep. Email', width: 200 },
  {
    field: 'rep_telefono_celular',
    headerName: 'Rep. Teléfono Celular',
    width: 200,
  },
  {
    field: 'rep_telefono_domicilio',
    headerName: 'Rep. Teléfono Domicilio',
    width: 200,
  },
  {
    field: 'rep_fech_nacimiento',
    headerName: 'Rep. Fecha Nacimiento',
    width: 200,
  },
  { field: 'rep_edad', headerName: 'Rep. Edad', width: 100 },
  { field: 'rep_profesion', headerName: 'Rep. Profesión', width: 200 },
  // {
  //   field: 'rep_pais_domicilio',
  //   headerName: 'Rep. País Domicilio',
  //   width: 200,
  // },
  {
    field: 'rep_pais_domicilio_desc',
    headerName: 'Rep. País Domicilio',
    width: 200,
  },
  // {
  //   field: 'rep_provincia_domicilio',
  //   headerName: 'Rep. Provincia Domicilio',
  //   width: 200,
  // },
  {
    field: 'rep_provincia_domicilio_desc',
    headerName: 'Rep. Provincia Domicilio',
    width: 200,
  },
  {
    field: 'rep_canton_domicilio_desc',
    headerName: 'Rep. Cantón Domicilio',
    width: 200,
  },
  {
    field: 'rep_ciudad_domicilio',
    headerName: 'Rep. Ciudad Domicilio',
    width: 200,
  },
  {
    field: 'rep_direccion_domicilio',
    headerName: 'Rep. Dirección Domicilio',
    width: 200,
  },
  // { field: 'rep_nacionalidad', headerName: 'Rep. Nac.', width: 200 },
  { field: 'rep_nacionalidad_desc', headerName: 'Rep. Nac.', width: 200 },
  {
    field: 'rep_lugar_nacimiento',
    headerName: 'Rep. Lugar Nacimiento',
    width: 200,
  },
  {
    field: 'rep_est_civil',
    headerName: 'Rep. Estado Civil',
    width: 150,
    renderCell: (params) => {
      return estadoCivilValue(params.value)
    },
  },
  {
    field: 'rep_sexo',
    headerName: 'Rep. Sexo',
    width: 100,
    renderCell: (params) => {
      return getSexo(params.value)
    },
  },
  { field: 'rep_email_cony', headerName: 'Rep. Email Cónyuge', width: 200 },
  // {
  //   field: 'rep_pais_domicilio_cony',
  //   headerName: 'Rep. País Domicilio Cónyuge',
  //   width: 200,
  // },
  {
    field: 'rep_pais_domicilio_cony_desc',
    headerName: 'Rep. País Domicilio Cónyuge',
    width: 200,
  },
  // {
  //   field: 'rep_nacionalidad_cony',
  //   headerName: 'Rep. Nac. Cónyuge',
  //   width: 200,
  // },
  {
    field: 'rep_nacionalidad_cony_desc',
    headerName: 'Rep. Nac. Cónyuge',
    width: 200,
  },
  {
    field: 'rep_domicilio_cony',
    headerName: 'Rep. Domicilio Cónyuge',
    width: 200,
  },
  // {
  //   field: 'rep_actividad_eco_cony',
  //   headerName: 'Rep. Act. Eco. Cónyuge',
  //   width: 200,
  // },
  {
    field: 'rep_actividad_eco_cony_desc',
    headerName: 'Rep. Act. Eco. Cónyuge',
    width: 200,
  },
  { field: 'rep_nombres_cony', headerName: 'Rep. Nombres Cónyuge', width: 200 },
  {
    field: 'rep_num_identificacion_cony',
    headerName: 'Rep. Número Identificación Cónyuge',
    width: 200,
  },
  {
    field: 'rep_tipo_identificacion_cony',
    headerName: 'Rep. Tipo Identificación Cónyuge',
    width: 200,
    renderCell: (params) => {
      return tipoIdentificacion(params.value)
    },
  },
  { field: 'lugar_declaracion', headerName: 'Lugar Declaración', width: 200 },
  {
    field: 'acceptterms',
    headerName: 'Aceptación Términos',
    width: 150,
    renderCell: (params) => {
      return setValueSiNo(params.value)
    },
  },
  // {
  //   field: 'identificacion_ejecutivo',
  //   headerName: 'Identificación Ejecutivo',
  //   width: 200,
  // },
  { field: 'nombre_ejecutivo', headerName: 'Nombre Ejecutivo', width: 200 },
  {
    field: 'sucursal',
    headerName: 'Sucursal',
    width: 150,
    renderCell: (params) => {
      return setValueZona(params.value)
    },
  },
  { field: 'lugar_ejecutivo', headerName: 'Lugar Ejecutivo', width: 200 },
  { field: 'observaciones', headerName: 'Observaciones', width: 200 },
]

export { columnsJuridico }
