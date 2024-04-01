var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", require("./users"));
router.use("/jobs", require("./job"));
router.use("/auth", require("./auth"));
router.use("/company", require("./company"));
router.use("/notification", require("./notification"));
router.use("/faq", require("./faq"));
router.use("/comment", require("./comment"));
router.use("/payment", require("./payment"));
router.use("/messages", require("./message"));
router.use("/custom", require("./system"));

module.exports = router;
