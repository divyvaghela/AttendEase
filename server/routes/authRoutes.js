const express = require("express");
const router = express.Router();

const {
    register,
    login,
    createUser,
    getUsers,
    updateUser,
    deleteUser
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

router.get(
    "/users",
    protect,
    adminOnly,
    getUsers
);

router.put(
    "/update-user/:id",
    protect,
    adminOnly,
    updateUser
);

router.delete(
    "/delete-user/:id",
    protect,
    adminOnly,
    deleteUser
);

module.exports = router;