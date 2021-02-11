const router = require("express").Router();
const webhooks = require("./webhooks");

router.use("/", webhooks);
router.use("/test", (req, res) => {
  res.json({ message: "Test works!!!" });
});

module.exports = router;
