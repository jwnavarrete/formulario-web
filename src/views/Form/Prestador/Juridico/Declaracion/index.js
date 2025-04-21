import React, { useState, useEffect, useContext } from "react";
import { useFormContext, Controller } from "react-hook-form";
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Input from "@components/ui/_Input";
import SelectOption from "@components/ui/_Select";
import MenuItem from "@mui/material/MenuItem";
import { JuridicoContext } from "@context/Prestador/JuridicoContext"


const index = () => {
  const { handleChangePeeps } = useContext(JuridicoContext)

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    // getDeclaracion();
  }, []);

  return (
    <>
      
      <Grid item xs={12}>
        <>
        <h4>
          Declaraci&oacute;n
          </h4>
          <Typography align="justify">
          Yo, declaro ser conocedor(a) de las penas de perjurio, declaro que la
         información contenida en este formulario y la documentación que se adjunte
         al mismo es verdadera, completa y proporciona la información de modo confiable
         y actualizado.  También declaro que conozco y acepto que es mi obligación
         actualizar anualmente mis datos personales, así como el comunicar y documentar
         de manera inmediata a la Compañía cualquier cambio en la información que
         hubiere proporcionado, y a proveer la documentación e información que me sea
         solicitada.
          </Typography>
          <br/>
          <Typography align="justify">
          Además, declaro que el origen y destino de todos mis ingresos, así como los bienes
         amparados en el seguro aquí convenido, así como también la prima a pagar o dinero
           a recibir por parte de la compañía de Seguros por concepto de indemnizaciones o
         cancelaciones anticipadas, tienen origen y propósito lícito y no provienen ni serán
         utilizados en el delito de lavado de activos y del financiamiento del terrorismo y
         otros delitos.
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}></Grid>
      {/* <Grid item xs={12}>
        <>
          <h3>Personas Expuestas Pol&iacute;ticamente</h3>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <Typography align="justify">
            &iquest;Usted o sus familiares (c&oacute;nyuge, padres, hijos,
            abuelos, suegros, hijos del c&oacute;nyuge) o colaboradores
            cercanos desempe&ntilde;an o han desempe&ntilde;ado funciones
            p&uacute;blicas de alto grado en el &uacute;ltimo a&ntilde;o?
          </Typography>
        </>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <SelectOption
          name="seleccionar_pep"
          label="Seleccionar"
          onChange={(e) => handleChangePeeps(e.target.value)}
          fullWidth
        >
          <MenuItem value={"S"}>Si</MenuItem>
          <MenuItem value={"N"}>No</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={12}></Grid> */}
      <Grid item xs={12}>
        <h4>Autorizaci&oacute;n</h4>
      </Grid>
      <Grid item xs={12}>
        <>
          <h4>
            An&aacute;lisis y verificaci&oacute;n de datos
          </h4>
          <Typography align="justify">
            Autorizo expresamente en forma libre, voluntaria e irrevocable a Generali Ecuador Compañía de Seguros S. A., a realizar el an&aacute;lisis y las verificaciones que considere necesarias para corroborar
            la licitud de fondos y bienes comprendidos en el contrato de seguro e informar a las autoridades competentes si fuera el caso, en consecuencia, renuncio a instaurar cualquier acto civil,
            administrativo o penal en contra de la compa&ntilde;&iacute;a y/o sus empleados y/o filiales y/o subsidiarias. As&iacute; mismo autorizo expresa, voluntaria e irrevocablemente a todas las personas naturales o
            jur&iacute;dicas de derecho público o privado a facilitar a Generali Ecuador Compa&ntilde;&iacute;a de Seguros S.A. toda la informaci&oacute;n que &eacute;sta les requiera y autorizando a revisar en los bur&oacute;s
            de cr&eacute;dito, mi informaci&oacute;n.
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <h4>
          Tratamiento de Datos Personales
          </h4>
          <Typography align="justify">
          Con el objeto de preservar, los respectivos intereses en lo referente a la
         protección y responsabilidad en el manejo de la información personal, comercial,
         patrimonial o de cualquier otra naturaleza, las partes acuerdan que Generali
         Ecuador Compañías de Seguros S.A., sus subsidiarias, filiales a nivel nacional
         e internacional, intercambien durante la vigencia de la relación jurídica la
         información concerniente a la misma y la declarada en el presente documento.
         A tales efectos, las partes reconocen expresamente la importancia de mantener
         la seguridad y confidencialidad de dicha información, salvo de aquella que por
         disposición de la Constitución o de la ley pueda ser considerada pública. Autorizo
         a Generali Ecuador Compañías de Seguros S.A. a compartir su información con
         terceras personas solo en caso de que la misma sea requerida por vía judicial,
         administrativa y/o gubernamental; en definitiva, por requerimiento legal de
         autoridad competente o que su uso sea necesario para fines de la operatividad
         y coberturas propias del contrato de seguro.
          </Typography>
        <br/>
        <Typography align="justify">
          He sido informado y autorizo de manera libre, expresa, informada e inequívoca de
        conformidad con la Ley Orgánica de Protección de Datos Personales, que los datos
        personales que comparto son accedidos y tratados por GENERALI, con el objetivo de
        garantizar la calidad del servicio. De expresar mi negativa a brindar mis datos
        personales o de no autorizar el acceso a los datos personales y sensible
        estrictamente pertinentes y necesarios, GENERALI, no podrá cumplir con los fines
        expuestos.
        </Typography>
        <br/>
        <Typography align="justify">
          He sido informado que mis datos personales serán incluidos en una base de
         datos registrada bajo la titularidad de GENERALI; y, que estos podrán ser
         mantenidos localmente, así como compartidos a nivel internacional con la red
         de Generali con la finalidad de llevar estadísticas, realizar encuestas de
         satisfacción, envío de comunicaciones referidas a nuevos servicios y/o
         promociones, mejorar el servicio, entre otros.
        </Typography>
        <br/>
        <Typography align="justify">
        Se le informa que usted puede ejercer los Derechos contemplados en la Ley
       Orgánica de Protección de Datos Personales, incluyendo la revocatoria al
       consentimiento, a través de una solicitud dirigida a <b>datosprotegidos@generali.com.ec</b> o en cualquiera 
       de los establecimientos físicos de GENERALI.
        </Typography>
        <br/>
        <Typography align="justify">
        Eximo a Generali Ecuador Compañía de Seguros S.A de toda responsabilidad,
       inclusive respecto a terceros, si esta declaración fuese falsa o errónea.
       Este Formulario fue realizado de acuerdo con lo que establece la Ley Orgánica
       de Prevención, Detección y Erradicación del Delito de Lavado de Activos y del
       Financiamiento de Delitos y su Reglamento; además de las Normativas en
       Prevención de Lavado de Activos y Financiamiento del Terrorismo expedidas
       por la Junta de Política y Regulación Financiera, y Superintendencia de
       Compañías, Valores y Seguros.
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
