const companyModel = require("../models/companyModel");
const jobModel = require("../models/jobModel");
const userFileModel = require("../models/userFileModel");
const jobAppliedModel = require("../models/jobAppliedModel");

const jobController = {
  getCVapplied: async (req, res) => {
    try {
      const data = await jobAppliedModel
        .find({
          job: req.params.jobId,
        })
        .populate({ path: "user", select: "-password" })
        .populate("job");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  jobApply: async (req, res) => {
    try {
      const { uid, file, jobId } = req.body;
      const job = await jobModel.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      } else {
        await jobAppliedModel.create({ ...req.body, user: uid, job: jobId });
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
  getJobs: async (req, res) => {
    try {
      const jobs = await jobModel.find().populate("company");
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createJob: async (req, res) => {
    try {
      const newJob = await jobModel.create(req.body);
      return res.status(200).json(newJob);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateJob: async (req, res) => {
    try {
      const updatedJob = await jobModel.findByIdAndUpdate(
        req.params.jobId,
        req.body,
        { new: true }
      );
      return res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteJob: async (req, res) => {
    try {
      const deletedJob = await jobModel.findByIdAndDelete(req.params.jobId);
      return res.status(200).json(deletedJob);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getJobsByRoot: async (req, res) => {
    try {
      if (req.role === "admin") {
        const jobs = await jobModel.find().populate("company");
        return res.status(200).json(jobs);
      } else {
        const company = await companyModel.findOne({ author: req.decoded._id });
        if (!company) return res.status(200).json(null);
        const jobs = await jobModel
          .find({ company: company._id })
          .populate("company");
        return res.status(200).json(jobs);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const job = await jobAppliedModel.findByIdAndUpdate(req.params.jobId, {
        status: req.body.status,
      });
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateView: async (req, res) => {
    try {
      const job = await jobAppliedModel.findByIdAndUpdate(req.params.jobId, {
        viewed: true,
      });
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = jobController;
