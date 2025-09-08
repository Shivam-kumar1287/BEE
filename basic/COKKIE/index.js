const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cookieParser());

// Import routes (make sure these files exist)
// const userRouter = require('./routes/userRoutes');
// const postRouter = require('./routes/postRoutes');

// // Use the routers
// app.use('/users', userRouter);
// app.use('/posts', postRouter);

// Root route
app.get('/', (req, res) => {
    console.dir(req.cookies);
    res.send('Hello World!');
});

app.get("/getcookies", (req, res) => {
    console.dir(req.cookies);
    res.send("cookies");
    res.send("about page");
});
//signed cookies
app.get("/setcookies", (req, res) => {
    res.cookie("isLoggedIn", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.cookie("isPrimeMember", true);
    res.cookie("made-in","shivam")
    res.send("cookies has been set");
    req.send("singed cokkie")
});
app.get("/verfiy",(req,res)=> {
    console.dir(req.cookies)
    res.send("cookies");
    res.send("about page");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});