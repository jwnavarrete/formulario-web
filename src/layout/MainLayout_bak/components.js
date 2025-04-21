import styled from "@emotion/styled";

export const MainContainer = styled.div`
  display: grid;
  gap: 10px;
  height: 100vh;
  grid-template:
    "header" 100px
    "main" auto
    "footer" 100px;
  
  @media (min-width: 600px) {
    grid-template:
      "header  header" 60px
      "main main" auto
      "footer  footer" 60px /
      260px auto;
  }

  @media (min-width: 900px) {
    grid-template:
      "sidebar  header header" 75px
      "sidebar main  main" auto
      "sidebar footer footer" 50px /
      260px auto;
  }
`;
