const router = require("express").Router();
const webhooks = require("./webhooks");

router.use("/", webhooks);

module.exports = router;
