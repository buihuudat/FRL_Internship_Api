const {
  addComment,
  editComment,
  deleteComment,
  getCommentByCompany,
} = require("../controllers/commentController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", authenticateToken, addComment);
router.put("/:id", authenticateToken, editComment);
router.delete("/:id", authenticateToken, isAdmin, deleteComment);
router.get("/:id", getCommentByCompany);

module.exports = router;
