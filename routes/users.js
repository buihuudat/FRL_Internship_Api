const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middleware/auth");
const jobController = require("../controllers/jobController");
const notificationController = require("../controllers/notificationController");

router.get(
  "/:userId/cv-applied",
  authenticateToken,
  userController.getCVApplied
);
router.post("/check-auth", authenticateToken, userController.checkAuth);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/:username", authenticateToken, userController.getUser);
router.put("/:username", authenticateToken, userController.updateUser);
router.patch(
  "/:username/editPassword",
  authenticateToken,
  userController.editPassword
);

router.delete("/:username", isAdmin, userController.deleteUser);
router.get("/users", isAdmin, userController.getAllUser);

router.post("/apply", authenticateToken, jobController.jobApply);

router.get(
  "/notifications/:userId",
  authenticateToken,
  notificationController.get
);
router.post("/notifications", authenticateToken, notificationController.push);
router.delete(
  "/notifications",
  authenticateToken,
  notificationController.deleteNotification
);

module.exports = router;
