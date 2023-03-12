const User = require('../schemas/user');

exports.getUser = async (id) => {
  const userCheck = await User.findOne({ id });
  return userCheck;
};
