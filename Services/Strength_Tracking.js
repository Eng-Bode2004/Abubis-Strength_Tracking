const WeightTracker = require("../Models/Weight_Tracker");
const BMITracker = require("../Models/BMI_Tracker");
const HeightTracker = require("../Models/Height_Tracker");

class Strength_Tracking {
    async createOrUpdateStrength(strengthData) {
        try {
            const { current_weight, target_weight, height_cm, Trainee_Profile } = strengthData;

            // 🧩 Validate input
            if (!current_weight || !target_weight || !height_cm || !Trainee_Profile) {
                throw new Error("current_weight, target_weight, height_cm, and Trainee_Profile are required");
            }

            // 🧮 Weight calculations
            const weight_progress = (current_weight / target_weight)*100; // how far from target
            const weight_difference = target_weight-current_weight; // positive difference

            // 🧮 BMI calculations
            const heightInMeters = height_cm / 100; // convert to meters
            const bmi_value = (current_weight / (heightInMeters * heightInMeters)).toFixed(2);

            let bmi_status = "Normal";
            if (bmi_value < 18.5) bmi_status = "Underweight";
            else if (bmi_value < 25) bmi_status = "Normal";
            else if (bmi_value < 30) bmi_status = "Overweight";
            else bmi_status = "Obese";

            // 💾 Save/Update WeightTracker
            const weightRecord = await WeightTracker.findOneAndUpdate(
                { Trainee_Profile },
                {
                    current_weight,
                    target_weight,
                    weight_progress,
                    weight_difference,
                },
                { upsert: true, new: true }
            );

            // 💾 Save/Update HeightTracker
            const heightRecord = await HeightTracker.findOneAndUpdate(
                { Trainee_Profile },
                { height_cm },
                { upsert: true, new: true }
            );

            // 💾 Save/Update BMITracker
            const bmiRecord = await BMITracker.findOneAndUpdate(
                { Trainee_Profile },
                {
                    bmi_value,
                    bmi_status,
                },
                { upsert: true, new: true }
            );

            // ✅ Return all results
            return {
                weight: weightRecord,
                height: heightRecord,
                bmi: bmiRecord,
            };
        } catch (error) {
            throw new Error(error.message || "Error while creating/updating strength tracking");
        }
    }
}

module.exports = new Strength_Tracking();
