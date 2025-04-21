import React from 'react'
import { Sidebar, Navigation, NavigationHeader } from './components'
import NavHeader from './NavHeader'
import Span from '@components/ui/Span'
import { useLocation } from 'react-router-dom'
import Drawer from '@components/ui/Drawer'

import {
  BiDotsHorizontalRounded,
  BiHome,
  BiBarChartAlt2,
  BiKey,
  BiGridSmall,
  BiLogOutCircle
} from 'react-icons/bi'

import NavItem from './NavItem'
import NavItemSub from './NavItemSub'
import AuthService from '@services/AuthService'

const index = ({ drawerOpen, drawerToggle, children }) => {
  const pathname = useLocation().pathname

  const handleLogout = () => {
    AuthService.logout()
  }

  const isActive = to => {
    return to === pathname ? 'active' : ''
  }

  return (
    <>
      <Drawer open={drawerOpen} onClose={drawerToggle}></Drawer>
      <Sidebar>
        <NavHeader />
        <Navigation>
          {/* Navigation Header */}
          <NavigationHeader>
            <Span>APPS & PAGES</Span>
            <BiDotsHorizontalRounded />
          </NavigationHeader>

          {/* Menu Nav Item */}
          <NavItem
            title='Home'
            icon={<BiHome />}
            to={'/'}
            active={isActive('/')}
          />

          <NavItemSub title='Mantenimiento' icon={<BiKey />} to={''}>
            <NavItem
              title='Recargo'
              icon={<BiGridSmall />}
              to={'/recargo'}
              active={isActive('/recargo')}
            />
          </NavItemSub>

          <NavigationHeader>
            <Span>OTHERS</Span>
            <BiDotsHorizontalRounded />
          </NavigationHeader>

          <NavItem
            title='Logout'
            icon={<BiLogOutCircle />}
            to={'/auth/login'}
            onClick={handleLogout}
          />
        </Navigation>
      </Sidebar>
    </>
  )
}

export default index
