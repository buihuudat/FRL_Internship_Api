const { OpenAI } = require("openai");
const CryptoJS = require("crypto-js");
const systemModel = require("../models/systemModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");
// const { ChatGPTAPI } = require("chatgpt");
const { Configuration, OpenAIApi } = require("openai");

const messageController = {
  askAi: async (req, res) => {
    const jobs = await jobModel.find().select("_id");
    const user = await userModel.findById(req.decoded._id);

    try {
      const messages = [
        {
          role: "system",
          content: `Đây là cuộc trò chuyện về internship`,
        },
        {
          role: "system",
          content: `Chỉ trả lời câu hỏi liên quan tới internship!`,
        },
        {
          role: "system",
          content: `Chỉ trả về những jobs có ở trong ${jobs}`,
        },
        {
          role: "system",
          content: `Trả về ${jobs} có jobSkills phù hợp với ${user} skills`,
        },
        {
          role: "user",
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
        temperature: 0.7,
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

  askAIv2: async (req, res) => {
    try {
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

      const openai = new OpenAIApi({
        apiKey,
      });

      const prompt = req.body.message;
      console.log(prompt);

      const model = req.body.model; // Ensure this is passed in the request body or set a default value
      const maxTokens = model === "gpt" ? 4000 : 8000; // Adjust based on the model

      const completion = await openai.createCompletion({
        model: model === "gpt" ? "text-davinci-003" : "code-davinci-002",
        prompt: `Please reply below question in markdown format.\n ${prompt}`,
        max_tokens: maxTokens,
      });

      console.log(completion.data.choices[0].text);
      return res.status(200).json({
        fromSelf: false,
        message: completion.data.choices[0].text,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getText: async (req, res) => {
    try {
      const messages = [
        {
          role: "system",
          content: "Đây là cuộc trò chuyện về internship",
        },
        {
          role: "user",
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
        message: aiRes[0].message.content,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = messageController;
