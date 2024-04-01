const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  openaiKey: String,
});

module.exports = mongoose.model("System", systemSchema);
