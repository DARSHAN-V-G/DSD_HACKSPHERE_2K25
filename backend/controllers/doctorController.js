const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const MedicalRecord = require("../models/MedicalRecord");
require("dotenv").config();

exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newDoctor = new Doctor({ name, email, password, specialization });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor || !(await doctor.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        role: "doctor"
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPatientRecords = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    
    // Verify doctor's identity
    if (req.user.id !== doctorId || req.user.role !== 'doctor') {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Get patient's records
    const records = await MedicalRecord.find({
      patientId,
      $or: [
        { doctorId }, // Records created by this doctor
        { isSharedWithDoctors: true } // Publicly shared records
      ]
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    console.error("Fetch Records Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};