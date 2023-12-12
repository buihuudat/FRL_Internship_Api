const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({}, { timeseries: true });

module.exports = mongoose.model("Company", companySchema);
