const { OpenAI } = require("openai");
const CryptoJS = require("crypto-js");
const systemModel = require("../models/systemModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");
// const { ChatGPTAPI } = require("chatgpt");
const { Configuration, OpenAIApi } = require("openai");
const chatHistoryModel = require("../models/ChatHistory");
const companyModel = require("../models/companyModel");

function isJobRelevant(userMessage, job) {
  const messageKeywords = userMessage.split(" "); // Tách từ khóa trong tin nhắn

  return (
    messageKeywords.some((keyword) =>
      job.jobTitle.toLowerCase().includes(keyword)
    ) ||
    messageKeywords.some((keyword) =>
      job.jobSkills
        .split(",")
        .some((skill) => skill.toLowerCase().includes(keyword))
    )
  );
}

// Hàm kiểm tra liên quan giữa userMessage và companies
function isCompanyRelevant(userMessage, company) {
  const messageKeywords = userMessage.split(" ");
  return messageKeywords.some((keyword) =>
    company.name.toLowerCase().includes(keyword)
  );
}

const messageController = {
  askAi: async (req, res) => {
    try {
      const jobs = await jobModel
        .find()
        .select("jobLocation company jobTitle jobSkills");
      const companies = await companyModel.find().select("name");
      const user = await userModel
        .findById(req.decoded._id)
        .select("name address skills");

      let chatHistory = await chatHistoryModel.findOne({
        userId: req.decoded._id,
      });
      if (!chatHistory) {
        chatHistory = { userId: req.decoded._id, messages: [] };
      }

      const userMessage = req.body.message.trim().toLowerCase();
      if (["xin chào", "hello", "hi"].includes(userMessage)) {
        return res.status(200).json({
          fromSelf: false,
          message: "Chào bạn! Tôi có thể giúp gì cho bạn?",
        });
      }

      const dataHistory = [
        ...chatHistory.messages,
        {
          role: "user",
          content: req.body.message,
        },
      ];

      const systemMessages = [
        {
          role: "system",
          content: `Chỉ trả lời khi được hỏi, Hãy kết hợp các kỹ năng của người dùng (${user}) nếu kỹ năng của người dùng hay từ khoá tìm kiếm có liên quan đến jobs (${jobs
            .map((job) => job.jobTitle)
            .join(", ")}) và các công ty (${companies
            .map((company) => company.name)
            .join(", ")}), nếu không có dữ liệu thì trả về dữ liệu bên ngoài`,
        },
        {
          role: "system",
          content:
            "Nếu không tìm thấy data hợp lí trong database thì gợi ý data bên ngoài",
        },
        // {
        //   role: "system",
        //   content:
        //     "Ngoài ra có thể gợi ý thêm các kết quả bên ngoài cho phù hợp hơn",
        // },
        {
          role: "system",
          content:
            "Format dữ liệu đẹp hơn. Có thể tô đậm, hiển thị mã nguồn, hoặc hiển thị bảng để dễ dàng theo dõi.",
        },
        {
          role: "system",
          content: `Nếu trả về công ty có trong ${companies} thì trả về dạng link: http://localhost:3333/company/ + id công ty `,
        },
        {
          role: "system",
          content:
            "Cung cấp thông tin rõ ràng, súc tích và có cấu trúc. Đảm bảo sử dụng danh sách hoặc bảng nếu cần.",
        },
      ];

      const messages = [...systemMessages, ...dataHistory];

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

      dataHistory.push({
        role: "assistant",
        content: aiRes[0].message.content,
      });

      await chatHistoryModel.updateOne(
        { userId: req.decoded._id },
        { $set: { messages: dataHistory } }
      );

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
      const model = req.body.model; // Ensure this is passed in the request body or set a default value
      const maxTokens = model === "gpt" ? 4000 : 8000; // Adjust based on the model

      const completion = await openai.createCompletion({
        model: model === "gpt" ? "text-davinci-003" : "code-davinci-002",
        prompt: `Please reply below question in markdown format.\n ${prompt}`,
        max_tokens: maxTokens,
      });

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
