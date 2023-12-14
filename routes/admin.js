const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { isAdmin, authenticateToken } = require("../middleware/auth");

const router = require("express").Router();

router.get("/users", authenticateToken, isAdmin, adminController.getUsers);
router.get("/jobs", adminController.getJobs);

router.get("/company", adminController.getCompany);
router.get("/company/:id/jobs", adminController.getCompanyJobs);
router.get(
  "/company/:id",
  authenticateToken,
  isAdmin,
  adminController.getCompanyDetails
);
router.put("/:username", authenticateToken, userController.updateUser);
router.post("/jobs", authenticateToken, isAdmin, adminController.createJob);
router.post(
  "/company",
  authenticateToken,
  isAdmin,
  adminController.createCompany
);

router.delete(
  "/company/:id",
  authenticateToken,
  isAdmin,
  adminController.deleteCompany
);

router.delete(
  "/jobs/:id",
  authenticateToken,
  isAdmin,
  adminController.deleteJob
);

router.put("/jobs/:id", authenticateToken, isAdmin, adminController.updateJob);

router.put(
  "/company/:id",
  authenticateToken,
  isAdmin,
  adminController.updateCompany
);

module.exports = router;
