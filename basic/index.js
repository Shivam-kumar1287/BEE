const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chatController = require('./Controller/chatController');
const Chat =     require('./models/Chat');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    console.log('Params:', req.params);
    console.log('Query:', req.query);
    console.log('---');
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/chatDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/register', chatController.getRegister);
app.post('/register', chatController.postRegister);

app.get('/chat/new',(req, res) => {
    res.render('newchat')
})
app.post('/chat/new',(req, res)=>{
    console.log("post request handler called")
    console.log('req.body', req.body);
    let newchat = new Chat({
        from: req.body.from,
        to: req.body.to,
        message: req.body.message,
        createdAt: new Date()
    })
    newchat.save()
    .then(() => {
        res.redirect('/chat')
    })
    .catch(err => {
        console.error('Error saving chat:', err)
        res.redirect('/chat')
    })
})

app.get('/chat', async(req, res) => {
    const chat = await Chat.find()
    res.render('chat', {chat})
    console.log(chat)
})
// Show all messages with edit options
app.get("/edit", async(req,res)=>{
    try {
        const chat = await Chat.find()
        res.render("editall", {chat})
    } catch(err) {
        console.error('Error finding chats:', err)
        res.redirect('/chat')
    }
})

// Edit specific message
app.get("/chat/:id/edit", chatController.getEditMessage);

// Handle message update
app.post("/chat/edit", chatController.updateMessage);

// PUT route for updating messages
app.put("/chat/:id", async(req,res)=>{
    console.log('PUT request received for chat ID:', req.params.id);
    console.log('PUT request body:', req.body);
    try {
        const updatedChat = await Chat.findByIdAndUpdate(req.params.id, {
            message: req.body.message
        }, { new: true })
        res.json({ success: true, chat: updatedChat })
    } catch(err) {
        console.error('Error updating chat via PUT:', err)
        res.status(500).json({ success: false, error: err.message })
    }
})

// DELETE route for deleting messages
app.delete("/chat/:id", async(req,res)=>{
    console.log('DELETE request received for chat ID:', req.params.id);
    try {
        await Chat.findByIdAndDelete(req.params.id)
        res.json({ success: true, message: 'Message deleted' })
    } catch(err) {
        console.error('Error deleting chat:', err)
        res.status(500).json({ success: false, error: err.message })
    }
})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
>>>>>>> a7ec2dd (added basic)
