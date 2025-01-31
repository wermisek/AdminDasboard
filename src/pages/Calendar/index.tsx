import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Team Meeting',
    date: '2024-02-15',
    time: '10:00',
    description: 'Weekly team sync-up',
  },
  {
    id: 2,
    title: 'Product Launch',
    date: '2024-02-15',
    time: '14:00',
    description: 'New product release',
  },
  {
    id: 3,
    title: 'Client Call',
    date: '2024-02-16',
    time: '11:30',
    description: 'Discussion about new requirements',
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setOpenEventDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setOpenEventDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEventDialog(false);
    setSelectedEvent(null);
  };

  const renderCalendarDays = () => {
    const days = [];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ p: 2 }} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = mockEvents.filter((event) => event.date === dateString);

      days.push(
        <Box
          key={day}
          sx={{
            p: 1,
            border: 1,
            borderColor: 'divider',
            minHeight: 100,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight:
                date.toDateString() === new Date().toDateString()
                  ? 'bold'
                  : 'normal',
              color:
                date.toDateString() === new Date().toDateString()
                  ? 'primary.main'
                  : 'inherit',
            }}
          >
            {day}
          </Typography>
          {dayEvents.map((event) => (
            <Typography
              key={event.id}
              variant="caption"
              sx={{
                display: 'block',
                bgcolor: 'primary.main',
                color: 'white',
                p: 0.5,
                borderRadius: 1,
                mb: 0.5,
                cursor: 'pointer',
              }}
              onClick={() => handleEditEvent(event)}
            >
              {event.title}
            </Typography>
          ))}
        </Box>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Grid container columns={7}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Grid item xs={1} key={day}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {days.map((day, index) => (
            <Grid item xs={1} key={index}>
              {day}
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">Calendar</Typography>
        <Button startIcon={<Add />} variant="contained" onClick={handleAddEvent}>
          Add Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>{renderCalendarDays()}</Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upcoming Events
            </Typography>
            <List>
              {mockEvents
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event) => (
                  <ListItem key={event.id}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} ${event.time}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" size="small" color="error">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openEventDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            defaultValue={selectedEvent?.title}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            defaultValue={selectedEvent?.date}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            defaultValue={selectedEvent?.time}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            defaultValue={selectedEvent?.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">
            {selectedEvent ? 'Save Changes' : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar; 