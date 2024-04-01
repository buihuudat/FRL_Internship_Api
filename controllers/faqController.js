const faqModel = require("../models/faqModel");

const faqController = {
  gets: async (req, res) => {
    try {
      const faqs = await faqModel.find();
      return res.status(200).json(faqs);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const faq = await faqModel.create(req.body);
      return res.status(200).json(faq);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const faq = await faqModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(faq);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      await faqModel.deleteOne({
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
};

module.exports = faqController;
