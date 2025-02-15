const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" }],
});

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

patientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Patient", patientSchema);
