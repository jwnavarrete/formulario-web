const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

  export {
    formatDate
}


export const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimientoDate.getMonth();
    // Restar un año si el mes de nacimiento es posterior al mes actual
    if (mesNacimiento > mesActual || (mesNacimiento === mesActual && fechaNacimientoDate.getDate() > hoy.getDate())) {
        edad--;
    }

    return edad;
}


export const getFormattedDate = () => {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0'); // El mes va de 0 a 11, por lo que sumamos 1
    var day = now.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}