const express = require("express");
const multer = require("multer");
const { uploadMedicalRecord, getRecord } = require("../controllers/medicalRecordController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept common medical file types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/dicom',
      'application/dicom'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post("/upload", authMiddleware, upload.single("file"), uploadMedicalRecord);
router.get("/:id", authMiddleware, getRecord);

module.exports = router;