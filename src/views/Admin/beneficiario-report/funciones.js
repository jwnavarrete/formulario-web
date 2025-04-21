const setActividadEconomica = (value) => {
  let nomValue = ''
  switch (value) {
    case '0059':
      nomValue = 'Empleado público'
      break
    case '0094':
      nomValue = 'Empleado privado'
      break
    case '0054':
      nomValue = 'Negocio propio'
      break
    case '0100':
      nomValue = 'Jubilado'
      break
    case '0106':
      nomValue = 'Estudiante'
      break
    case '0020':
      nomValue = 'Tareas domésticas'
      break
    case '0034':
      nomValue = 'Otros'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const estadoCivilValue = (value) => {
  let nomValue = ''
  switch (value) {
    case '01':
      nomValue = 'Soltero'
      break
    case '02':
      nomValue = 'Casado'
      break
    case '03':
      nomValue = 'Viudo'
      break
    case '04':
      nomValue = 'U/libre'
      break
    case '05':
      nomValue = 'Divorciado'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const tipoIdentificacion = (value) => {
  let nomValue = ''
  switch (value) {
    case 'C':
      nomValue = 'Cédula'
      break
    case 'U':
      nomValue = 'Ruc Natural'
      break
    case 'R':
      nomValue = 'Ruc Juridico'
      break
    case 'P':
      nomValue = 'Pasaporte'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const getEstado = (value) => {
  switch (value) {
    case 'T':
      return 'Terminado'
    case 'A':
      return 'Aprobado'
    case 'P':
      return 'Pendiente'
    default:
      return value
  }
}

const tipoPersona = (value) => {
  switch (value) {
    case 'N':
      return 'Natural'
    case 'J':
      return 'Juridico'
    default:
      return value
  }
}

const setTipoVinculacion = (value) => {
  let nomValue = ''
  switch (value) {
    case 'D':
      nomValue = 'Directo'
      break
    case 'B':
      nomValue = 'Broker'
      break
    case 'C':
      nomValue = 'Canal'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const setValueSiNo = (value) => {
  let nomValue = ''
  switch (value) {
    case 'S':
      nomValue = 'Sí'
      break
    case 'N':
      nomValue = 'No'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const setValueZona = (value) => {
  let nomValue = ''
  switch (value) {
    case 'G':
      nomValue = 'Guayaquil'
      break
    case 'Q':
      nomValue = 'Quito'
      break
    case 'v':
      nomValue = 'Cuenca'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const tipoEmpresa = (value) => {
  let nomValue = ''
  switch (value) {
    case '1':
      nomValue = 'Sociedad anónima'
      break
    case '2':
      nomValue = 'Cía. Limitada'
      break
    case '3':
      nomValue = 'Sociedad de Hecho'
      break
    case '4':
      nomValue = 'ONG'
      break
    case '5':
      nomValue = 'Sector público'
      break
    case '6':
      nomValue = 'Economía Mixta'
      break
    case '7':
      nomValue = 'Fundación'
      break
    case '8':
      nomValue = 'Fideicomisos'
      break
    case '9':
      nomValue = 'Otro'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

const getSexo = (value) => {
  switch (value) {
    case 'M':
      return 'Masculino'
    case 'F':
      return 'Femenino'
    default:
      return value
  }
}

const tipoMercadoDescri = (value) => {
  let nomValue = ''
  switch (value) {
    case 'C':
      nomValue = 'Comercial'
      break
    case 'I':
      nomValue = 'Industrial'
      break
    case 'S':
      nomValue = 'Servicios'
      break
    case 'F':
      nomValue = 'Financiero'
      break
    case 'A':
      nomValue = 'Agrícola'
      break
    case 'SL':
      nomValue = 'Soc. sin fines de lucro'
      break
    case 'O':
      nomValue = 'Otros'
      break
    default:
      nomValue = ''
  }
  return nomValue
}

export {
  setActividadEconomica,
  estadoCivilValue,
  tipoIdentificacion,
  getEstado,
  tipoPersona,
  setTipoVinculacion,
  setValueSiNo,
  setValueZona,
  formatCurrency,
  tipoEmpresa,
  getSexo,
  tipoMercadoDescri,
}
