const express = require("express");
const router = express.Router();


const {
    addFee,
    getFees,
    getStudentFees,
    updateFee,
    deleteFee
} = require("../controllers/feeController");


const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");




// Collect Fee

router.post(
    "/",
    protect,
    adminOnly,
    addFee
);




// Get All Fees

router.get(
    "/",
    protect,
    adminOnly,
    getFees
);




// Get Student Fee History

router.get(
    "/student/:studentId",
    protect,
    adminOnly,
    getStudentFees
);




// Update Fee

router.put(
    "/:id",
    protect,
    adminOnly,
    updateFee
);




// Delete Fee

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteFee
);



module.exports = router;