const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const registerUser = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(401).json(0);
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    ...req.body,
    pass: hashedPassword,
  });
  const { pass, ...others } = newUser._doc;
  const token = jwt.sign(
    { id: newUser._id, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
  return res.status(200).json({ others, token });
});
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json(0);
  }
  const comparePass = await bcrypt.compare(req.body.password, user.pass);
  if (!comparePass) {
    return res.status(401).json(0);
  }

  const { password, ...others } = user._doc;
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  return res.status(200).json({ others, token });
});
module.exports = { registerUser, loginUser };
