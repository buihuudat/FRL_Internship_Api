const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Bạn không có quyền truy cập",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập",
      });
    }
    req.decoded = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.decoded?.role && req.decoded?.role !== "admin") {
    return res.status(403).json({
      message: "Bạn không có quyền",
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
};
