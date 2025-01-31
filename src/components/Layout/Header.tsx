import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Tooltip,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Search as SearchIcon,
  Mail,
  Settings,
  Person,
  Logout,
  DarkMode,
  LightMode,
  Help,
  AccountCircle,
  Security,
  Language,
  Close,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { toggleSidebar, toggleDarkMode, removeNotification } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications } = useSelector((state: RootState) => state.ui);
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [messagesAnchor, setMessagesAnchor] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');

  // Menu handlers
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleMessagesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMessagesAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleMessagesClose = () => {
    setMessagesAnchor(null);
  };

  // Navigation handlers
  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const handleSecurityClick = () => {
    navigate('/settings/security');
    handleClose();
  };

  const handleLanguageClick = () => {
    navigate('/settings/language');
    handleClose();
  };

  const handleHelpClick = () => {
    window.open('/help', '_blank');
    handleClose();
  };

  // Action handlers
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
    handleClose();
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  const handleNotificationDismiss = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => dispatch(toggleSidebar())}
          sx={{
            mr: 2,
            color: 'text.primary',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.04),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.black, 0.06),
            },
            marginRight: 2,
            marginLeft: 0,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon color="action" />
          </Box>
          <InputBase
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              color: 'inherit',
              padding: '8px 8px 8px 56px',
              width: '100%',
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Messages">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMessagesMenu}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.black, 0.04),
                '&:hover': {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.common.black, 0.06),
                },
              }}
            >
              <Badge color="error" variant="dot">
                <Mail />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationsMenu}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.black, 0.04),
                '&:hover': {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.common.black, 0.06),
                },
              }}
            >
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 1,
              cursor: 'pointer',
            }}
            onClick={handleMenu}
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                John Doe
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1 }}
              >
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* User Menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 250,
              boxShadow: (theme) =>
                `0 2px 10px ${alpha(theme.palette.common.black, 0.08)}`,
              mt: 1.5,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@example.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile" secondary="View and edit your profile" />
          </MenuItem>
          <MenuItem onClick={handleSecurityClick}>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Security" secondary="Manage your security settings" />
          </MenuItem>
          <MenuItem onClick={handleThemeToggle}>
            <ListItemIcon>
              {darkMode ? <LightMode /> : <DarkMode />}
            </ListItemIcon>
            <ListItemText 
              primary={`${darkMode ? 'Light' : 'Dark'} Mode`} 
              secondary="Change application theme" 
            />
          </MenuItem>
          <MenuItem onClick={handleLanguageClick}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Language" secondary="Change your language" />
          </MenuItem>
          <MenuItem onClick={handleHelpClick}>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help Center" secondary="Get help and support" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Logout sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" secondary="Sign out of your account" />
          </MenuItem>
        </Menu>

        {/* Messages Menu */}
        <Menu
          anchorEl={messagesAnchor}
          open={Boolean(messagesAnchor)}
          onClose={handleMessagesClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 320,
              boxShadow: (theme) =>
                `0 2px 10px ${alpha(theme.palette.common.black, 0.08)}`,
              mt: 1.5,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Messages</Typography>
              <Tooltip title="View all messages">
                <Typography 
                  variant="body2" 
                  color="primary" 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/messages');
                    handleMessagesClose();
                  }}
                >
                  View All
                </Typography>
              </Tooltip>
            </Box>
            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
              No new messages
            </Typography>
          </Box>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 320,
              boxShadow: (theme) =>
                `0 2px 10px ${alpha(theme.palette.common.black, 0.08)}`,
              mt: 1.5,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Notifications</Typography>
              {notifications.length > 0 && (
                <Tooltip title="Clear all notifications">
                  <Typography 
                    variant="body2" 
                    color="primary" 
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      notifications.forEach(n => handleNotificationDismiss(n.id));
                      handleNotificationsClose();
                    }}
                  >
                    Clear All
                  </Typography>
                </Tooltip>
              )}
            </Box>
            {notifications.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                No new notifications
              </Typography>
            ) : (
              notifications.map((notification) => (
                <MenuItem 
                  key={notification.id} 
                  sx={{ 
                    py: 1,
                    px: 2,
                    '&:hover': {
                      '& .dismiss-button': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <Badge color={notification.type} variant="dot">
                      <Notifications />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary={notification.message}
                    secondary="Just now"
                  />
                  <IconButton
                    size="small"
                    className="dismiss-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationDismiss(notification.id);
                    }}
                    sx={{ 
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      ml: 1,
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </MenuItem>
              ))
            )}
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 