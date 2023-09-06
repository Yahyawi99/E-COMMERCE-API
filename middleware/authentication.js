const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
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

// Permission
const authorizePremissions = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }

    next();
  };
};

module.exports = { authenticateUser, authorizePremissions };
