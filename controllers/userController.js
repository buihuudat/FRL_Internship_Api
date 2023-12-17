const userModel = require("../models/userModel");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const userFileModel = require("../models/userFileModel");

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được sử dụng để đăng ký",
        });
      }

      const desPass = cryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(cryptoJS.enc.Utf8);
      if (desPass !== password) {
        return res.status(400).json({
          message: "Mật khẩu không đúng",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "12h",
      });

      return res.status(200).json({
        message: "Đăng nhập thành công",
        user: {
          ...user.toObject(),
          password: undefined,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đăng nhập thất bại",
        error,
      });
    }
  },

  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const checkUsername = await userModel.findOne({ username });
      if (checkUsername) {
        return res.status(400).json({
          message: "Tên tài khoản đã được sử dụng",
        });
      }
      const checkEmail = await userModel.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({
          message: "Email đã được sử dụng",
        });
      }

      const hasPass = cryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const newUser = new userModel({
        username,
        email,
        password: hasPass,
      });
      await newUser.save();
      // const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET_KEY, {
      //   expiresIn: "12h",
      // });
      return res.status(200).json({
        message: "Đăng ký thành công",
        // user: newUser,
        // token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đăng ký thất bại",
        error,
      });
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

  updateUser: async (req, res) => {
    const { username } = req.params;
    const { name, avatar, phone, birthday } = req.body;
    try {
      const user = await userModel.findOneAndUpdate(
        { username: username },
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(400).json({
          message: "Tài khoản không tồn tại",
        });
      }

      await user.save();
      return res.status(200).json({
        message: "Cập nhật thành công",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Cập nhật thất bại",
        error,
      });
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

  getAllUser: async (req, res) => {
    const userID = req.body.userID;
    try {
      const isAdmin = await userModel.findById(userID);
      if (!isAdmin || isAdmin.role !== "admin") {
        return res.status(403).json({
          message: "Bạn không có quyền",
        });
      }
      const users = await userModel.find();
      return res.status(200).json({
        message: "Lấy thành công",
        users,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Lấy thất bại",
        error,
      });
    }
  },

  checkAuth: async (req, res) => {
    try {
      const user = await userModel.findById(req.decoded._id);
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
};

module.exports = userController;
