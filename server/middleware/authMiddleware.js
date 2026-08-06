const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// ================= PROTECT =================

const protect = async (req, res, next) => {
    try {

        let token;

        // Get Token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        console.log("==================================");
        console.log("TOKEN:", token);

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", decoded);

        console.log("Database:", mongoose.connection.name);
        console.log("Collection:", User.collection.name);

        console.log("decoded.id:", decoded.id);
        console.log("typeof:", typeof decoded.id);

        console.log(
            "Valid ObjectId:",
            mongoose.Types.ObjectId.isValid(decoded.id)
        );

        // Show all users
        const allUsers = await User.find({}).select("-password");

        console.log("========== USERS IN DB ==========");
        console.log(allUsers);
        console.log("=================================");

        // Try every possible query
        const user1 = await User.findById(decoded.id);

        const user2 = await User.findOne({
            _id: decoded.id
        });

        const user3 = await User.findOne({
            email: "divyvaghela63@gmail.com"
        });

        console.log("findById:", user1);
        console.log("findOne(_id):", user2);
        console.log("findOne(email):", user3);

        const user = user1 || user2 || user3;

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("AUTH ERROR:", err);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

// ================= ADMIN ONLY =================

const adminOnly = (req, res, next) => {

    if (
        req.user &&
        req.user.role === "Admin"
    ) {
        return next();
    }

    return res.status(403).json({
        message: "Admin access required"
    });
};

module.exports = {
    protect,
    adminOnly
};  