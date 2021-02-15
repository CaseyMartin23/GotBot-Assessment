const { Schema, model } = require("mongoose");

const ConversationSchema = new Schema({
  user_message: String,
  agent_reply: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Conversation", ConversationSchema);
