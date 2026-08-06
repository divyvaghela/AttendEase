const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feeRoutes = require("./routes/feeRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
// Middleware
const { protect } = require("./middleware/authMiddleware");

// Model (Debug)
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/holidays", holidayRoutes);

// Protected Test
app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// Test Route
app.post("/test", (req, res) => {
    res.send("POST Working");
});

// Home
app.get("/", (req, res) => {
    res.send("AttendEase Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        // ===== DEBUG =====
        const users = await User.find().select("-password");
        console.log("========== USERS IN DB ==========");
        console.log(users);
        console.log("================================");
        // =================

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.log("Server Start Error:", err);
    }
};

startServer();