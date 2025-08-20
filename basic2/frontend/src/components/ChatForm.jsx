import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ChatForm({ editMode = false }) {
  const [formData, setFormData] = useState({
    personId: '',
    message: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode) {
      fetchChat();
    }
  }, [editMode, id]);

  const fetchChat = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chats/${id}`);
      setFormData({
        personId: response.data.personId,
        message: response.data.message
      });
    } catch (err) {
      console.error('Error fetching chat:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/chats/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/chats', formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving chat:', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {editMode ? 'Edit Chat' : 'New Chat'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Person ID"
          name="personId"
          value={formData.personId}
          onChange={handleChange}
          required
          disabled={editMode}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button type="submit" variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
          <Button
            component={Link}
            to={editMode ? `/chats/${id}` : '/'}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ChatForm;