import React from "react";
import { Footer, Paragraph, SpanLeft, SpanRight, LinkSite } from "./components";
import { BiHeart } from "react-icons/bi";

const index = () => {
  return (
    <Footer>
      <Paragraph>
        <SpanLeft>
          COPYRIGHT 2022 <LinkSite>Generali</LinkSite>, All rights Reserved
        </SpanLeft>
        <SpanRight>
          Hand-crafted & Made with <BiHeart style={{ color: "red" }} />{" "}
        </SpanRight>
      </Paragraph>
    </Footer>
  );
};

export default index;
