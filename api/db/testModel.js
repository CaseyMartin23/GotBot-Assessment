const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = { test: mongoose.model("Test", TestSchema) };
