const mongoose = require("mongoose")


const FoodSchema = mongoose.Schema({
    name: String,
    calories: String,
    serving_size_g: String,
    fat_total_g: String,
    fat_saturated_g: String,
    cholesterol_mg: String,
    sodium_mg: String,
    carbohydrates_total_g: String,
    fiber_g: String,
    sugar_g: String,
    protein_g: String,
    potassium_mg: String
  }
  );
  const FoodModel = mongoose.model("food", FoodSchema)

module.exports = {
    FoodModel
}