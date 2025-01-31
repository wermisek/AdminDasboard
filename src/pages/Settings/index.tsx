import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Grid,
} from '@mui/material';
import {
  Notifications,
  Security,
  Language,
  Palette,
  Storage,
  Backup,
  CloudUpload,
  Delete,
} from '@mui/icons-material';

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [openBackupDialog, setOpenBackupDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  primary="Notifications"
                  secondary="Configure notification preferences"
                />
                <Switch defaultChecked />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Enable additional security"
                />
                <Switch />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText
                  primary="Language"
                  secondary="Choose your preferred language"
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Palette />
                </ListItemIcon>
                <ListItemText
                  primary="Theme"
                  secondary="Choose your preferred theme"
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText
                  primary="Data Storage"
                  secondary="Manage your data storage preferences"
                />
                <Button variant="outlined" onClick={handleSave}>
                  Configure
                </Button>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Backup />
                </ListItemIcon>
                <ListItemText
                  primary="Backup"
                  secondary="Configure automatic backups"
                />
                <Button
                  variant="outlined"
                  onClick={() => setOpenBackupDialog(true)}
                >
                  Setup
                </Button>
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText
                  primary="Cloud Sync"
                  secondary="Sync your data with cloud storage"
                />
                <Switch defaultChecked />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Delete Account"
                  secondary="Permanently delete your account and all data"
                />
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openBackupDialog} onClose={() => setOpenBackupDialog(false)}>
        <DialogTitle>Backup Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Backup Frequency</InputLabel>
              <Select defaultValue="daily" label="Backup Frequency">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Retention Period</InputLabel>
              <Select defaultValue="30" label="Retention Period">
                <MenuItem value="7">7 days</MenuItem>
                <MenuItem value="30">30 days</MenuItem>
                <MenuItem value="90">90 days</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Backup Location"
              defaultValue="C:/backups"
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBackupDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenBackupDialog(false);
              handleSave();
            }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 