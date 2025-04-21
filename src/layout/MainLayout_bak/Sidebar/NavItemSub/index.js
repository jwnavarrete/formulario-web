import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import {
  NavItem,
  Item,
  TextTruncate,
  MenuContentCollapse,
} from "../components";

const index = (props) => {
  const [collapse, setCollapse] = useState(true);
  let iconStyled = { position: "absolute", right: "5px" };

  const handelCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <NavItem>
      <Item {...props} onClick={handelCollapse} open={!collapse}>
        {props.icon}
        <TextTruncate>{props.title}</TextTruncate>
        {/* <BiCaretRight style={iconStyled} /> */}
        <BiCaretDown style={iconStyled} />
      </Item>
      {/* AQUI SE MUESTRAN LOS HIJOS */}
      <MenuContentCollapse collapse={collapse}>
        {props.children}
      </MenuContentCollapse>
    </NavItem>
  );
};

export default index;
