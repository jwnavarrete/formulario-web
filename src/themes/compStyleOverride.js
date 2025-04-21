export default function componentStyleOverrides(theme) {
  const bgColor = theme.colors?.grey100; // placeholder
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.grey100,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.menuSelected,
            backgroundColor: '#d50000',
            '&:hover': {
              backgroundColor: '#d50000',
            },
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF', // color del click en viñetas
            },
          },
          '&:hover': {
            backgroundColor: '#d50000',
            color: theme.menuSelected,
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF', // color del hover
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#000000', // COLOR del icono cerrar sesion
          minWidth: '36px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.grey800,
          '&::placeholder': {
            color: theme.grey700,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme?.colors?.primaryDark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.colors?.primaryLight,
          background: theme.colors?.grey50,
        },
      },
    },
    DataGrid: {
      styleOverrides: {
        root: {
          color: '#000000', // Asegúrate de que sea un color válido
        },
      },
    },  
    MuiPickersYear: {
      styleOverrides: {
        root: {
          backgroundColor: theme.colors?.grey400,
          color: 'black',
          '&:hover': {
            backgroundColor: theme.colors?.primaryDark,
            color: 'white',
          },
        },
        selected: {
          backgroundColor: theme.colors?.primaryDark,
          color: 'white',
        },
      },
    },  
  };
}