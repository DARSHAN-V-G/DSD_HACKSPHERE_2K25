const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  ipfsCID: { type: String, required: true },
  recordHash: String,
  isSharedWithDoctors: { type: Boolean, default: false },
  metadata: {
    title: String,
    description: String,
    recordType: String,
    recordDate: Date,
    fileName: String,
    fileType: String,
    fileSize: Number,
    uploadDate: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);