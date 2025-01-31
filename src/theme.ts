import { createTheme, alpha } from '@mui/material';

const primaryColor = '#6366F1';
const secondaryColor = '#EC4899';

const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: alpha(primaryColor, 0.8),
        dark: '#4338CA',
      },
      secondary: {
        main: secondaryColor,
        light: alpha(secondaryColor, 0.8),
        dark: '#BE185D',
      },
      background: {
        default: mode === 'light' ? '#F9FAFB' : '#111827',
        paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
      },
      success: {
        main: '#10B981',
        light: mode === 'light' ? '#A7F3D0' : '#065F46',
        dark: '#059669',
      },
      error: {
        main: '#EF4444',
        light: mode === 'light' ? '#FEE2E2' : '#991B1B',
        dark: '#B91C1C',
      },
      warning: {
        main: '#F59E0B',
        light: mode === 'light' ? '#FEF3C7' : '#92400E',
        dark: '#B45309',
      },
      info: {
        main: '#3B82F6',
        light: mode === 'light' ? '#DBEAFE' : '#1E40AF',
        dark: '#1D4ED8',
      },
      text: {
        primary: mode === 'light' ? '#111827' : '#F9FAFB',
        secondary: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 16px',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'light' 
                ? '0 4px 12px rgba(0,0,0,0.1)' 
                : '0 4px 12px rgba(0,0,0,0.3)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            boxShadow: mode === 'light' 
              ? '0 2px 6px rgba(0,0,0,0.08)' 
              : '0 2px 6px rgba(0,0,0,0.3)',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${alpha(primaryColor, 0.8)} 100%)`,
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${secondaryColor} 0%, ${alpha(secondaryColor, 0.8)} 100%)`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(0,0,0,0.05)' 
              : '0 4px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0 8px 24px rgba(0,0,0,0.1)' 
                : '0 8px 24px rgba(0,0,0,0.4)',
            },
            transition: 'all 0.3s ease-in-out',
            background: mode === 'light' ? '#FFFFFF' : '#1F2937',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(0,0,0,0.05)' 
              : '0 4px 12px rgba(0,0,0,0.3)',
            background: mode === 'light' ? '#FFFFFF' : '#1F2937',
          },
          elevation1: {
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(0,0,0,0.05)' 
              : '0 4px 12px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: mode === 'light' 
              ? 'rgba(0, 0, 0, 0.05)' 
              : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            boxShadow: mode === 'light' 
              ? '4px 0 12px rgba(0,0,0,0.05)' 
              : '4px 0 12px rgba(0,0,0,0.3)',
            background: mode === 'light' ? '#FFFFFF' : '#1F2937',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: alpha(primaryColor, mode === 'light' ? 0.1 : 0.2),
              '&:hover': {
                backgroundColor: alpha(primaryColor, mode === 'light' ? 0.15 : 0.25),
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(primaryColor, 0.4),
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 2px 6px rgba(0,0,0,0.08)' 
              : '0 2px 6px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid',
            borderColor: mode === 'light' 
              ? 'rgba(0, 0, 0, 0.05)' 
              : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
  });
};

export default getTheme; 