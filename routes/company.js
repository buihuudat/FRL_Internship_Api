const {
  getCompany,
  getCompanyByAuthor,
  createCompany,
  getCompanies,
  getCompanyJobs,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.get("/auth", authenticateToken, isAdmin, getCompanyByAuthor);
router.post("/", authenticateToken, isAdmin, createCompany);
router.get("/", authenticateToken, isAdmin, getCompanies);
router.get("/:companyId", getCompany);
router.get("/:companyId/jobs", getCompanyJobs);
router.delete("/:companyId", authenticateToken, isAdmin, deleteCompany);
router.put("/:companyId", authenticateToken, isAdmin, updateCompany);

module.exports = router;
