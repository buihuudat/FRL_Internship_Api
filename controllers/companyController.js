const commentModel = require("../models/commentModel");
const companyModel = require("../models/companyModel");
const jobModel = require("../models/jobModel");

const companyController = {
  getCompanyByAuthor: async (req, res) => {
    try {
      const company = await companyModel.findOne({ author: req.decoded._id });
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createCompany: async (req, res) => {
    try {
      const newCompany = await companyModel.create({
        ...req.body,
        author: req.decoded._id,
      });
      return res.status(201).json(newCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getCompanies: async (req, res) => {
    console.log(req.role);
    try {
      if (req.role === "company") {
        const company = await companyModel.find({
          author: req.decoded._id,
        });
        return res.status(200).json(company);
      }
      const company = await companyModel.find();
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getCompany: async (req, res) => {
    try {
      const company = await companyModel
        .findById(req.params.companyId)
        .populate("author");
      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getCompanyJobs: async (req, res) => {
    try {
      const company = await companyModel.findById(req.params.companyId);
      if (!company)
        return res.status(404).json({ message: "company not found" });
      const jobs = await jobModel
        .find({ company: company._id })
        .populate("company");
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteCompany: async (req, res) => {
    try {
      const deletedCompany = await companyModel.findByIdAndDelete(
        req.params.companyId
      );
      await commentModel.deleteMany({
        company: req.params.companyId,
      });
      return res.status(200).json(deletedCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateCompany: async (req, res) => {
    try {
      const updatedCompany = await companyModel.findByIdAndUpdate(
        req.params.companyId,
        req.body,
        { new: true }
      );
      console.log(updatedCompany);

      return res.status(200).json(updatedCompany);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = companyController;
