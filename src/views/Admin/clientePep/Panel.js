import React,{useEffect,useContext} from "react";
import { useForm, FormProvider } from "react-hook-form";
import Container from '@mui/material/Container';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./Validation";
// COMPONENTES
import { columns } from "./Columns"
// ADMIN COMPONENTS
import Formulario from "./Form";
import TableData from "@components/Admin/TableData";
import ModalLogs from "@components/Admin/Logs/ModalLogs"
import ModalCorreo from "@components/Admin/Acciones/ModalCorreo"

const index = (props) => {

    const {handleSearchClientesPeps} = useContext(props.contexto);
    const title = "Reporte de clientes PEP "

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(()=>{
        handleSearchClientesPeps({});
    },[])


    return (
        <FormProvider {...methods}>
            <Container fixed maxWidth="xl">
                {/* HEADER PANEL */}
                <Formulario title={title} {...props} />
                <br/>
                {/* DATA PANEL */}
                <TableData columns={columns} {...props} />
                {/* MODAL PANEL */}
                <ModalLogs {...props} />
                <ModalCorreo {...props} />
            </Container>
        </FormProvider>
    );
}

export default index;