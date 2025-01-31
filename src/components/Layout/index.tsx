import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Sidebar from './Sidebar';
import Header from './Header';
import Routes from '../../routes';

const Layout = () => {
  const theme = useTheme();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useState(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: isMobile ? 0 : sidebarOpen ? '240px' : '64px',
          bgcolor: 'background.default',
        }}
      >
        <Header />
        <Box sx={{ p: 3 }}>
          <Routes />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 