const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// This function will check whether a JWT is offered in the request.
// If it is, we will offer it's user details to the request.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token provided");
  }
});

module.exports = { protect };
