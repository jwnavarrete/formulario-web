import { lazy } from 'react'
// project imports
import MainLayout from '@layout/MainLayout'
import Loadable from '@ui-component/Loadable'
// dashboard routing
const Home = Loadable(lazy(() => import('@views/pages/Home')))
const Dashboard = Loadable(lazy(() => import('@views/dashboard')))
const SamplePage = Loadable(lazy(() => import('@views/pages/sample-page')))
const Perfil = Loadable(lazy(() => import('@views/pages/Perfil')))
const Usuarios = Loadable(lazy(() => import('@views/pages/Usuarios')))
const Logs = Loadable(lazy(() => import('@views/pages/Logs')))
const Menu = Loadable(lazy(() => import('@views/pages/Menu')))
const Menu_x_Perfil = Loadable(lazy(() => import('@views/pages/Menu_x_Perfil')))
const AdmCliente = Loadable(lazy(() => import('@views/Admin/cliente')))
const AdmPrestador = Loadable(lazy(() => import('@views/Admin/prestador')))
const AdmEmpleado = Loadable(lazy(() => import('@views/Admin/empleado')))
const ClientePep = Loadable(lazy(() => import('@views/Admin/clientePep')))
const EmpleadoReport = Loadable(
  lazy(() => import('@views/Admin/empleado-report')),
)
const BeneficiarioReport = Loadable(
  lazy(() => import('@views/Admin/beneficiario-report')),
)

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'perfil',
      element: <Perfil />,
    },
    {
      path: 'usuarios',
      element: <Usuarios />,
    },
    {
      path: 'menu',
      element: <Menu />,
    },
    {
      path: 'logs',
      element: <Logs />,
    },
    {
      path: 'menu_x_perfil',
      element: <Menu_x_Perfil />,
    },
    {
      path: 'admin-clientes',
      element: <AdmCliente />,
    },
    {
      path: 'admin-prestadores',
      element: <AdmPrestador />,
    },
    {
      path: 'admin-empleados',
      element: <AdmEmpleado />,
    },
    {
      path: 'empleado-report',
      element: <EmpleadoReport />,
    },
    {
      path: 'lista_peps',
      element: <ClientePep />,
    },
    {
      path: 'beneficiario-report',
      element: <BeneficiarioReport />,
    },
  ],
}

export default MainRoutes
