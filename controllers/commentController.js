const commentModel = require("../models/commentModel");
const companyModel = require("../models/companyModel");

const commentController = {
  addComment: async (req, res) => {
    try {
      const company = await companyModel.findById(req.body.company);
      if (!company)
        return res.status(404).json({ message: "Company not found" });
      const comment = await commentModel.create(req.body);
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await commentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await commentModel.deleteOne({
        _id: req.params.id,
      });
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  deleteCommentByCompany: async () => {
    try {
      await commentModel.deleteMany({
        company: req.params.id,
      });
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getCommentByCompany: async (req, res) => {
    try {
      const comments = await commentModel
        .find({
          company: req.params.id,
        })
        .populate({ path: "user", select: "-password" });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = commentController;
