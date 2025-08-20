import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ChatView() {
  const [chat, setChat] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChat();
  }, [id]);

  const fetchChat = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chats/${id}`);
      setChat(response.data);
    } catch (err) {
      console.error('Error fetching chat:', err);
    }
  };

  const deleteChat = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/chats/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  if (!chat) return <Typography>Loading...</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Chat Details</Typography>
      <Box mb={2}>
        <Typography variant="subtitle1"><strong>Person ID:</strong> {chat.personId}</Typography>
        <Typography variant="body1"><strong>Message:</strong> {chat.message}</Typography>
        <Typography variant="caption">
          <strong>Created At:</strong> {new Date(chat.createdAt).toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          component={Link}
          to={`/chats/${id}/edit`}
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          onClick={deleteChat}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>
    </Paper>
  );
}

export default ChatView;