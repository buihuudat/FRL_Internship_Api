const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      province: String,
      district: String,
      ward: String,
      street: String,
      house: String,
    },
    image: String,
    model: String,
    scale: String,
    country: String,
    ot: String,
    description: String,
    website: String,
    social: String,
  },
  { timeseries: true }
);

module.exports = mongoose.model("Company", companySchema);
