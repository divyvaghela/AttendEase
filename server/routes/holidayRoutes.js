const express = require("express");
const router = express.Router();

const {
    protect
} = require("../middleware/authMiddleware");
const {
  addHoliday,
  getHolidays,
  deleteHoliday,
} = require("../controllers/holidayController");

router.post("/", protect, addHoliday);

router.get("/", protect, getHolidays);

router.delete("/:id", protect, deleteHoliday);

module.exports = router;