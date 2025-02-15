const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const path = require('path');
const contractABI = require(path.join(__dirname, '../../smart-contracts/artifacts/contracts/MedicalRecords.sol/MedicalRecords.json')).abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

exports.grantAccess = async (patientId, doctorId, recordId) => {
  try {
    const tx = await contract.grantAccess(patientId, doctorId, recordId);
    await tx.wait();
    console.log("Access granted to doctor:", doctorId);
    return true;
  } catch (error) {
    console.error("Grant access error:", error);
    return false;
  }
};

exports.revokeAccess = async (patientId, doctorId, recordId) => {
  try {
    const tx = await contract.revokeAccess(patientId, doctorId, recordId);
    await tx.wait();
    console.log("Access revoked from doctor:", doctorId);
    return true;
  } catch (error) {
    console.error("Revoke access error:", error);
    return false;
  }
};

exports.checkAccess = async (doctorId, patientId) => {
  try {
    return await contract.hasAccess(doctorId, patientId);
  } catch (error) {
    console.error("Check access error:", error);
    return false;
  }
};

exports.requestAccess = async (doctorId, patientId) => {
  try {
    const tx = await contract.requestAccess(doctorId, patientId);
    await tx.wait();
    console.log("Access request sent.");
    return true;
  } catch (error) {
    console.error("Request access error:", error);
    return false;
  }
};
