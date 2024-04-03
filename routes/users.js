const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middleware/auth");
const jobController = require("../controllers/jobController");

router.get("/", authenticateToken, isAdmin, userController.getUsers);

router.get("/jobs-applied", authenticateToken, userController.getJobsApplied);

router.get("/:userId", authenticateToken, userController.getUser);

router.put("/update-skills", authenticateToken, userController.updateSkills);

router.put("/update-address", authenticateToken, userController.updateAddress);

router.put("/:userId", authenticateToken, userController.updateUser);

router.post("/apply", authenticateToken, jobController.jobApply);

router.get(
  "/:userId/cv-applied",
  authenticateToken,
  userController.getCVApplied
);

router.patch(
  "/:username/editPassword",
  authenticateToken,
  userController.editPassword
);

module.exports = router;
