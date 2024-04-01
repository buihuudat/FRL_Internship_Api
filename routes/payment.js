const paymentController = require("../controllers/paymentController");
const { authenticateToken } = require("../middleware/auth");
const router = require("express").Router();

router.post("/secret", authenticateToken, paymentController.visaMethod);
router.post("/momo", authenticateToken, paymentController.momoMethod);

module.exports = router;
