import { createTheme } from '@mui/material/styles';

const glass = {
  background: 'rgba(255,255,255,0.2)',
  border: '1px solid rgba(255,255,255,0.35)',
};

const theme = createTheme({
  palette: {
    primary:    { main: '#ffffff' },
    text:       { primary: '#ffffff', secondary: 'rgba(255,255,255,0.75)' },
    background: { default: 'transparent', paper: 'rgba(255,255,255,0.12)' },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: { color: '#ffffff' },
    h2:  { fontSize: '2rem',   fontWeight: 700, textAlign: 'center' as const },
    h5:  { fontSize: '1.5rem', fontWeight: 600 },
    h6:  { fontSize: '1.1rem', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem' },
  },

  shape: { borderRadius: 8 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },
        body: { margin: 0, padding: 0, WebkitFontSmoothing: 'antialiased' },
        '::placeholder': { color: 'rgba(255,255,255,0.55)', opacity: 1 },
      },
    },

    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: {
          ...glass,
          backdropFilter: 'blur(4px)',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          whiteSpace: 'nowrap',
          '&:hover': { background: 'rgba(255,255,255,0.32)', boxShadow: 'none' },
          '&.Mui-disabled': { opacity: 0.5, color: '#fff' },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ...glass,
          backdropFilter: 'blur(4px)',
          color: '#fff',
          '& fieldset':              { border: glass.border },
          '&:hover fieldset':        { border: '1px solid rgba(255,255,255,0.5)' },
          '&.Mui-focused fieldset':  { border: '1px solid rgba(255,255,255,0.7)' },
          '& input':                 { padding: '12px 16px', color: '#fff' },
          '& input::placeholder':    { color: 'rgba(255,255,255,0.55)', opacity: 1 },
        },
      },
    },

    MuiTextField: { defaultProps: { variant: 'outlined' } },

    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

export default theme;
