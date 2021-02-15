const router = require("express").Router();
const webhooks = require("./webhooks");
const userConversations = require("./userConversations");

router.use("/", webhooks);
router.use("/", userConversations);

module.exports = router;
