const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  profile_pic: String,
  messages: [{ user_message: String, agent_reply: String }],
});

module.exports = model("User", UserSchema);
