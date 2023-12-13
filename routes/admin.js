const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.get("/users", isAdmin, adminController.getUsers);
router.get("/jobs", isAdmin, adminController.getJobs);
router.get("/company", isAdmin, adminController.getCompany);

module.exports = router;
