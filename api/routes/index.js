const router = require("express").Router();
const webhooks = require("./webhooks");
const testDB = require("./testDB");

router.use("/", webhooks);
router.use("/", testDB);

module.exports = router;
