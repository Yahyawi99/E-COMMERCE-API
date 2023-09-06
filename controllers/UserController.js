const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPremissions,
} = require("../utils");

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

  checkPremissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

// show current user
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// update user with findOneAndUpdate()
// const updateUser = async (req, res) => {
//   const { name, email } = req.body;
//   const { userId } = req.user;

//   if (!name || !email) {
//     throw new CustomError.BadRequestError("Please provide all values");
//   }

//   const user = await User.findOneAndUpdate(
//     { _id: userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );

//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });

//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

// update user with user.save()
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { userId } = req.user;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
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
