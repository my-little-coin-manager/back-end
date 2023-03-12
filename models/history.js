const History = require('../schemas/history');

exports.getHistory = async (id) => {
  const getHistory = await History.find({ id }).select('-id');
  return getHistory;
};

exports.postHistory = async (id, history) => {
  const postHistory = await History.create({ id, history });
  return postHistory;
};

exports.deleteHistory = async (_id, id) => {
  await History.deleteOne({ _id });
  const getHistory = await History.find({ id }).select('-id');
  return getHistory;
};
