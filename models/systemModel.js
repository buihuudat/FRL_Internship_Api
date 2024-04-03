const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  openaiKey: String,
  id: String,
});

module.exports = mongoose.model("System", systemSchema);
