const express = require("express");
const router = express.Router();
const Strength_Tracking_Controller = require("../Controllers/Strength_Tracking_Controller");

router.post("/:Trainee_Profile", Strength_Tracking_Controller.createOrUpdateStrength);

module.exports = router;
