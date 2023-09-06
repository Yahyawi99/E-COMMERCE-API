const createTokenUser = () => {
  return { name: user.name, userId: user._id, role: user.role };
};

module.exports = createTokenUser;
