const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get all chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new chat
router.post('/', async (req, res) => {
  const chat = new Chat({
    personId: req.body.personId,
    message: req.body.message
  });

  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get single chat
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update chat
router.put('/:id', async (req, res) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true }
    );
    if (!updatedChat) return res.status(404).json({ message: 'Chat not found' });
    res.json(updatedChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete chat
router.delete('/:id', async (req, res) => {
  try {
    const deletedChat = await Chat.findByIdAndDelete(req.params.id);
    if (!deletedChat) return res.status(404).json({ message: 'Chat not found' });
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;