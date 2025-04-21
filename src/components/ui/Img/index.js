import React from "react";
import styled from "@emotion/styled";

const Img = styled.img`
  max-width: ${(props) => props.max_width};
  min-width: ${(props) => props.min_width};
`;

const index = (props) => {
  return <Img {...props}/>;
};

export default index;
