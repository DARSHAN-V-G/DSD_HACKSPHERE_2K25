const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const googleFitRoutes = require("./routes/googleFitRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes - standardize with /api prefix
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/records", medicalRecordRoutes);
app.use("/api/googlefit", googleFitRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Blockchain Medical Records API is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});