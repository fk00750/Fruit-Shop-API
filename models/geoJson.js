const mongoose = require("mongoose");

const FruitFarmSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Farm",
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    properties: {
      name: String,
      variety: String,
      address: String,
      city: String,
      state:String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("fruitfarm", FruitFarmSchema);
