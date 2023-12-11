const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/:username", authenticateToken, userController.getUser);
router.put("/:username", authenticateToken, userController.updateUser);
router.put(
  "/:username/editPassword",
  authenticateToken,
  userController.editPassword
);
router.delete("/:username", isAdmin, userController.deleteUser);
router.get("/users", isAdmin, userController.getAllUser);

module.exports = router;
