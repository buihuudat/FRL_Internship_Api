const systemModel = require("../models/systemModel");
const CryptoJS = require("crypto-js");

const systemController = {
  updateOpenaiKey: async (req, res) => {
    try {
      const key = await systemModel.findOne({
        id: "aikey",
      });

      const newKey = CryptoJS.AES.encrypt(
        req.body.openaiKey,
        process.env.TOKEN_SECRET_KEY
      );
      if (!key) {
        const createNewKey = await systemModel.create({
          openaiKey: newKey,
          id: "aikey",
        });
        return res.status(200).json({
          message: "Update openai key success",
          key: createNewKey.openaiKey,
        });
      }
      key.openaiKey = newKey;
      await key.save();
      return res.status(200).json({
        message: "Update openai key success",
        key: key.openaiKey,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getOpenaiKey: async (req, res) => {
    try {
      const key = await systemModel.findOne({
        id: "aikey",
      });
      if (!key) {
        return res.status(404).json(null);
      }
      const desKey = CryptoJS.AES.decrypt(
        key.openaiKey,
        process.env.TOKEN_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      return res.status(200).json({
        message: "Get openai key success",
        key: desKey,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = systemController;
