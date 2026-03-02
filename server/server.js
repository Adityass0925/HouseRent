const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // <-- ADDED THIS: Needed for file paths
const connectDB = require("./config/connect");

// 1. Initialize dotenv to use environment variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

// 3. Initialize Express server
const app = express();

// 4. Use Middleware
app.use(express.json()); // Allows parsing of JSON data
app.use(cors()); // Enables Cross-Origin Resource Sharing

// <-- ADDED THIS: Make the 'uploads' folder public so the frontend can read images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 5. Register Route files 
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Basic test route
app.get("/", (req, res) => {
  res.send("HouseHunt API is running...");
});

// 6. Listen on a specific port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});