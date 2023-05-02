const User = require('../schemas/user');

exports.futBookmark = async (userId, addBookmark) => {
  const futBookmark = await User.findOneAndUpdate({ id: userId }, { $set: { bookmark: addBookmark } }, { new: true }).select('bookmark');

  return futBookmark;
};

exports.deleteBookmark = async (userId, fiteredBookmark) => {
  const delteBookmark = await User.findOneAndUpdate({ id: userId }, { $set: { bookmark: fiteredBookmark } }, { new: true }).select('bookmark');
  return delteBookmark;
};
