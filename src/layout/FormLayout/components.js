import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "Header"
    "Aside"
    "Main"
    "Footer";
  grid-template-columns: 8fr;
  grid-template-rows: auto auto auto;
  grid-auto-flow: column;
  height: 100vh;

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      "Header"
      "Aside"
      "Main"
      "Footer";
  }
`;

export const Header = styled.div`
  grid-area: Header;
  display: flex;
  justify-content: space-between;
`;

export const HeaderTitle = styled.div`
  grid-area: Aside;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const FormText = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

export const HeroInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  grid-area: Main;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 80%;
`;

export const Card = styled.div`
  width: 100%;
  // border-radius: 3%;
  // box-shadow: -1px -2px 25px 0px rgba(0, 0, 0, 0.75);
  // -webkit-box-shadow: -1px -2px 25px 0px rgba(0, 0, 0, 0.75);
  // -moz-box-shadow: -1px -2px 25px 0px rgba(0, 0, 0, 0.75);
  margin-top: 40px;
  @media only screen and (max-width: 600px) {
    min-height: 1100px;
  }
`;

export const Footer = styled.div`
  grid-area: Footer;
  height: 100px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #c11e0c;
  font-weight: 300px;
  line-height: 1.2;
  font-size: 35px !important;

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

export const Titles = styled.p`
  // letter-spacing: 2px;
  /* line-height: 30px; */
  font-size: 16px !important;
  text-align: justify;
`;

export const Input = styled.h1`

`;
