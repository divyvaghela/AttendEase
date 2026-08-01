const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();


// Routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feeRoutes = require("./routes/feeRoutes");
const holidayRoutes = require("./routes/holidayRoutes");


// Middleware
const protect = require("./middleware/authMiddleware");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());



// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/fees", feeRoutes);

app.use("/api/holidays", holidayRoutes);




// Protected Route

app.get("/api/profile", protect, (req,res)=>{

    res.json({

        success:true,

        user:req.user

    });

});




// Test Route

app.post("/test",(req,res)=>{

    res.send("POST Working");

});




// Home Route

app.get("/",(req,res)=>{

    res.send("AttendEase Backend Running 🚀");

});




// Database + Server

const PORT = process.env.PORT || 5000;


const startServer = async()=>{


    await connectDB();


    app.listen(PORT,()=>{


        console.log(
            `Server running on port ${PORT}`
        );


    });


};


startServer();