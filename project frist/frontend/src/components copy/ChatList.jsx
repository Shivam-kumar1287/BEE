import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chats');
      setChats(response.data);
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chats/${id}`);
      fetchChats();
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>All Chats</Typography>
      <List>
        {chats.map(chat => (
          <ListItem key={chat._id} divider>
            <ListItemText
              primary={chat.message}
              secondary={`By: ${chat.personId} - ${new Date(chat.createdAt).toLocaleString()}`}
            />
            <Button
              component={Link}
              to={`/chats/${chat._id}`}
              startIcon={<VisibilityIcon />}
              size="small"
            >
              View
            </Button>
            <Button
              component={Link}
              to={`/chats/${chat._id}/edit`}
              startIcon={<EditIcon />}
              size="small"
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteChat(chat._id)}
              startIcon={<DeleteIcon />}
              size="small"
              color="error"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ChatList;