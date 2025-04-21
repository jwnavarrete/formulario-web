import React from 'react'
import styled from '@emotion/styled'

const Error = styled.p`
  font-size: 12px;
  margin: 0;
  width: 100%;
  text-align: left;
  color: #ff4b2b;
`

const index = props => {
  return <Error {...props}>{props?.children}</Error>
}

export default index
