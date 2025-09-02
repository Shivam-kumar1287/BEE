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
  res.json({ 
    message: "Protected data", 
    timestamp: req.time,
    user: "Authenticated User"
  });
});

// Public route (no token needed)
app.get("/", (req, res) => {
  res.send("Welcome to the API! Use /api?token=123 to access protected routes.");
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

app.get("/admin", (req, res, next) => {
  // Check if user is admin (example logic)
  const isAdmin = req.query.role === "admin";
  
  if (!isAdmin) {
    // Pass error to error handler - this will skip the response send
    return next(new ExpressError("You are not an admin!", 403));
  }
  
  // If admin, show admin page
  res.send("Welcome to Admin Dashboard!");
});


/*// Enhanced error handler
app.use((error, req, res, next) => {
  if (error instanceof ExpressError) {
    return res.status(error.status).json({
      error: error.message,
      status: error.status
    });
  }
  
  // Log unexpected errors
  console.error("Unexpected Error:", error);
  
  // Don't expose internal errors in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : error.message;
    
  res.status(500).json({ error: message });
}); */


/*error handle use name  */

const UnauthorizedError = (message, status) => {
  const err = new Error(message);
  err.name = "UnauthorizedError";
  err.status = status;
  return err;
};

// Error handling middleware (MUST have 4 args)
app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  if(err.name==`"UnauthorizedError"`){
   err=UnauthorizedError("You are not authorized to access this resource",401);
   res.status(err.status).send(err.message);
  }
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
  console.log("Test URLs:");
  console.log("🌐 http://localhost:3000/ → Welcome page");
  console.log("✅ http://localhost:3000/api?token=123 → API Success!");
  console.log("✅ http://localhost:3000/api/data?token=123 → JSON data");
  console.log("❌ http://localhost:3000/api?token=999 → Unauthorized");
  console.log("❌ http://localhost:3000/api → Unauthorized (no token)");
  console.log("❌ http://localhost:3000/wrong → Route not found!");
  console.log("❌ http://localhost:3000/admin → Forbidden (not an admin)");
});