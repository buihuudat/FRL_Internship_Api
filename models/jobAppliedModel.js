const mongoose = require("mongoose");

const jobApplied = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: String,
    name: String,
    phone: String,
    fileName: String,
    status: String,
    viewed: {
      type: Boolean,
      default: false,
    },
    file: {
      name: String,
      file: String,
    },
    textMore: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobApplied", jobApplied);
