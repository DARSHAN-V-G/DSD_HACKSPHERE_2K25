const express = require("express");
const { registerPatient, loginPatient, getPatientRecords } = require("../controllers/patientController");
const  protect  = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register",  registerPatient);
router.post("/login", loginPatient);
router.get("/:id/records",protect,  getPatientRecords);

module.exports = router;