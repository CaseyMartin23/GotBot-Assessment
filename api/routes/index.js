const router = require("express").Router();
const webhooks = require("./webhooks").router;
const userchats = require("./userchats");

router.use("/", webhooks);
router.use("/", userchats);

module.exports = router;
