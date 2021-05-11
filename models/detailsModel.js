const mongoose = require("mongoose");

//create the model Schema
const detailSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    postalCode: {
      type: Number,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Details = mongoose.model("Details", detailSchema);

module.exports = Details;
