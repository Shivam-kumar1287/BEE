const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chatController = require('./Controller/chatController');
const Chat = require('./models/Chat');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/chatDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/register', chatController.getRegister);
app.post('/register', chatController.postRegister);

   app.get('/chat', async(req, res) => {
    const chat = await Chat.find()
    res.render('chat', {chat})
    console.log(chat)
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
