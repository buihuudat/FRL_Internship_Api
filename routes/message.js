const { askAi, getText } = require("../controllers/messageController");
const { authenticateToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/:userId/ask-ai", authenticateToken, askAi);
router.post("/get-text", getText);
// router.post("/send", messageController.send);
// router.get("/get/:from/:to", messageController.get);
// router.get("/gets/:id", messageController.gets);

module.exports = router;
