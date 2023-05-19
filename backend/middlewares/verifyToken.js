const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "Not authorized, No token" });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ msg: "Wrong or Expired token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
});
const verifyTokenAdmin = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "Not authorized, No token" });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ msg: "Wrong or Expired token" });
      } else {
        if (!data.isAdmin) {
          return res.status(403).json({ msg: "You are not admin" });
        }
        req.user = data;
        next();
      }
    });
  }
});
module.exports = { verifyToken, verifyTokenAdmin };
