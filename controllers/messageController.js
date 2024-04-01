const { OpenAI } = require("openai");
const CryptoJS = require("crypto-js");
const systemModel = require("../models/systemModel");

const messageController = {
  askAi: async (req, res) => {
    try {
      const messages = [
        {
          role: "system",
          content: "Đây là cuộc trò chuyện về internship",
        },
        {
          role: "system",
          content: req.body.message,
        },
      ];

      const key = await systemModel.findOne();
      if (!key?.openaiKey) {
        return res.status(200).json({
          fromSelf: false,
          message: "Invalid Open AI key",
        });
      }

      const apiKey = CryptoJS.AES.decrypt(
        key.openaiKey,
        process.env.TOKEN_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });

      const aiRes = response.choices;
      return res.status(200).json({
        fromSelf: false,
        message: aiRes[0].message.content,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = messageController;
