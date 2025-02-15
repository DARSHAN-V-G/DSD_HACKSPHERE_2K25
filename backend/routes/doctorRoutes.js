const express = require("express");
const { registerDoctor, loginDoctor, getPatientRecords } = require("../controllers/doctorController");
const  protect  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register",protect,  registerDoctor);
router.post("/login", protect, loginDoctor);
router.get("/:doctorId/patient/:patientId/records",protect, getPatientRecords);

module.exports = router;