const User = require('../schemas/user');

exports.getUserInfo = async (id) => {
  const userCheck = await User.findOne({ id });
  return userCheck;
};

exports.getUserId = async (id) => {
  const userCheck = await User.findOne({ id }).select('-pw');
  return userCheck;
};
