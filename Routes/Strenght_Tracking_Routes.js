const express = require("express");
const router = express.Router();
const Strength_Tracking_Controller = require("../Controllers/Strength_Tracking_Controller");

router.post("/:Trainee_Profile", Strength_Tracking_Controller.createOrUpdateStrength);

// GET: return only selected fitness fields
router.get("/:Trainee_Profile", Strength_Tracking_Controller.getStrengthData);


module.exports = router;
