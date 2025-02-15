const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
require("dotenv").config();

exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) return res.status(400).json({ error: "Email already exists" });

    const newPatient = new Patient({ name, email, password });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient || !(await patient.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: patient._id, role: "patient" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, patientId: patient._id });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPatientRecords = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId).populate("medicalRecords");

    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json(patient.medicalRecords);
  } catch (error) {
    console.error("Fetch Records Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
