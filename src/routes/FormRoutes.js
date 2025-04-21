import { lazy } from 'react'
// project imports
import Loadable from '@ui-component/Loadable'
import FormLayout from '@layout/FormLayout'
// login option 3 routing
// CLIENTES
const FirmaCliente = Loadable(lazy(() => import('@views/pages/Cliente/Firma')))
const FrmRegistroCliente = Loadable(
  lazy(() => import('@views/pages/Cliente/Registro')),
)
const FormularioCliente = Loadable(lazy(() => import('@views/pages/Cliente')))
const FormNatural = Loadable(lazy(() => import('@views/pages/Cliente/Natural')))
const FormJuridico = Loadable(
  lazy(() => import('@views/pages/Cliente/Juridico')),
)
const RevisionCliente = Loadable(
  lazy(() => import('@views/pages/Cliente/Revision')),
)
const RevisionClienteAsesor = Loadable(
  lazy(() => import('@views/pages/Cliente/RevisionAsesor')),
)
// PRESTADOR
const FormularioPrestador = Loadable(
  lazy(() => import('@views/pages/Prestador')),
)
const FrmRegistroPrestador = Loadable(
  lazy(() => import('@views/pages/Prestador/Registro')),
)
const FormPrestadorNatural = Loadable(
  lazy(() => import('@views/pages/Prestador/Natural')),
)
const FormPrestadorJuridico = Loadable(
  lazy(() => import('@views/pages/Prestador/Juridico')),
)
const FirmaPrestador = Loadable(
  lazy(() => import('@views/pages/Prestador/Firma')),
)
const RevisionPrestador = Loadable(
  lazy(() => import('@views/pages/Prestador/Revision')),
)
const RevisionPrestadorBroker = Loadable(
  lazy(() => import('@views/pages/Prestador/RevisionBroker')),
)
// EMPLEADO
const FormEmpleado = Loadable(
  lazy(() => import('@views/pages/Empleado/Formulario')),
)
const FirmaEmpleado = Loadable(
  lazy(() => import('@views/pages/Empleado/Firma')),
)
const RevisionEmpleado = Loadable(
  lazy(() => import('@views/pages/Empleado/Revision')),
)
// BENEFIACIARIOS
// const FrmRegistroBeneficiarios = Loadable(lazy(() => import("@views/pages/Beneficiarios/Registro")));
const FrmBeneficiario = Loadable(
  lazy(() => import('@modules/Beneficiario/pages')),
)
const FrmBeneficiarioFirma = Loadable(
  lazy(() => import('@modules/Beneficiario/pages/Firma')),
)
const FrmBeneficiarioRevision = Loadable(
  lazy(() => import('@modules/Beneficiario/pages/Revision')),
)
// ==============================|| Cliente FORM - ROUTING ||============================== //
const FormRoutes = {
  path: '/',
  element: <FormLayout />,
  children: [
    // ***** CLIENTES ******
    {
      path: `${process.env.URL_CLIENTE}`,
      element: <FrmRegistroCliente />,
    },
    {
      path: `${process.env.URL_CLIENTE}/:id`,
      element: <FormularioCliente />,
    },
    {
      path: `${process.env.URL_CLIENTE}/firma/:id`,
      element: <FirmaCliente />,
    },
    {
      path: `${process.env.URL_CLIENTE}/natural/:id`,
      element: <FormNatural />,
    },
    {
      path: `${process.env.URL_CLIENTE}/juridico/:id`,
      element: <FormJuridico />,
    },
    {
      path: `${process.env.URL_CLIENTE}/revision/:id`,
      element: <RevisionCliente />,
    },
    {
      path: `${process.env.URL_CLIENTE}/revision-asesor/:id`,
      element: <RevisionClienteAsesor />,
    },
    // ***** PRESTADOR ******
    {
      path: `${process.env.URL_PRESTADOR}`,
      element: <FrmRegistroPrestador />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/:id`,
      element: <FormularioPrestador />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/natural/:id`,
      element: <FormPrestadorNatural />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/juridico/:id`,
      element: <FormPrestadorJuridico />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/natural`,
      element: <FormPrestadorNatural />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/juridico`,
      element: <FormPrestadorJuridico />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/firma/:id`,
      element: <FirmaPrestador />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/revision/:id`,
      element: <RevisionPrestador />,
    },
    {
      path: `${process.env.URL_PRESTADOR}/revision-asesor/:id`,
      element: <RevisionPrestadorBroker />,
    },
    // ***** EMPLEADO ******
    {
      path: `${process.env.URL_EMPLEADO}`,
      element: <FormEmpleado />,
    },
    {
      path: `${process.env.URL_EMPLEADO}/:id`,
      element: <FormEmpleado />,
    },
    {
      path: `${process.env.URL_EMPLEADO}/firma/:id`,
      element: <FirmaEmpleado />,
    },
    {
      path: `${process.env.URL_EMPLEADO}/revision/:id`,
      element: <RevisionEmpleado />,
    },
    // ***** BENEFICIARIOS ******
    {
      path: `${process.env.URL_BENEFICIARIOS}`,
      element: <FrmBeneficiario />,
    },
    {
      path: `${process.env.URL_BENEFICIARIOS}/:id`,
      element: <FrmBeneficiario />,
    },
    {
      path: `${process.env.URL_BENEFICIARIOS}/firma/:id`,
      element: <FrmBeneficiarioFirma />,
    },
    {
      path: `${process.env.URL_BENEFICIARIOS}/revision/:id`,
      element: <FrmBeneficiarioRevision />,
    },
  ],
}

export default FormRoutes
