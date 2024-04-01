const { askAi } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/:userId/ask-ai", askAi);
// router.post("/send", messageController.send);
// router.get("/get/:from/:to", messageController.get);
// router.get("/gets/:id", messageController.gets);

module.exports = router;
