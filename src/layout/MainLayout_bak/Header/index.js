import React from 'react'
import { Header, Navbar, Box, Ul, Li, Anchor, Row } from './components'
import {
  TbMenu2,
  TbCalendarMinus,
  TbMail,
  TbSearch
} from 'react-icons/tb'
import Profile from './Profile'

const index = ({ handleLeftDrawerToggle }) => {
  return (
    <Header>
      <Navbar>
        <Box>
          <Ul>
            <Li>
              <Anchor href='#' onClick={handleLeftDrawerToggle}>
                <TbMenu2 />
              </Anchor>
            </Li>
            <Li>
              <Anchor href='#'>
                <TbCalendarMinus />
              </Anchor>
            </Li>
            <Li>
              <Anchor href='#'>
                <TbMail />
              </Anchor>
            </Li>
          </Ul>
          <Row />
          <Ul>
            <Li>
              <Anchor href='#'>
                <TbSearch />
              </Anchor>
            </Li>
            <Li>
              <Anchor href='#'>
                <Profile />
              </Anchor>
            </Li>
          </Ul>
        </Box>
      </Navbar>
    </Header>
  )
}

export default index
