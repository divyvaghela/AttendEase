const Holiday = require("../models/Holiday");

// Add Holiday
const addHoliday = async (req, res) => {
  try {

    const holiday = await Holiday.create(req.body);

    res.status(201).json({
      success: true,
      message: "Holiday Added Successfully",
      holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Holidays
const getHolidays = async (req, res) => {
  try {

    const holidays = await Holiday.find().sort({ date: 1 });

    res.json({
      success: true,
      holidays,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Holiday
const deleteHoliday = async (req, res) => {
  try {

    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: "Holiday not found",
      });
    }

    await holiday.deleteOne();

    res.json({
      success: true,
      message: "Holiday Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addHoliday,
  getHolidays,
  deleteHoliday,
};