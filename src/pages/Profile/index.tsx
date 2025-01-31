import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  Tab,
  Tabs,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Edit,
  Save,
  PhotoCamera,
  Notifications,
  Security,
  Language,
  Palette,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    setEditMode(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Profile
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                src="https://via.placeholder.com/150"
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 0,
                  bgcolor: 'background.paper',
                }}
                size="small"
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              Administrator
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <Save /> : <Edit />}
              {editMode ? ' Save Profile' : ' Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<Person />} label="Personal Info" />
              <Tab icon={<Security />} label="Security" />
              <Tab icon={<Notifications />} label="Notifications" />
              <Tab icon={<Palette />} label="Preferences" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    defaultValue="John"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    defaultValue="Doe"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue="john.doe@example.com"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={4}
                    defaultValue="Administrator with 5 years of experience in system management and team leadership."
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Enable two-factor authentication for enhanced security"
                  />
                  <Switch />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your password regularly for better security"
                  />
                  <Button variant="outlined" color="primary">
                    Change
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Login History"
                    secondary="View your recent login activities"
                  />
                  <Button variant="text">View</Button>
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <Switch defaultChecked />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications on your device"
                  />
                  <Switch defaultChecked />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Marketing Communications"
                    secondary="Receive updates about new features and promotions"
                  />
                  <Switch />
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Language"
                    secondary="Choose your preferred language"
                  />
                  <Button
                    variant="text"
                    startIcon={<Language />}
                    onClick={() => {}}
                  >
                    English
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Theme"
                    secondary="Choose between light and dark theme"
                  />
                  <Button
                    variant="text"
                    startIcon={<Palette />}
                    onClick={() => {}}
                  >
                    Light
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Time Zone"
                    secondary="Set your local time zone"
                  />
                  <Button variant="text" onClick={() => {}}>
                    UTC+00:00
                  </Button>
                </ListItem>
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 