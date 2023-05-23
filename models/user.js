const User = require('../schemas/user');

exports.getUserInfo = async (id) => {
  const userCheck = await User.findOne({ id });
  return userCheck;
};

exports.getUserId = async (id) => {
  const userCheck = await User.findOne({ id }).select('-pw');
  return userCheck;
};

exports.updateUser = async (id, refreshToken) => {
  const saveToken = await User.findOneAndUpdate({ id }, { $set: { refreshToken, isLogin: true } }, { new: true }).select(id);
  return saveToken;
};

exports.getRefreshToken = async (refreshToken) => {
  const findToken = await User.findOne({ refreshToken });
  return findToken;
};

exports.deleteRefreshToken = async (refreshToken) => {
  const deleteToken = await User.findOneAndUpdate({ refreshToken }, { $set: { refreshToken: '', isLogin: false } });
};
