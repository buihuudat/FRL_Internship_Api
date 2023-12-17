const companyModel = require("../models/companyModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

const adminController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getCompany: async (req, res) => {
    try {
      const company = await companyModel.find();
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getCompanyDetails: async (req, res) => {
    try {
      const company = await companyModel.findById(req.params.id);
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getCompanyJobs: async (req, res) => {
    try {
      const company = await companyModel.findById(req.params.id);
      if (!company)
        return res.status(404).json({ message: "company not found" });
      const jobs = await jobModel.find({ company: company._id });
      return res.status(200).json(jobs);
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

  createCompany: async (req, res) => {
    try {
      const newCompany = await companyModel.create(req.body);
      return res.status(200).json(newCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const deletedCompany = await companyModel.findByIdAndDelete(
        req.params.id
      );
      console.log(req.params.id);
      return res.status(200).json(deletedCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteJob: async (req, res) => {
    try {
      const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedJob);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateJob: async (req, res) => {
    try {
      const updatedJob = await jobModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateCompany: async (req, res) => {
    try {
      const updatedCompany = await companyModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json(updatedCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = adminController;
