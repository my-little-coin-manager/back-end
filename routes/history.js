const express = require('express');
const { StatusCodes } = require('http-status-codes');
const History = require('../schemas/history');
const auth = require('./auth');

const router = express.Router();

router.get('/history', auth, async (req, res) => {
  const { id } = req.user;
  const findHistory = await History.find({ id: id }).select('-id');
  res.status(StatusCodes.OK).json({ result: findHistory });
  // console.log(portfolioList);
});

router.post('/history', auth, async (req, res) => {
  const { id } = req.user;
  console.log(req.body);
  console.log(id);
  const { history } = req.body;

  const log = await History.create({ id: id, history: history });
  res.status(StatusCodes.OK).json({ reult: log });
});

router.delete('/history', auth, async (req, res) => {
  const { _id } = req.body;
  const { id } = req.user;

  const log = await History.deleteOne({ _id: _id });
  const userHistory = await History.find({ id: id }).select('-id');
  console.log(userHistory);
  res.status(StatusCodes.OK).json({ reult: userHistory });
});

module.exports = router;

// if (existedTodo) {
//   isPortfolio.portfolio['비트코인 index'].buy.push({ data, 수량, 매수가 });
//   result = await existedTodo.save();
// }

// {
//   "history": {
//     "transaction": "buy",
//     "market": "BTC",
//     "price": 2000,
//     "qty": 10
//   }
// }

// {
// "_id": "640ca788e25e09728f70a357"
// }
