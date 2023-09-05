const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  console.log(req.signedCookies);
  const token = req.signedCookies.access_token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid!");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid!");
  }
};

module.exports = { authenticateUser };
