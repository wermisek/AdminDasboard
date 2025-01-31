import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  People,
  ShoppingCart,
  Assessment,
  Settings,
  Mail,
  CalendarToday,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Search,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/slices/uiSlice';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Products', icon: <ShoppingCart />, path: '/products' },
  { text: 'Analytics', icon: <Assessment />, path: '/analytics' },
  { text: 'Messages', icon: <Mail />, path: '/messages' },
  { text: 'Calendar', icon: <CalendarToday />, path: '/calendar' },
];

const secondaryMenuItems = [
  { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 280 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 280 : 80,
          boxSizing: 'border-box',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          borderRight: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'space-between' : 'center',
          px: sidebarOpen ? 3 : 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {sidebarOpen && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Admin Panel
          </Typography>
        )}
        <IconButton onClick={() => dispatch(toggleSidebar())}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* User Profile */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          mb: 1,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          JD
        </Avatar>
        {sidebarOpen && (
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        )}
      </Box>

      {/* Quick Actions */}
      {sidebarOpen && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              p: 1,
              bgcolor: 'background.default',
              borderRadius: 2,
            }}
          >
            <Tooltip title="Search">
              <IconButton size="small">
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton size="small">
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton size="small">
                <Settings />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* Main Menu */}
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 'white' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Secondary Menu */}
      <List component="nav" sx={{ px: 2 }}>
        {secondaryMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 