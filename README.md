# DSD_HACKSPHERE_2K25

# Backend API Routes

## Modules & Routes Overview

### Blockchain Module (Report Security & Verification)

> **Base URL:** `/api/blockchain`

| Method     | Endpoint                      | Description                                        |
| ---------- | ----------------------------- | -------------------------------------------------- |
| **POST**   | `/upload-report`              | Store a**hashed** report on the blockchain.        |
| **GET**    | `/verify-report/:reportId`    | Verify the authenticity of a report.               |
| **GET**    | `/get-all-reports/:patientId` | Fetch all blockchain-stored reports for a patient. |
| **DELETE** | `/delete-report/:reportId`    | Delete a report (if allowed by blockchain rules).  |

---

### Chatbot & QR Code Module (Analyzing Reports & Doctor Access)

> **Base URL:** `/api/chatbot`

| Method   | Endpoint                          | Description                                             |
| -------- | --------------------------------- | ------------------------------------------------------- |
| **POST** | `/analyze-report`                 | Chatbot**analyzes** past reports and provides insights. |
| **GET**  | `/get-patient-history/:patientId` | Fetch the**patient’s historical** health data.         |
| **POST** | `/generate-qr`                    | Generate a**QR code** for a patient’s medical history. |
| **GET**  | `/scan-qr/:qrCodeId`              | Doctor scans the QR code to fetch**patient details**.   |

---

### Wearable Integration & Alerts Module

> **Base URL:** `/api/wearable`

| Method   | Endpoint                      | Description                                             |
| -------- | ----------------------------- | ------------------------------------------------------- |
| **POST** | `/upload-data`                | Upload health metrics from a**wearable device**.        |
| **GET**  | `/get-latest-data/:patientId` | Fetch the**latest wearable health stats**.              |
| **POST** | `/trigger-alert`              | Trigger an**emergency alert** if readings are abnormal. |
| **GET**  | `/get-alerts/:patientId`      | Fetch all alerts for a patient.                         |

---

### BlockChain routes

| Method         | Endpoint                               | Description                                      | Request Payload                                                                                               |
| ---------------- | ---------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
|**POST** | `/api/blockchain/store`            | Store metadata on blockchain                     | `{ "recordId": "abc123", "hash": "0xabcde12345" }`                                                        |
| **GET**  | `/api/blockchain/verify/:recordId` | Verify medical record authenticity on blockchain | `Authorization: Bearer `                                                                           |                                                                 |

## Notes

* All `POST` requests require a valid JSON payload.
* Endpoints marked with `Authorization: Bearer <token>` require authentication.
* The blockchain functions store only metadata (hashes) for verification.
* QR codes allow quick access to records with appropriate permissions.


