const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
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
