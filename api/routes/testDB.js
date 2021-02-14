const router = require("express").Router();
const TestDB = require("../db/testModel").test;

router.get("/test", (req, res) => {
  TestDB.find()
    .then((testText) => res.status(200).json(testText))
    .catch((err) => res.status(400).send(err));
});

router.post("/test", (req, res) => {
  const testText = new TestDB({
    text: req.body.text,
  });

  testText
    .save(testText)
    .then((saveTestText) => res.status(200).json(saveTestText))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
