const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    salary: String,
    jobTitle: String,
    jobDescription: String,
    jobType: String,
    jobLocation: {
      province: String,
      district: String,
      ward: String,
      street: String,
    },
    jobLocation_str: String,
    jobSkills: String,
    jobStatus: Boolean,
    wotkingForm: String,
    time: String,
    ot: String,
    scale: String,
    salary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
