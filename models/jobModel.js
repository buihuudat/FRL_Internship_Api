const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    compane: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    salary: String,
    jobTitle: String,
    jobDescription: String,
    jobType: String,
    jobLocation: String,
    jobExperience: String,
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
        file: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
