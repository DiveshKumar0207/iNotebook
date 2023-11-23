const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  tag: {
    type: String,
    default: "general",
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    trim: true,
  },
});

module.exports = mongoose.model("note", noteSchema);
