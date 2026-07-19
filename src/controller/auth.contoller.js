const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/blacklist.model");

/**
 * @name registerUserController
 * @desc Controller to handle user registration(username, email and password)
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "Account already exists with this username or email address",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });

  await user.save();
}

/**
 * @name loginUserController
 * @desc Controller to handle user login(email and password)
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Loggedin successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

/**
 * @name logoutUserController
 * @desc Controller to handle user logout and add the token to blacklist.
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await TokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully",
  });
}

/**
 * @name getMeController
 * @desc Controller to get the logged in user details.
 * @access Private
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "User Details fetched Successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
