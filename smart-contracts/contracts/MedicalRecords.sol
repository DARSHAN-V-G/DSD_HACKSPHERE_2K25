// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Report {
        string ipfsHash;
        address patient;
        address doctor;
    }

    mapping(address => Report[]) private medicalReports;
    mapping(address => mapping(address => bool)) private accessPermissions;

    event ReportAdded(address indexed patient, address indexed doctor, string ipfsHash);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

    function addReport(string memory _ipfsHash) external {
        medicalReports[msg.sender].push(Report(_ipfsHash, msg.sender, msg.sender));
        emit ReportAdded(msg.sender, msg.sender, _ipfsHash);
    }

    function grantAccess(address _doctor) external {
        accessPermissions[msg.sender][_doctor] = true;
        emit AccessGranted(msg.sender, _doctor);
    }

    function revokeAccess(address _doctor) external {
        accessPermissions[msg.sender][_doctor] = false;
        emit AccessRevoked(msg.sender, _doctor);
    }

    function getReports(address _patient) external view returns (Report[] memory) {
        require(accessPermissions[_patient][msg.sender] || _patient == msg.sender, "Access Denied");
        return medicalReports[_patient];
    }
}