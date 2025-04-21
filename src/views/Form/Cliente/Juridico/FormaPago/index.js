import React,{useState,useContext,useEffect} from "react";
import { useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import SelectOption from "@components/ui/_Select";
import Input from "@components/ui/_Input";
import MaskInput from "@components/ui/_Mask";
import { JuridicoContext } from "@context/Cliente/JuridicoContext"

const index = () => {
    const { handleDependInput ,getDisableByName,formData} = useContext(JuridicoContext)

    const [showOtro,setShowOtro] = useState(false);

    const formMethods  = useFormContext();
    const {
        setValue
      } = formMethods;
    
    useEffect(() =>{
        const { accionista } = formData;
        hangleTipoPago(accionista?.tipo_cuenta_pago)
        
    },[])

    const hangleTipoPago =(value)=>{

        handleDependInput(
            value,
            'O',
        ['tipo_cuenta_otro'],
        formMethods,
        true
        );
        
    }

    return(
        <>
            <Grid item xs={12}>
                <>
                <h3>Forma de Pago</h3>
                </>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <SelectOption
                name="forma_pago"
                label=""
                fullWidth
                >
                <MenuItem value={"E"}>Efectivo</MenuItem>
                <MenuItem value={"C"}>Cheque</MenuItem>
                <MenuItem value={"T"}>Transferencia</MenuItem>
                <MenuItem value={"TC"}>Tarjeta de Crédito</MenuItem>
                <MenuItem value={"TD"}>Tarjeta de Débito</MenuItem>
                </SelectOption>
            </Grid>
            <Grid item xs={12}>
                <>
                <h3>Canal de Pago</h3>
                </>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
            <Input
              name="institucion_pago"
              label="Nombre de institución"
              fullWidth
            />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <SelectOption
                name="tipo_cuenta_pago"
                label="Tipo de cuenta"
                onChange ={(e) =>hangleTipoPago(e.target.value)}
                fullWidth
                
                >
                <MenuItem value={"A"}>Ahorros</MenuItem>
                <MenuItem value={"C"}>Corriente</MenuItem>
                <MenuItem value={"O"}>Otro</MenuItem>
                </SelectOption>
            </Grid>
           
            {
                //showOtro &&
                <Grid item xs={12} md={6} lg={3}>
                <Input
                    name="tipo_cuenta_otro"
                    label="Especifique"
                    disabled={getDisableByName('tipo_cuenta_otro')}
                    fullWidth
                />
                </Grid>
            }
            
            

            <Grid item xs={12} md={6} lg={3}>
                <MaskInput name='num_tarjeta' label="Cuenta/tarjeta" placeholder="XXXX XXXX XXXX 0000" />
            </Grid>
      </>
    )
}

export default index;