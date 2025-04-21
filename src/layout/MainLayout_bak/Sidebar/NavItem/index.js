import React from "react";
import { NavItem, LinkItem, TextTruncate } from "../components";

const index = (props) => {
  return (
    <NavItem>
      <LinkItem {...props}>
        {props.icon}
        <TextTruncate>{props.title}</TextTruncate>
      </LinkItem>
    </NavItem>
  );
};

export default index;
