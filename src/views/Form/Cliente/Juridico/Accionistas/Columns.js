
import { JuridicoContext } from "@context/Cliente/JuridicoContext"
import { useContext, } from "react";



export const columns = [
    {
        field: "tipo_identificacion",
        headerName: "Tipo de Identificación",
        width: 200,
        renderCell: (cellValues) => {
            switch (cellValues.row.tipo_identificacion) {
                case "C":
                    return 'Cédula';
                case "R":
                    return 'Ruc';
                case "P":
                    return 'Pasaporte';
                default:
                    return '';
            }

        },
    },
    {
        field: "num_identificacion_accionista",
        headerName: "No. de identificación",
        type: "String",
        width: 200,
        editable: false,
    },
    {
        field: "razon_social_nombre_completos",
        headerName: "Razón Social / Nombres completos",
        width: 300,
        type: "String",
        editable: false,
    },
    {
        field: "porc_participacion",
        headerName: "% Participación",
        type: "String",
        width: 150,
        editable: false,
    },
    {
        field: "nac_accionista",
        headerName: "Nacionalidad",
        type: "String",
        width: 150,
        editable: false,
        renderCell :(cellValues) => {
            const {nacionalidades} = useContext(JuridicoContext)
            return   nacionalidades.find( item => cellValues.row.nac_accionista == item.codigo)?.descripcion
        }
    },
    {
        field: "tip_inversion_accionista",
        headerName: "Tipo de inversión",
        type: "String",
        width: 150,
        editable: false,
    },
    {
        field: "capital_accionista",
        headerName: "Capital",
        type: "String",
        width: 150,
        editable: false,
    },
];