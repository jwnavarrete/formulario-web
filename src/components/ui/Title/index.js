import React from 'react'
import styled from '@emotion/styled'

const Title = styled.h1`
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
`

const index = (props) => {
  return (
    <Title {...props}>{props?.children}</Title>
  )
}

export default index