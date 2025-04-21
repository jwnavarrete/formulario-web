import { Outlet } from "react-router-dom";
import {
  GridContainer,
  Header,
  HeaderTitle,
  FormText,
  Container,
  FormContainer,
  Footer,
  HeroInfo,
  Card,
  Title,
  Titles
} from "./components";
// 
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// 
import HeaderImg from "@assets/images/Header.svg";
import FooterImg from "@assets/images/Footer.png";

// ==============================|| MINIMAL LAYOUT ||============================== //

const FormLayout = () => (
  <>
    <GridContainer>
      <Header>
        <img src={HeaderImg} width={"100%"} />
      </Header>

      <HeaderTitle>
        <FormText>
          <HeroInfo>
            <Title>FORMULARIO DE VINCULACI&Oacute;N.</Title>
            <Titles>
              La informaci&oacute;n proporcionada en este formulario ser&aacute;
              estrictamente confidencial, misma que ser&aacute; utilizada por
              Generali Ecuador Compa&ntilde;&iacute;a de Seguros S.A. para la emisi&oacute;n de
              p&oacute;lizas.
            </Titles>
          </HeroInfo>
        </FormText>
      </HeaderTitle>
      
      <Container>
        <Divider />

        <FormContainer>
          <Card>
            <Outlet />
          </Card>
        </FormContainer>
      </Container>

      <Footer>
        <img src={FooterImg} width={"100%"} />
      </Footer>
    </GridContainer>
  </>
);

export default FormLayout;
