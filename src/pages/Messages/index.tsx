import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import {
  Send,
  Person,
  Search,
} from '@mui/icons-material';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'The meeting is scheduled for tomorrow',
    timestamp: '9:15 AM',
    unread: 0,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    lastMessage: 'Please review the latest changes',
    timestamp: 'Yesterday',
    unread: 1,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Hey, how are you?',
    timestamp: '10:30 AM',
    read: true,
  },
  {
    id: 2,
    sender: 'You',
    content: "I'm good, thanks! How about you?",
    timestamp: '10:31 AM',
    read: true,
  },
  {
    id: 3,
    sender: 'John Doe',
    content: 'Great! Did you check the latest reports?',
    timestamp: '10:32 AM',
    read: false,
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Messages
      </Typography>

      <Grid container spacing={3}>
        {/* Chats List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: 'calc(100vh - 200px)' }}>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search color="action" />,
                }}
              />
            </Box>
            <Divider />
            <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
              {mockChats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={selectedChat === chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <ListItemAvatar>
                    <Badge
                      color="primary"
                      badgeContent={chat.unread}
                      invisible={chat.unread === 0}
                    >
                      <Avatar>
                        <Person />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={chat.lastMessage}
                    secondaryTypographyProps={{
                      noWrap: true,
                      style: { maxWidth: '200px' },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {chat.timestamp}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Window */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: 'calc(100vh - 200px)' }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {mockChats.find((c) => c.id === selectedChat)?.name}
                  </Typography>
                </Box>

                {/* Messages */}
                <Box
                  sx={{
                    p: 2,
                    height: 'calc(100vh - 340px)',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {mockMessages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        maxWidth: '70%',
                        mb: 2,
                        alignSelf:
                          message.sender === 'You' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor:
                            message.sender === 'You'
                              ? 'primary.main'
                              : 'background.default',
                          color:
                            message.sender === 'You' ? 'white' : 'text.primary',
                        }}
                      >
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 1,
                            color:
                              message.sender === 'You'
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                          }}
                        >
                          {message.timestamp}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box
                  sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Messages; 