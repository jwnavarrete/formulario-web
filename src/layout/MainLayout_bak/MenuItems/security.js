
// assets
// import { IconHome, IconKey, IconWindmill, IconBrightness2 } from '@tabler/icons'

// constant
// const icons = { IconHome, IconWindmill, IconKey, IconBrightness2 }

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const security = {
  id: 'security',
  title: 'Security',
  caption: 'module security',
  type: 'group',
  children: [
    {
      id: 'seg',
      title: 'Seguridad',
      type: 'collapse',
    //   icon: icons.IconKey,
      children: [
        {
          id: 'seg_perfil',
          title: 'Perfil',
          type: 'item',
          url: 'perfil',
          breadcrumbs: true
        },
        {
          id: 'seg_usuario',
          title: 'Usuarios',
          type: 'item',
          url: 'usuarios',
          breadcrumbs: true
        },
        {
          id: 'seg_logs',
          title: 'Logs',
          type: 'item',
          url: 'logs',
          breadcrumbs: true
        },
        {
          id: 'seg_menu',
          title: 'Menu',
          type: 'item',
          url: 'menu',
          breadcrumbs: true
        },
        {
          id: 'seg_menu_x_perfil',
          title: 'Menu x Perfil',
          type: 'item',
          url: 'menu_x_perfil',
          breadcrumbs: true
        }    
      ]
    },
    {
      id: 'config',
      title: 'Configuración',
      type: 'collapse',
    //   icon: icons.IconWindmill,
      children: [
        {
          id: 'tipo',
          title: 'Tipo',
          type: 'item',
          url: 'tipo',
          breadcrumbs: true
        },
        {
          id: 'variable',
          title: 'Variable',
          type: 'item',
          url: 'rubros',
          breadcrumbs: true
        },
        {
          id: 'valores_variable',
          title: 'Valores de Variable',
          type: 'item',
          url: 'formula',
          breadcrumbs: true
        },
        {
          id: 'parametro',
          title: 'Parámetro',
          type: 'item',
          url: 'parametro',
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'indicador',
      title: 'Indicadores',
      type: 'collapse',
    //   icon: icons.IconBrightness2,
      children: [
        {
          id: 'severidad',
          title: 'Severidad',
          type: 'item',
          url: 'severidad',
          breadcrumbs: true
        }
      ]
    }
  ]
}

export default security
