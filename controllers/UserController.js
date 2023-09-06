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
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values!");
  }

  const user = await User.findOne({ _id: userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  user.password = newPassword;

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ message: "Password updated successfully!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
