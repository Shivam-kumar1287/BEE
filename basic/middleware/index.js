const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');

// Logger middleware
app.use((req, res, next) => {
  req.time = new Date().toString();
  console.log(`${req.method} ${req.hostname}${req.path} at ${req.time}`);
  next();
});

// Token verification middleware for /api routes
const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "123") {
    next();
  } else {
    return next(new ExpressError("Unauthorized", 401));
  }
};

// Apply token middleware to all /api routes
app.use("/api", checkToken);

// API route handler
app.get("/api", (req, res) => {
  res.send(`API Success! Accessed at: ${req.time}`);
});

// Example protected route
app.get("/api/data", (req, res) => {
  res.json({ message: "Protected data", timestamp: req.time });
});

// Error handler for ExpressError
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).send("Route not found!");
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
  console.log("Test URLs:");
  console.log("✅ http://localhost:3000/api?token=123 → API Success!");
  console.log("✅ http://localhost:3000/api/data?token=123 → JSON data");
  console.log("❌ http://localhost:3000/api?token=999 → Unauthorized");
  console.log("❌ http://localhost:3000/api → Unauthorized (no token)");
  console.log("❌ http://localhost:3000/wrong → Route not found!");
});