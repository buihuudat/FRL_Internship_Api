const { login, register, checkAuth } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/check-auth", authenticateToken, checkAuth);

module.exports = router;
