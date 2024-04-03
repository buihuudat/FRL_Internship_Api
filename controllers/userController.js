const userModel = require("../models/userModel");
const cryptoJS = require("crypto-js");
const userFileModel = require("../models/userFileModel");
const jobAppliedModel = require("../models/jobAppliedModel");

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      return res.status(200).json({
        message: "Lấy thành công",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lấy thất bại",
        error,
      });
    }
  },
  getCVApplied: async (req, res) => {
    try {
      const user = await userFileModel.findOne({ user: req.params.userId });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      return res.status(200).json({
        message: "Lấy thành công",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lấy thất bại",
        error,
      });
    }
  },

  getJobsApplied: async (req, res) => {
    try {
      const jobs = await jobAppliedModel
        .find({
          user: req.decoded._id,
        })
        .populate("job");
      return res.status(200).json(jobs || []);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: "Cập nhật thất bại",
        error,
      });
    }
  },

  updateAddress: async (req, res) => {
    console.log(req.body);
    try {
      const user = await userModel.findByIdAndUpdate(req.decoded._id, {
        address: req.body.address,
      });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateSkills: async (req, res) => {
    try {
      const rs = await userModel.findByIdAndUpdate(req.decoded._id, {
        skills: req.body.skills,
      });
      if (!rs) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      return res.status(200).json(rs);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  editPassword: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      if (user.password === req.body.password) {
        return res.status(400).json({
          message: "Mật khẩu cũ không được thay đổi",
        });
      }
      const newPass = cryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      user.password = newPass;
      await user.save();
      return res.status(200).json({
        message: "Cập nhật thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Cập nhật thất bại",
        error,
      });
    }
  },

  deleteUser: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }
      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Bạn không có quyền xóa người dùng này",
        });
      }
      await user.remove();
      return res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Xóa thất bại",
        error,
      });
    }
  },
};

module.exports = userController;
