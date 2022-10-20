const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, // type is string
      required: [true, "Provide the fruit Name"], // must provide fruit name
      trim: true, // trim the white spaces from beginning and end
    },
    variety: {
      type: String, // type is string
      required: [true, "Please Provide Fruit Popular Name"], // must provide origin name
      trim: true, // trim the white spaces from beginning and end
    },
    location: {
      type: String, // type is string
      required: [true, "Provide Place of location"], // must provide location
      trim: true, // trim the white spaces from beginning and end
    },
    rating: {
      type: Number,
      required: [true, "Provide Rating of Fruit"], // must provide fruit taste rating
      default: 4.5, // default rating
    },
    price: {
      type: Number,
      required: [true, "Provide Price of Fruit"], // must provide price of fruit
      default: 250, // default rating
    },
    nutrition_facts: [
      {
        amount: String,
        calories: String,
        total_Fat: String,
        cholesterol: String,
        sodium: String,
        potassium: String,
        total_Carbohydrate: String,
        dietary_fiber: String,
        sugar: String,
        protein: String,
        vitaminC: String,
        calcium: String,
        vitaminB6: String,
        vitaminD: String,
        magnesium: String,
      },
    ],
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
