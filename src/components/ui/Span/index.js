import React from "react";
import styled from "@emotion/styled";

const Span = styled.span`
  background: inherit;
`;

const index = (props) => {
  return <Span {...props}>{props.children}</Span>;
};

export default index;
