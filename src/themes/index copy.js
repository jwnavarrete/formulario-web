import colors from "@assets/scss/_themes-vars.module.scss";
import themePalette from "./palette";
import { createTheme } from "@mui/material/styles";

export const theme = () => {
  const color = colors;

  let theme = createTheme({
    palette: {
      primary: {
        main: "#c11e0c",
      },
      secondary: {
        main: "#3d3d5d",
      },
      warning: {
        main: "#d37222",
      },
    },
  });

  theme = createTheme(theme, {
    palette: {
      info: {
        main: theme.palette.secondary.main,
      },
    },
  });

   const themeOption = {
    navType: "light",
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  return theme;
};

export default theme();