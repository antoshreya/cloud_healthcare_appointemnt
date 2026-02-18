// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON bodies

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/incidents", require("./routes/incidentRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Incident Management System API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
