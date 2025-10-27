const mongoose = require("mongoose");

const BMITracker_Schema = new mongoose.Schema({
    bmi_value: {
        type: Number,
    },
    bmi_status: {
        type: String,
        enum: ["Underweight", "Normal", "Overweight", "Obese"],
    },
    Trainee_Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee_Profile",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("BMITracker", BMITracker_Schema);
