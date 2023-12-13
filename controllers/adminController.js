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

  getJobs: async (req, res) => {
    try {
      const jobs = await jobModel.find();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = adminController;
