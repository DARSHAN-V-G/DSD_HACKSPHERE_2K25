const express = require("express");
const { fetchGoogleFitData } =require('../controllers/googleFitController');

const router = express.Router();

router.post("/data", fetchGoogleFitData);

module.exports = router;
