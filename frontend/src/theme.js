import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9f7aea',
      light: '#b794f4',
      dark: '#805ad5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f6ad55',
      light: '#fbd38d',
      dark: '#dd6b20',
      contrastText: '#000000',
    },
    background: {
      default: '#12071f',
      paper: '#1a0f2e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(159, 122, 234, 0.12)',
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.05em',
      background: 'linear-gradient(45deg, #9f7aea 30%, #f6ad55 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.03em',
      background: 'linear-gradient(45deg, #9f7aea 30%, #f6ad55 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #12071f 0%, #1a0f2e 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1f4f 100%)',
          borderRadius: 12,
          border: '1px solid rgba(159, 122, 234, 0.12)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(159, 122, 234, 0.2)',
            border: '1px solid rgba(159, 122, 234, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.05em',
          padding: '8px 16px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(159, 122, 234, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #9f7aea 30%, #805ad5 90%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(45deg, #b794f4 30%, #9f7aea 90%)',
          },
        },
        outlined: {
          borderColor: '#9f7aea',
          color: '#9f7aea',
          '&:hover': {
            borderColor: '#9f7aea',
            background: 'rgba(159, 122, 234, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(159, 122, 234, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(159, 122, 234, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9f7aea',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 15, 46, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(159, 122, 234, 0.12)',
        },
      },
    },
  },
});

export default theme;