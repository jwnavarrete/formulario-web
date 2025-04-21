import React, { useState } from "react";
import Img from "@components/ui/Img";
import Logo from "@assets/images/icons/gruppo-generali.svg";
import { FiDisc } from "react-icons/fi";

import {
  Navbar_Header,
  Navbar_Nav,
  Nav_Item,
  Navbar_Brand,
  Brand_Logo,
  Brand_Text,
  Modern_Nav,
} from "./components";

const index = () => {
  const [toogleSidebare, setToggleSidebar] = useState(false);

  const handelToggle = () => {
    setToggleSidebar(!toogleSidebare);
  };

  return (
    <Navbar_Header>
      <Navbar_Nav>
        <Nav_Item mrauto>
          <Navbar_Brand>
            <Brand_Logo>
              <Img src={Logo} alt="logo" />
            </Brand_Logo>
            <Brand_Text>Generali{toogleSidebare}</Brand_Text>
          </Navbar_Brand>
        </Nav_Item>
        <Nav_Item>
          <Modern_Nav onClick={handelToggle}>
            <FiDisc />
          </Modern_Nav>
        </Nav_Item>
      </Navbar_Nav>
    </Navbar_Header>
  );
};

export default index;
