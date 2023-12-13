const adminController = require("../controllers/adminController");
const { isAdmin, authenticateToken } = require("../middleware/auth");

const router = require("express").Router();

router.get("/users", authenticateToken, isAdmin, adminController.getUsers);
router.get("/jobs", authenticateToken, isAdmin, adminController.getJobs);
router.get("/company", authenticateToken, isAdmin, adminController.getCompany);

module.exports = router;
