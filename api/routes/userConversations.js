const router = require("express").Router();
const UserModel = require("../db/userModel");

router.get("/user-conversations", async (req, res) => {
  UserModel.find().exec((err, user) => {
    if (err) return console.error(err);
    res.json(user);
  });
});

router.get("/user-conversations/:userId", async (req, res) => {
  UserModel.find({ user_id: req.params.userId }).exec((err, user) => {
    if (err) return console.log(err);
    res.json(user);
  });
});

module.exports = router;
