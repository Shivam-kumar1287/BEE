const express = require('express');
const app = express();

// Logger middleware
app.use((req, res, next) => {
  req.time = new Date().toString();
  console.log(`${req.method} ${req.hostname}${req.path} at ${req.time}`);
  next();
});

// Token verification middleware for /api routes
//http://localhost:3000/api?token=123
 
app.use("/api", (req, res, next) => {
    console.log("API Middleware executed");
  if (req.query.token === '123') {
    console.log("Valid token");
    next(); // ✅ allow request to continue
  } else {
    return res.status(401).send('Unauthorized');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api', (req, res) => {
  res.send('Hello from API, token is valid ✅');
});

// 404 handler (keep this LAST)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});



const checktoken = (req, res, next) => {
  let { token } = req.query;
  if (token === "123") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

//syntax error 
//error handling middleware
// Route to intentionally throw an error
app.get("/wrong", (req, res, next) => {
  console.log("Error handling middleware executed");
  try {
    let addcs = notDefined + 5; // ❌ ReferenceError
    res.send(addcs);
  } catch (err) {
    next(err); // Pass error to error handler
  }
});

// Error handling middleware (MUST have 4 args)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Something broke! 💥");
});
//second to handel error
app.use(("/err",(req,res,next)=>{
  console.log("Error handling middleware executed");

}))

// 404 handler (keep this LAST)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

/*✅ Valid token → http://localhost:3000/api?token=123

❌ Invalid token → http://localhost:3000/api?token=999 → Unauthorized

❌ Missing token → http://localhost:3000/api → Unauthorized

💥 Trigger error → http://localhost:3000/wrong → Something broke! 💥 */
