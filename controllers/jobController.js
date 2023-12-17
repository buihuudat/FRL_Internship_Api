const jobModel = require("../models/jobModel");
const userFileModel = require("../models/userFileModel");

const jobController = {
  jobApply: async (req, res) => {
    try {
      const { uid, textMore, file, jobId } = req.body;
      const job = await jobModel.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      } else {
        job.jobApplied.push({
          userId: uid,
          fileName: file.name,
          file: {
            name: file.name,
            file: file.file,
          },
          textMore: textMore,
        });
        await job.save();
      }

      const userFile = await userFileModel.findOne({ user: uid });
      if (!userFile) {
        const newUserFile = new userFileModel({
          user: uid,
          file: {
            name: file.name,
            file: file.file,
          },
        });
        await newUserFile.save();
      } else {
        userFile.file = {
          name: file.name,
          file: file.file,
        };
        await userFile.save();
      }
      return res.status(200).json({ message: "Job applied" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = jobController;
