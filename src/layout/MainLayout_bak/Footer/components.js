import styled from "@emotion/styled";

export const Footer = styled.footer`
  grid-area: footer;
  padding: 0.8rem 2rem;
  min-height: 3.35rem;
  display: block;
`;

export const Paragraph = styled.p`
  margin-bottom: 0 !important;
  margin-top: 0;
  margin-bottom: 1rem;
  display: block;
  /* margin-block-start: 1em;
  margin-block-end: 1em; */
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const SpanLeft = styled.span`
  margin-top: 0.25rem !important;
  float: left !important;
  font-size: 14px;
  line-height: 1.5rem;
`;

export const LinkSite = styled.a`
  margin-left: 0.25rem !important;
  background-color: transparent;
  color: red;
  text-decoration: none;
`;

export const SpanRight = styled.span`
  display: block!important;
  float: right !important;
  font-size: 14px;
  line-height: 1.5rem;
`;
