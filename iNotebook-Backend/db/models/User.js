const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    trim: true,
  },
});

// middleware to hash password
userSchema.pre("save", async function (next) {
  const saltRounds = 11;

  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      throw new Error("hash failed !");
    }
  }

  next();
});

module.exports = mongoose.model("user", userSchema);
