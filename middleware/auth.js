const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Bạn không có quyền truy cập",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập",
      });
    }
    req.decoded = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  if (req.decoded?._id) {
    const user = await userModel.findById(req.decoded._id);
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền",
      });
    }
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
};
