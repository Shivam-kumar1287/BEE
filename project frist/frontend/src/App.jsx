import { Routes, Route, Link } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import ChatForm from './components/ChatForm';
import ChatForm from "./components/ChatForm";

import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/chats/new">New Chat</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chats/new" element={<ChatForm />} />
          <Route path="/chats/:id" element={<ChatView />} />
          <Route path="/chats/:id/edit" element={<ChatForm editMode={true} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;