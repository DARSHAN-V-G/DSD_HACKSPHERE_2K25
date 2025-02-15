const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET;
const INFURA_IPFS_URL = `https://ipfs.infura.io:5001/api/v0/add`;

exports.uploadToIPFS = async (fileBuffer) => {
  try {
    const formData = new FormData();
    formData.append("file", fileBuffer);

    const response = await axios.post(INFURA_IPFS_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Basic ${Buffer.from(`${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`).toString("base64")}`,
      },
    });
    
    return response.data.Hash;
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    return null;
  }
};
