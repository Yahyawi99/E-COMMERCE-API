const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// All users
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

// single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

// show current user
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// update user
const updateUser = async (req, res) => {
  res.send("update user");
};

// update password
const updateUserPassword = async (req, res) => {
  res.send("update  user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
