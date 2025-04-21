var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function removeFormat(value) {
    // Elimina todo lo que no sea un número, punto decimal, o signo negativo
    if (value) {
	return value.replace(/[^0-9.-]+/g, '')
    }
	
    return value;
    // return value.replace(/[^0-9.-]+/g, '');
}

export const columns = [
  {
    field: 'tipo_identificacion',
    headerName: 'Tipo de Identificación',
    width: 200,
    renderCell: (cellValues) => {
      switch (cellValues.row.tipo_identificacion) {
        case 'C':
          return 'Cédula'
        case 'R':
          return 'Ruc'
        case 'P':
          return 'Pasaporte'
        default:
          return ''
      }
    },
  },
  {
    field: 'num_identificacion_accionista',
    headerName: 'No. de identificación',
    type: 'String',
    width: 200,
    editable: false,
  },
  {
    field: 'razon_social_nombre_completos',
    headerName: 'Razón Social / Nombres completos',
    width: 300,
    type: 'String',
    editable: false,
  },
  {
    field: 'porc_participacion',
    headerName: '% Participación',
    type: 'String',
    width: 150,
    editable: false,
  },
  {
    field: 'nacionalidad_descripcion',
    headerName: 'Nacionalidad',
    type: 'String',
    width: 150,
    editable: false,
  },
  {
    field: 'tip_inversion_accionista',
    headerName: 'Tipo de inversión',
    type: 'String',
    width: 150,
    editable: false,
  },
  {
    field: 'capital_accionista',
    headerName: 'Capital',
    type: 'String',
    width: 150,
    editable: false,
    renderCell: (cellValues) => {
      // Eliminar el formato del valor
      const cleanedValue = removeFormat(cellValues.row.capital_accionista)

      // Formatear el valor de nuevo si es necesario
      const formattedValue = formatter.format(cleanedValue)

      return formattedValue
    },
  },
]
