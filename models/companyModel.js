const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
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
