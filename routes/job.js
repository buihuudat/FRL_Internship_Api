const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobsByRoot,
  getCVapplied,
  updateStatus,
  updateView,
} = require("../controllers/jobController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", getJobs);
router.get("/applied/:jobId", getCVapplied);
router.get("/root", authenticateToken, isAdmin, getJobsByRoot);
router.post("/", authenticateToken, isAdmin, createJob);
router.put("/:jobId", authenticateToken, isAdmin, updateJob);
router.delete("/:jobId", authenticateToken, isAdmin, deleteJob);
router.put("/applied/:jobId/status", authenticateToken, updateStatus);
router.put("/applied/:jobId/view", authenticateToken, updateView);

module.exports = router;
