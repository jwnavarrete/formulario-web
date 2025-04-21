import { createTheme } from '@mui/material/styles'

// assets
import colors from '@assets/scss/_themes-vars.module.scss'

// project imports
import componentStyleOverrides from './compStyleOverride'
import themePalette from './palette'
import themeTypography from './typography'

export const theme = customization => {
  const color = colors

  const themeOption = {
    colors: color,
    heading: color.grey50,
    paper: color.grey50, // color.primaryMain,
    backgroundDefault: color.grey200,
    background: color.grey200,
    textPrimary: color.grey900,
    textSecondary: color.grey900, //color text tabla and header
    darkTextPrimary: color.grey800,
    darkTextSecondary: color.grey300,
    text: color.grey100,
    textDark: color.grey900,
    menuSelected: color.grey50,
    menuSelectedBack: color.primaryMain, // color.primaryLight
    divider: color.grey200,
    customization
  }

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '50px',
        padding: '0px',
        '@media (min-width: 600px)': {
          minHeight: '50px'
        }
      }
    },
    typography: themeTypography(themeOption)
  }

  const themes = createTheme(themeOptions)
  themes.components = componentStyleOverrides(themeOption)

  return themes
}

export default theme
