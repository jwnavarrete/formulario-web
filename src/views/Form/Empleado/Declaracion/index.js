import React, { useState, useEffect, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import MenuItem from "@mui/material/MenuItem";
import { EmpleadoContext } from "@context/Empleado/EmpleadoContext"
// 
const index = () => {

  const { handleChangePeeps,hash,getDocumentosCargados,formData,loadData} = useContext(EmpleadoContext)
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    // getDeclaracion();
    getDocumentosCargados(hash)
  }, [watch('seleccionar_pep')]);

  useEffect(()=>{
    loadData(hash)
    
  },[])

  useEffect(()=>{
    const {datos_personales} = formData 
    if(datos_personales){
      setValue('seleccionar_pep',datos_personales?.seleccionar_pep??'')
      handleChangePeeps(datos_personales?.seleccionar_pep??'')
    }
  },[formData])

  return (
    <>
      <Grid item xs={12}>
      <h4 >
          Declaración PEP (Persona Expuesta Políticamente)
        </h4>
        <br/>
        <Typography align="justify">
        Usted, desempeña o ha desempeñado funciones o cargos públicos en el Ecuador o en el extranjero, o en alguna organización
        internacional (desde el 5 al 10 grado de la escala de la RMU) tales como: Presidente y Vicepresidente de la República, Ministros y
        Viceministros, Asambleístas (principales y alternos), Superintendentes, Intendentes nacionales, regionales; Secretarios de gobierno,
        Asesores, Directores Nacionales, Regionales o Provinciales, Coordinadores, Gerentes y subgerentes de empresas o banca pública;
        Alcaldes, Vicealcaldes, Prefectos, Viceprefectos; Diplomáticos, embajadores, cónsules, etc.
        </Typography>
        <br/>
        <Typography align="justify" variant="h6" color="black">
          Si la respuesta es SI, favor llenar formulario de PEP otorgado por la compañía.
        </Typography>
        <br/>
        <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="seleccionar_pep"
          label="Seleccionar"
          onChange={(ev) =>handleChangePeeps(ev.target.value)}
          fullWidth
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4 >
          Declaraci&oacute;n
        </h4>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography align="justify">
            Declaro que:
          </Typography>

          <Typography align="justify">
            * La información contenida en este formulario es verdadera, completa y proporciona la información de modo confiable y actualizado.
          </Typography>

          <Typography align="justify">
            * Conozco y acepto que es mi obligación actualizar anualmente mis datos personales, así como el comunicar y documentar de manera inmediata a la Compañía cualquier cambio en la información que hubiere proporcionado. De igual manera me comprometo a proveer a Generali Ecuador Compañía de Seguros S.A. la documentación e información que me sea solicitada.
          </Typography>

          <Typography align="justify">
            * El origen y destino de todos mis ingresos son de carácter lícito, no ligados con actividades de narcotráfico, lavado de dinero o cualquier otra actividad tipificada en la Ley de Sustancias Estupefacientes y Psicotrópicas o en la Ley de prevención, detección y erradicación del delito de lavado de activos y del financiamiento de delitos.
          </Typography>

          <Typography align="justify">
            * No he sido enjuiciado/a ni condenado/a por el cometimiento de actividades ilícitas.
          </Typography>
        </>
      </Grid>
      
    
      <Grid item xs={12}>
        <>
          <h4>
          Tratamiento de Datos Personales
          </h4>
          <br/>
          <Typography align="justify">
          Con el objeto de preservar, los respectivos intereses en lo referente a la protección y
         responsabilidad en el manejo de la información personal, comercial, patrimonial o de
         cualquier otra naturaleza, las partes acuerdan que Generali Ecuador Compañías de Seguros
         S.A., sus subsidiarias, filiales a nivel nacional e internacional, intercambien durante la
         vigencia de la relación jurídica la información concerniente a la misma y la declarada en
         el presente documento. A tales efectos, las partes reconocen expresamente la importancia de
         mantener la seguridad y confidencialidad de dicha información, salvo de aquella que por
         disposición de la Constitución o de la ley pueda ser considerada pública. Autorizo a Generali
         Ecuador Compañías de Seguros S.A. a compartir su información con terceras personas solo en
         caso de que la misma sea requerida por vía judicial, administrativa y/o gubernamental; en
         definitiva, por requerimiento legal de autoridad competente o que su uso sea necesario para
         fines de la operatividad y coberturas propias del contrato de seguro.
          </Typography>
          <br/>
          <Typography align="justify">
          He sido informado y autorizo de manera libre, expresa, informada e inequívoca de conformidad
          con la Ley Orgánica de Protección de Datos Personales, que los datos personales que comparto
          son accedidos y tratados por GENERALI, con el objetivo de garantizar la calidad del servicio.
          De expresar mi negativa a brindar mis datos personales o de no autorizar el acceso a los datos
          personales y sensible estrictamente pertinentes y necesarios, GENERALI, no podrá cumplir con
          los fines expuestos.
          </Typography>
          <br/>
          <Typography align="justify">
              He sido informado que mis datos personales serán incluidos en una base de datos registrada bajo
            la titularidad de GENERALI; y, que estos podrán ser mantenidos localmente, así como compartidos a
            nivel internacional con la red de Generali con la finalidad de llevar estadísticas, realizar
            encuestas de satisfacción, envío de comunicaciones referidas a nuevos servicios y/o promociones,
            mejorar el servicio, entre otros.
          </Typography>
          <br/>
          <Typography align="justify">
          Se le informa que usted puede ejercer los Derechos contemplados en la Ley Orgánica de Protección de Datos
         Personales, incluyendo la revocatoria al consentimiento, a través de una solicitud dirigida a  
         <b> datosprotegidos@generali.com.ec</b> o en cualquiera de los establecimientos físicos de GENERALI.
           
          </Typography>
          <br/>
          <Typography align="justify">
              Eximo a Generali Ecuador Compañía de Seguros S.A de toda responsabilidad, inclusive respecto a terceros,
            si esta declaración fuese falsa o errónea. Este Formulario fue realizado de acuerdo con lo que establece
            la Ley Orgánica de Prevención, Detección y Erradicación del Delito de Lavado de Activos y del Financiamiento
            de Delitos y su Reglamento; además de las Normativas en Prevención de Lavado de Activos y Financiamiento del
            Terrorismo expedidas por la Junta de Política y Regulación Financiera, y Superintendencia de Compañías, Valores
            y Seguros.
          </Typography>
        </>
      </Grid>

      <Grid item xs={12}>
        <h4 >
          Autorizaci&oacute;n
        </h4>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography align="justify">
          Siendo conocedor de las disposiciones legales para reprimir el lavado de activos, narcotráfico y financiamiento de delitos, autorizo
            expresamente en forma libre, voluntaria e irrevocable a Generali Ecuador Compañía de Seguros S.A., a realizar el análisis y las verificaciones
            que considere necesarias para corroborar la licitud de mis fondos e informar a las autoridades competentes si fuera el caso; así mismo
            autorizo expresa, voluntaria e irrevocablemente a todas las personas naturales o jurídicas de derecho público o privado a facilitar a Generali
            Ecuador Compañía de Seguros S.A. toda la información que ésta les requiera y autorizo revisar en los buró de crédito mi información.
            Adicionalmente comprendo y acepto que la falsedad de información automáticamente da por terminado el proceso de selección o mi
            relación laboral, dependiendo del caso.
          </Typography>
        </>
      </Grid>



      <Grid item xs={12} md={3} lg={3}>
        <Input fullWidth name="lugar_declaracion" label="Lugar" />
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <SelectOption
          name="acceptTerms"
          label="Condiciones"
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"S"}>SI</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={6}>
        <Typography align="justify">
          &iquest;Est&aacute; de acuerdo con las condiciones?
        </Typography>
      </Grid>

    </>
  );
};

export default index;
