import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  tipo_identificacion_empresa: Yup.string().required(
    'El tipo de identificación es obligatorio',
  ),
  num_identificacion_empresa: Yup.string()
    .required('El número de RUC es obligatorio')
    .matches(/^[0-9]{13}$/, 'El número de RUC debe tener 13 dígitos'),
  razon_social_empresa: Yup.string().required('La razón social es obligatoria'),
  tipo_inversion: Yup.string().required('El tipo de inversión es obligatorio'),
  objeto_social_empresa: Yup.string().required(
    'El objeto social es obligatorio',
  ),
  direccion_empresa: Yup.string().required(
    'La dirección de la empresa es obligatoria',
  ),
  correo_empresa: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('El correo electrónico no es válido'),
  telefono_empresa: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]{10,13}$/, 'El teléfono debe tener entre 10 y 13 dígitos'),
  actividad_empresa: Yup.string().required(
    'La actividad de la empresa es obligatoria',
  ),
  pais_empresa: Yup.string().required('El país de la empresa es obligatorio'),
  ciudad_empresa: Yup.string().required(
    'La ciudad de la empresa es obligatoria',
  ),
  tipo_empresa: Yup.string().required('El tipo de empresa es obligatorio'),
  tipo_empresa_especifique: Yup.string().when('tipo_empresa', {
    is: (value) => value === '34',
    then: Yup.string().required('Debe especificar el tipo de empresa'),
  }),
  tipo_mercado: Yup.string().required('El sector del mercado es obligatorio'),
  tipo_mercado_especifique: Yup.string().when('tipo_mercado', {
    is: (value) => value === 'O',
    then: Yup.string().required('Debe especificar el sector del mercado'),
  }),
  activos: Yup.number()
    .typeError('Campo debe ser numérico')
    .min(1, 'Debe ser mayor a cero')
    .max(9999999999999999, 'Número inválido'),
  pasivos: Yup.number()
    .typeError('Campo debe ser numérico')
    .min(1, 'Debe ser mayor a cero')
    .max(9999999999999999, 'Número inválido'),
  patrimonio: Yup.number().typeError('Campo debe ser numérico'),
  // .min(0, "Debe ser mayor o igual a cero"),
  seleccionar_pep: Yup.string().required('Debe seleccionar una opción'),
})
