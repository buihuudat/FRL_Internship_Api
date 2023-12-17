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
    jobLocation: String,
    jobSkills: String,
    jobStatus: Boolean,
    wotkingForm: String,
    ot: String,
    scale: String,
    salary: String,
    jobApplied: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        fileName: String,
        file: {
          name: String,
          file: String,
        },
        textMore: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
