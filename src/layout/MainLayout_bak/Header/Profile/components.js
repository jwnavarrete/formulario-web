import styled from '@emotion/styled'

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const UserNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgb(110, 107, 123);
`

export const UserName = styled.p`
  font-size: 14px;
  font-weight: 600;
`

export const UserStatus = styled.span`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
`

export const Avatar = styled.span`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  `

export const AvatarImage = styled.span`
  background-color: #eee;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  align-items: center;
  overflow: hidden;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
    border-style: none;
  vertical-align: middle;
  text-align: center;
`
