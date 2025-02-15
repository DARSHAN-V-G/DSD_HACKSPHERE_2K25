const MedicalRecord = require("../models/MedicalRecord");
const Patient = require("../models/Patient");
const { uploadToIPFS } = require("../services/ipfsService");
const { storeRecordHash } = require("../services/blockchainService");

exports.uploadMedicalRecord = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { patientId, metadata } = req.body;
    const doctorId = req.user.id; // Get from auth middleware
    const fileBuffer = req.file.buffer;

    // Ensure metadata is correctly parsed
    let parsedMetadata;
    try {
      parsedMetadata = JSON.parse(metadata);
    } catch (error) {
      return res.status(400).json({ error: "Invalid metadata format" });
    }

    // Upload file to IPFS
    const ipfsCID = await uploadToIPFS(fileBuffer);
    if (!ipfsCID) {
      return res.status(500).json({ error: "Failed to upload file to IPFS" });
    }

    // Create new medical record
    const newRecord = new MedicalRecord({
      patientId,
      doctorId,
      ipfsCID,
      metadata: {
        ...parsedMetadata,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        uploadDate: new Date()
      }
    });

    await newRecord.save();

    // Add record to patient's records array
    await Patient.findByIdAndUpdate(
      patientId,
      { $push: { medicalRecords: newRecord._id } }
    );

    res.status(201).json({ 
      message: "Medical record uploaded successfully",
      record: newRecord
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Check access permission here
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'patient' && record.patientId.toString() !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (userRole === 'doctor' && record.doctorId.toString() !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(record);
  } catch (error) {
    console.error("Get record error:", error);
    res.status(500).json({ error: "Server error" });
  }
};