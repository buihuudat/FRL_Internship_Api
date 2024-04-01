const {
  updateOpenaiKey,
  getOpenaiKey,
} = require("../controllers/systemController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.post("/openai", authenticateToken, isAdmin, updateOpenaiKey);
router.get("/openai", authenticateToken, isAdmin, getOpenaiKey);

module.exports = router;
