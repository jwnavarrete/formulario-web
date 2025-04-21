import styled from "@emotion/styled";
import Span from "@components/ui/Span";
import { Link } from "react-router-dom";

export const Sidebar = styled.aside`
  grid-area: sidebar;
  background: #ffff;

  li {
    list-style: none;
  }

  @media (max-width: 600px) {
    display: none;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Navigation = styled.ul`
  padding-bottom: 20px;
  font-size: 1.1rem;
  font-family: Montserrat, Helvetica, Arial, serif;
  font-weight: 400;
  overflow-y: hidden;

  li {
    position: relative;
    white-space: nowrap;

    a {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin: 0 15px;
      padding: 10px 15px 10px 15px;
      color: #625f6e;
      line-height: 1.45;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export const NavigationHeader = styled.li`
  font-family: Montserrat, Helvetica, Arial, serif;
  font-weight: 500;
  margin: 2.256rem 0 0.8rem 2.2rem;
  padding: 0;
  color: #a6a4b0;
  line-height: 1.5;
  letter-spacing: 0.01rem;
  font-size: 0.9rem;
  text-transform: uppercase;

  span {
    font-weight: 500;
  }
`;

export const NavItem = styled.li``;

export const Item = styled.a`
  display: flex !important;
  margin: 0 15px;
  text-decoration: none;

  > svg {
    height: 20px;
    width: 20px;
    position: relative;
    margin-right: 1.1rem;
  }

  &:hover {
    padding-left: 19px;
    transition: ease-in 0.2s;
  }

  ${({ open }) =>
    open &&
    `
    background: #efdbdb;
    border-radius: 6px;  
  `}

  ${({ active }) =>
    active &&
    `
  background: #b10b0b;
  color: #fff !important;
  border-radius: 0.5rem;
   `}
`;

export const LinkItem = styled(Link)`
  display: flex !important;
  margin: 0 15px;
  text-decoration: none;

  > svg {
    height: 20px;
    width: 20px;
    position: relative;
    margin-right: 1.1rem;
  }

  &:hover {
    padding-left: 19px;
    transition: ease-in 0.2s;
  }

  ${({ open }) =>
    open &&
    `
    background: #efdbdb;
    border-radius: 6px;  
  `}

  ${({ active }) =>
    active &&
    `
  background: #b10b0b;
  color: #fff !important;
  border-radius: 0.5rem;
   `}
`;

export const TextTruncate = styled(Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MenuContentCollapse = styled.ul`
  clip: rect(0px 112px 175px 0px);
  transition: clip 600ms ease-out;

  ${({ collapse }) =>
    collapse
      ? `
      display: none;
   `
      : `
      display:block;
      `}
`;
