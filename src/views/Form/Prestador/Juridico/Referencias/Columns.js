
export const columns = [
    {
        field: "nombres_apellidos",
        headerName: "Nombres y Apellidos",
        type: "String",
        width: 250,
        editable: false,
    },
    {
        field: "parentesco",
        headerName: "Parentesco",
        type: "String",
        width: 100,
        editable: false,
    },
    {
        field: "telefono",
        headerName: "Teléfono",
        width: 110,
        type: "String",
        editable: false,
    },
    {
        field: "tarjeta",
        headerName: "Tarjeta",
        type: "number",
        width: 250,
        editable: false,
    },
    {
        field: "ins_fincanciera_1",
        headerName: "Ins.Fincanciera",
        type: "String",
        width: 180,
        editable: false,
    },
    // {
    //     field: "tipo_cuenta",
    //     headerName: "Tipo cta. Ahorro/Corriente",
    //     type: "String",
    //     width: 180,
    //     editable: false,
    // },
    {
        field: "tipo_cuenta",
        headerName: "Tipo cta. Ahorro/Corriente",
        width: 180,
        renderCell: (cellValues) => {
            return cellValues.row.tipo_cuenta == 'C' ? 'CORRIENTE' : 'AHORRO';
        },
    },

    {
        field: "ins_fincanciera_2",
        headerName: "Ins.Fincanciera",
        type: "String",
        width: 180,
        editable: false,
    }
];