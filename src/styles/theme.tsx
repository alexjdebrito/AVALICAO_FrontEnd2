import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: {
      main: '#991b1b',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.25rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      textAlign: 'center',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '0.95rem',
      color: '#64748b',
      textAlign: 'center',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
  },

  shape: {
    borderRadius: 8,
  },

components: {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },

      body: {
        WebkitFontSmoothing: 'antialiased',
      },

      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.25)',
        border: '1px solid rgba(255,255,255,0.35)',
        backdropFilter: 'blur(4px)',
        color: 'inherit',
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      input: {
        color: 'inherit',

        '&::placeholder': {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 1,
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        color: 'inherit',

        '& fieldset': {
          border: '1px solid rgba(255,255,255,0.35)',
        },

        '&:hover fieldset': {
          border: '1px solid rgba(255,255,255,0.5)',
        },

        '&.Mui-focused fieldset': {
          border: '1px solid rgba(255,255,255,0.7)',
        },

        '& input': {
          padding: '12px 16px',
        },

        '& input::placeholder': {
          color: 'rgba(255,255,255,0.6)',
          opacity: 1,
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow: 'none',
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.35)',
        boxShadow: 'none',
      },
    },
  },
},
});

export default theme;
