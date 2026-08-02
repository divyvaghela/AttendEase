const express = require("express");
const router = express.Router();

const {
    register,
    login,
    createUser
} = require("../controllers/authController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post(
    "/create-user",
    protect,
    adminOnly,
    createUser
);

module.exports = router;