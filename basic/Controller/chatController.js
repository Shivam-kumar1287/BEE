const Chat = require('../models/Chat');

// Render the register form page
exports.getRegister = (req, res) => {
    res.render('register');
};

// Handle form POST request and save chat to DB
exports.postRegister = async (req, res) => {
    try {
        const { from, to, message } = req.body;

        const newChat = new Chat({ from, to, message });

        await newChat.save();

        console.log('Chat saved:', newChat);

        // Send success response (you can redirect or render a page too)
        res.send('Chat message saved successfully!');
    } catch (error) {
        console.error('Error saving chat:', error);
        res.status(500).send('Server error. Could not save chat.');
    }
};

// Render edit page for a specific message
exports.getEditMessage = async (req, res) => {
    try {
        const message = await Chat.findById(req.params.id);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        res.render('edit', { chat: message });
    } catch (error) {
        console.error('Error finding message:', error);
        res.status(500).redirect('/chat');
    }
};

// Handle message update
exports.updateMessage = async (req, res) => {
    try {
        const { id, message } = req.body;
        await Chat.findByIdAndUpdate(id, { message });
        res.redirect('/chat');
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).redirect('/chat');
    }
};
