const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

console.log("protect:", protect);
console.log("addStudent:", addStudent);
console.log("getStudents:", getStudents);
console.log("getStudentById:", getStudentById);
console.log("updateStudent:", updateStudent);
console.log("deleteStudent:", deleteStudent);

router.post("/", protect, addStudent);

router.get("/", protect, getStudents);

router.get("/:id", protect, getStudentById);

router.put("/:id", protect, updateStudent);

router.delete("/:id", protect, deleteStudent);

module.exports = router;