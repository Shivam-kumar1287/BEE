const mongoose = require('mongoose');
const Chat = require('../models/Chat');


mongoose.connect('mongodb://localhost:27017/chatDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

let chatData = [
    {
        from: "shivam",
        to: "rohit",
        message: "hello"
    },
    {
        from: "rohit",
        to: "shivam",
        message: "hello"
    },
    {
        from: "shivam",
        to: "rohit",
        message: "hello"
    },
    {
        from: "rohit",
        to: "shivam",
        message: "hello"
    }
    ,{
        from:"rana",
        to:"shivam",
        message:"hello"
    }
];

Chat.insertMany(chatData)
.then(() => {
    console.log('Chat data inserted successfully');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error inserting chat data:', err);
    mongoose.connection.close();
});
