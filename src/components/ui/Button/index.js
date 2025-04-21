import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`

const index = props => {
  return <Button {...props}>{props?.children}</Button>
}

export default index
