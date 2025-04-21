
export const _tieneConyugue = (valor) => {
    let bandera = false;
    if (valor == "02" || valor == "04" || valor == "06") {
        bandera = true;
    }
    return bandera;
};

export const _esAsegurado = (valor) => {
    return valor == "S" ? false : true;
};

export const _esBeneficiario = (valor) => {
    return valor == "S" ? false : true;
};

export const validaDocumentos = (documento) => {
    let bandera = true;
    const requeridos = Object.keys(documento).filter((item, index) => {
        const row = documento[item];
        return row.cargado == false && row.obligatorio == true
    });

    if (requeridos.length > 0) {
        bandera = false
    }

    return bandera;
}

export const mansajeDocumento = (icon, mensaje) => {
    swal({
        title: 'FORMULARIO DE VINCULACIÓN',
        text: `${mensaje}`,
        icon: `${icon}`,
        button: 'Aceptar',
    });
}


export const validarExt = async (event) => {
    const File = event.target.files[0];
    const { name, size, type } = File;
    const MAX_FILE_SIZE = 5242880;

    if (size > MAX_FILE_SIZE) {
        mansajeDocumento('error', `archivo supera el limite permitido: ${MAX_FILE_SIZE}`);
        event.target.value = "";
        return false;
    } else if (size == 0) {
        mansajeDocumento('error', `archivo vacio`);
        event.target.value = "";
        return false;
    }

    var extPermitidas = /(.pdf|.doc|.docx|.jpg|.jpeg|.png|.tiff|.bmp)$/i;
    if (!extPermitidas.exec(name)) {
        mansajeDocumento('error', 'Documento no permitido');
        event.target.value = "";
        return false;
    }
    return true;
};
