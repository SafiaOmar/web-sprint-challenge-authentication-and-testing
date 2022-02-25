const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const User = require("../users/user-model");

const checkReqBody = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};
const isUsernameAvailable = async (req, res, next) => {
  const username = await User.getByUsername(req.body.username);
  if (username) {
    next({ status: 401, message: "username taken" });
  } else {
    next();
  }
};

const isUsernameThere = async (req, res, next) => {
  const username = await User.getByUsername(req.body.username);
  if (!username) {
    next({ status: 401, message: "invalid credentials" });
  } else {
    next();
  }
};

module.exports = {
  checkReqBody,
  isUsernameAvailable,
  isUsernameThere,
};