const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

//generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Get all users
// @route GET /api/users
// @access Private

// @desc Get current user
// @route GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Register a new user
//@route POST /api/users/
//@access Public
const newUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check if data is provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all neccessary data");
  }

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for and get user email
  const user = await User.findOne({ email });

  //check password and login if correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

module.exports = { newUser, loginUser, getUser };
