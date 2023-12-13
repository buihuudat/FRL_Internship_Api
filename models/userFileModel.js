const mongoose = require("mongoose");

const userFileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    file: {
      name: String,
      file: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserFile", userFileSchema);
