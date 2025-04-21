import React from 'react'
import {
  UserProfile,
  UserNav,
  UserName,
  UserStatus,
  Avatar,
  AvatarImage,
  Image
} from './components.js'
import UserIcon from '@assets/images/avatar.png'

const index = () => {
  return (
    <UserProfile>
      <UserNav>
        <UserName>Administrador</UserName>
        <UserStatus>admin</UserStatus>
      </UserNav>
      <Avatar>
        <AvatarImage>
          <Image src={UserIcon} />
        </AvatarImage>
      </Avatar>
    </UserProfile>
  )
}

export default index
