const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true, min: 8, max: 20 },
    isAdmin: { type: Boolean, required: true, default: false },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
