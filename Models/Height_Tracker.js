const mongoose = require("mongoose");

const HeightTracker_Schema = new mongoose.Schema({
    height_cm: {
        type: Number,
    },
    Trainee_Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee_Profile",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("HeightTracker", HeightTracker_Schema);
