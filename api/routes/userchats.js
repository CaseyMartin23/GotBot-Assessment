const router = require("express").Router();
const UserModel = require("../db/userModel");

router.get("/users", (req, res) => {
  UserModel.find()
    .select("first_name last_name profile_pic user_id")
    .exec((err, users) => {
      if (err) return console.error(err);
      res.status(200).json(users);
    });
});

router.get("/user-chats/:userId", (req, res) => {
  UserModel.findOne({ user_id: req.params.userId })
    .select("messages")
    .exec((err, userMessages) => {
      if (err) return console.error(err);
      if (!userMessages) return res.status(200).json([]);
      res.status(200).json(userMessages.messages);
    });
});

module.exports = router;
