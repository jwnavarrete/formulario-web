export default function themePalette (theme) {
    return {
      mode: theme?.customization?.navType,
      primary: {
        light: theme.colors?.primaryLight,
        main: theme.colors?.primaryMain,
        dark: theme.colors?.primaryDark
      },
      secondary: {
        light: theme.colors?.secondaryLight,
        main: theme.colors?.secondaryMain,
        dark: theme.colors?.secondaryDark
      },
      grey: {
        50: theme.colors?.grey50,
        100: theme.colors?.grey100,
        500: theme.colors?.grey500,
        600: theme.colors?.grey600,
        700: theme.colors?.grey700,
        900: theme.colors?.grey900
      },
      dark: {
        light: theme.colors?.grey50,
        main: theme.colors?.grey600,
        dark: theme.colors?.grey900,
        800: theme.colors?.grey800,
        900: theme.colors?.grey900
      },
      text: {
        primary: theme.colors?.grey900,
        secondary: theme.colors?.grey700,
        dark: theme.colors?.grey50, //letra e icono
        hint: theme.colors?.grey100
      },
      background: {
        paper: theme.paper,
        default: theme.backgroundDefault
      }
    }
  }
  