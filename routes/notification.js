const notificationController = require("../controllers/notificationController");
const { authenticateToken } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", authenticateToken, notificationController.get);
router.put("/", authenticateToken, notificationController.push);
router.put("/check-all", authenticateToken, notificationController.checkAll);
router.delete(
  "/:id",
  authenticateToken,
  notificationController.deleteNotification
);

module.exports = router;
