import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// material-ui
import { Typography } from '@mui/material'

// project imports
import NavGroup from './NavGroup'

// utils
import { BuildChild } from "@utils/TreeNode"

// assets
import { IconHome, IconKey, IconWindmill, IconBrightness2 } from '@tabler/icons'
// constant
const icons = { IconHome, IconWindmill, IconKey, IconBrightness2 }

// api
import { useAxiosPrivate } from '@hooks/useAxiosPrivate'

// services
import AuthService from '@services/AuthService'


// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate()

  const initialValue = { items: [] }
  const [menu_items, setMenuItems] = useState(initialValue)

  useEffect(() => {
    const cargar_data = async () => {
      const menus = await loadMenus()
      setMenuItems(menus)
    }

    cargar_data()
  }, [])

  const getMenus = async () => {
    try {
      const { data } = await axiosPrivate.get('/menu')
      return data
    } catch (error) {
      console.error(error)

      // const { detail } = error.response.data

      // swal({
      //   title: 'Tarificador',
      //   text: `${detail}`,
      //   icon: 'error',
      //   button: 'Aceptar'
      // })
    }
  }

  const getMenus_x_Perfil = async (id) => {
    try {
      const { data } = await axiosPrivate.get(`/menu_x_perfil/{id}?perfil_id=${id}`)
      return data
    } catch (error) {
      console.error(error)
      // const { detail } = error.response.data

      // swal({
      //   title: 'Tarificador',
      //   text: `${detail}`,
      //   icon: 'error',
      //   button: 'Aceptar'
      // })
    }
  }
  // const getMenus_x_Perfil = async () => {
  //   const id = 1;  // Cambiar el valor de id a 1
  //   try {
  //     const { data } = await axiosPrivate.get(`/menu_x_perfil/{id}?perfil_id=${id}`);
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //     // Resto del manejo de errores
  //   }
  // }

  const loadMenus = async () => {
    try {
      const user = AuthService.getUser()
      const _menus = await getMenus()
      const _menus_x_perfil = await getMenus_x_Perfil(user?.perfil_id)
      const treeMenus = []

      if (!_menus) {
        return {}
      }

      _menus?.sort((a, b) => a.id - b.id);

      const menu_filter = _menus?.filter(item => {
        if (_menus_x_perfil?.find(q => q.menu_id === item.id)) {
          return item
        }
      })

      menu_filter?.filter(q => q.tipo === "collapse").map(async item => {
        const tree = await BuildChild(menu_filter, item)
        treeMenus.push(tree)
      })

      const menus = {
        items: [{
          id: 'home',
          type: 'group',
          children: [
            {
              id: 'home-page',
              title: 'Inicio',
              type: 'item',
              url: '',
              icon: icons.IconHome,
              breadcrumbs: false
            }
          ]
        }, {
          id: 'security',
          // title: 'Security',
          // caption: 'module security',
          type: 'group',
          children: treeMenus
        }]
      }

      return menus
    } catch (error) {
      const { detail } = error.response.data

      swal({
        title: 'Formulario Vinculación',
        text: `${detail}`,
        icon: 'error',
        button: 'Aceptar'
      })
    }
  }

  return (
    <>
      {menu_items.items.map(item => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />
          default:
            return (
              <Typography key={item.id} variant='h6' color='error' align='center'>
                Menu Items Error
              </Typography>
            )
        }
      })}
    </>
  )
}

export default MenuList
