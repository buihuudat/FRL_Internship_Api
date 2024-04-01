const router = require("express").Router();
const faqController = require("../controllers/faqController");

router.get("/", faqController.gets);
router.post("/", faqController.create);
router.put("/:id", faqController.update);
router.delete("/:id", faqController.delete);

module.exports = router;
