const express = require("express");

const router = express.Router();

const {
    protect
} = require("../middleware/authMiddleware")
const {
    markAttendance,
    getAttendance,
    deleteAttendance,
    getAttendancePercentage,
    markBulkAttendance

} = require("../controllers/attendanceController");
router.post(
    "/",
    protect,
    markAttendance
);

router.get(
    "/",
    protect,
    getAttendance
);

router.get(
    "/percentage/:studentId",
    protect,
    getAttendancePercentage
);

router.post("/bulk",protect,markBulkAttendance);

router.delete("/:id", protect, deleteAttendance);

module.exports = router;