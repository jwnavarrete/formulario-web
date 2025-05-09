import styled, { css } from '@emotion/styled'

// html {
//     height: 100%
//  }

//  body {
//     margin: 0;
//     padding: 0;
//     height: 100% ;
//  }

export const SideDrawer = styled.div`
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease-out;

  ${props =>
    props.show &&
    css`
      transform: translateX(0);
    `}
`
