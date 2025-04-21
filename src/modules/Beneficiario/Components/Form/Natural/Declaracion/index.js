import React from 'react'
import { useFormContext } from 'react-hook-form'
// COMPONENTES DE MATERIAL UI
import Grid from '@mui/material/Grid'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import Input from '@components/ui/_Input'
import SelectOption from '@components/ui/_Select'
import MenuItem from '@mui/material/MenuItem'

const index = () => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Grid item xs={12}>
        {/*<Typography variant="h5" sx={{ fontWeight: "bold" }}>
         
        </Typography>*/}
      </Grid>
      <Grid item xs={12}>
        <h4>Declaraci&oacute;n</h4>
        <>
          <Typography align="justify">
            Yo, declaro ser conocedor(a) de las penas de perjurio, declaro que
            la información contenida en este formulario y la documentación que
            se adjunte al mismo es verdadera, completa y proporciona la
            información de modo confiable y actualizado. También declaro que
            conozco y acepto que es mi obligación actualizar anualmente mis
            datos personales, así como el comunicar y documentar de manera
            inmediata a la Compañía cualquier cambio en la información que
            hubiere proporcionado, y a proveer la documentación e información
            que me sea solicitada.
          </Typography>
          <p>&nbsp;</p>
          <Typography align="justify">
            Además, declaro que el origen de fondos, bienes y productos que son
            asegurados, ni los que reciba producto de un siniestro, provienen ni
            serán utilizados en el delito de lavado de activos y del
            financiamiento del terrorismo y otros delitos.
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <h4>Declaración PEP (Persona Expuesta Políticamente)</h4>
        <br />
        <Typography align="justify">
          Usted, desempeña o ha desempeñado funciones o cargos públicos en el
          Ecuador o en el extranjero, o en alguna organización internacional
          (desde el 5 al 10 grado de la escala de la RMU) tales como: Presidente
          y Vicepresidente de la República, Ministros y Viceministros,
          Asambleístas (principales y alternos), Superintendentes, Intendentes
          nacionales, regionales; Secretarios de gobierno, Asesores, Directores
          Nacionales, Regionales o Provinciales, Coordinadores, Gerentes y
          subgerentes de empresas o banca pública; Alcaldes, Vicealcaldes,
          Prefectos, Viceprefectos; Diplomáticos, embajadores, cónsules, etc.
        </Typography>
        <br />
        <Typography align="justify" variant="h6" color="black">
          Si la respuesta es SI, favor llenar formulario de PEP otorgado por la
          compañía.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <h4>Autorizaci&oacute;n</h4>
        <>
          <h6>An&aacute;lisis y verificaci&oacute;n de datos</h6>
          <Typography align="justify">
            Autorizo expresamente en forma libre, voluntaria e irrevocable a
            Generali Ecuador compañía de Seguros S. A., a realizar el análisis y
            las verificaciones que considere necesarias para corroborar la
            licitud de fondos y bienes comprendidos en el contrato de seguro e
            informar a las autoridades competentes si fuera el caso; en
            consecuencia renuncio a instaurar cualquier acto civil,
            administrativo o penal en contra de la compañía y/o sus empleados
            y/o filiales y/o subsidiarias así mismo autorizo expresa, voluntaria
            e irrevocablemente a todas las personas naturales o jurídicas de
            derecho público o privado a facilitar a Generali Ecuador compañía de
            Seguros S.A toda la información que ésta les requiera y autorizo
            revisar en los buró de crédito mi información.
          </Typography>
          <p>&nbsp;</p>
          <Typography align="justify">
            Eximo a Generali Ecuador Compañía de Seguros S.A de toda
            responsabilidad, inclusive respecto a terceros, si esta declaración
            fuese falsa o errónea. Este Formulario fue realizado de acuerdo con
            lo que establece la Ley Orgánica de Prevención, Detección y
            Erradicación del Delito de Lavado de Activos y del Financiamiento de
            Delitos y su Reglamento; además de las Normativas en Prevención de
            Lavado de Activos y Financiamiento del Terrorismo expedidas por la
            Junta de Política y Regulación Financiera, y Superintendencia de
            Compañías, Valores y Seguros.
          </Typography>
        </>
      </Grid>
      <Grid item xs={12}>
        <>
          <h4>Tratamiento de Datos Personales </h4>

          <Typography align="justify">
            Otorgo mi consentimiento libre, expreso, informado e inequívoco a
            Generali Ecuador Compañía de Seguros S.A., sus subsidiarias,
            filiales y entidades del Grupo Generali para que recopilen, procesen
            y traten la información entregada; esto incluye, según el tipo de
            seguro, datos de salud y otras categorías de datos sensibles. La
            información podrá comprender diagnósticos, exámenes médicos,
            afecciones de salud, enfermedades de cualquier tipo, así como
            tratamientos y atenciones médicas realizadas o por realizar en el
            futuro a los titulares, solicitantes, asegurados, beneficiarios y
            cualquier otra persona incluida en el contrato de seguro solicitado.
            Asimismo, autorizo a acceder y obtener la información necesaria,
            incluyendo historiales médicos o clínicos. Lo anterior incluye la
            información generada o contenida en las bases de datos de médicos,
            personal sanitario, prestadores de salud, aseguradoras y empresas de
            medicina prepagada, tanto nacionales como extranjeras.
          </Typography>
          <br />
          <Typography align="justify">
            Autorizo a Generali Ecuador Compañía de Seguros S.A. a compartir la
            información con entidades del Grupo Generali y terceras personas
            para fines de la operatividad y coberturas propias del contrato de
            seguro. De igual forma, podrá compartir en caso de ser requerida por
            vía judicial, administrativa y/o gubernamental; en definitiva, por
            requerimiento legal de autoridad competente.
          </Typography>

          <br />
          <Typography align="justify">
            Generali Ecuador Compañía de Seguros S.A. accede y trata información
            personal únicamente para cumplir con sus obligaciones legales y
            contractuales, conforme a los servicios que presta; esto podrá
            incluir:
          </Typography>
          
          <Typography align="justify">
            <List component="ol" type="i">
              <ListItem component="li">
                <ListItemText primary="i. Evaluación de riesgos" />
              </ListItem>
              <ListItem component="li">
                <ListItemText primary="ii. Emisión del contrato de seguro, documentos que forman parte de esta y cálculo de primas" />
              </ListItem>
              <ListItem component="li">
                <ListItemText primary="iii. Gestión de reclamos y liquidaciones" />
              </ListItem>
              <ListItem component="li">
                <ListItemText primary="iv. Prevención de fraude y cumplimiento de normativas legales y regulatorias" />
              </ListItem>
              <ListItem component="li">
                <ListItemText primary="v. Mejora de productos y servicios" />
              </ListItem>
            </List>
          </Typography>

          <Typography align="justify">
            Se me ha informado que puedo ejercer los derechos contemplados en la
            Ley Orgánica de Protección de Datos Personales, incluyendo la
            revocación del consentimiento, mediante una solicitud dirigida a
            datosprotegidos@generali.com.ec o en cualquiera de las oficinas de
            la compañía. Generali Ecuador Compañía de Seguros S.A garantiza su
            compromiso de tratar los datos personales conforme a la normativa
            ecuatoriana, adoptando las medidas de seguridad necesarias, y
            asegurando de manera irrestricta la confidencialidad y reserva de la
            información.
          </Typography>
          <br />
          <Typography align="justify">
            Para más información consulta nuestro Aviso de Privacidad y
            Tratamiento de Datos Personales.
          </Typography>
        </>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Input fullWidth name="lugar_declaracion" label="Lugar" />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12} md={3} lg={3}>
        <SelectOption name="acceptterms" label="Condiciones">
          <MenuItem value={''}></MenuItem>
          <MenuItem value={'S'}>SI</MenuItem>
        </SelectOption>
      </Grid>
      <Grid item xs={6}>
        <Typography align="justify">
          &iquest;Est&aacute; de acuerdo con las condiciones?
        </Typography>
      </Grid>
    </>
  )
}

export default index
