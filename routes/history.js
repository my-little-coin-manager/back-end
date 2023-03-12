const express = require('express');
const { StatusCodes } = require('http-status-codes');
const History = require('../schemas/history');
const auth = require('./auth');
const HistoryModels = require('../models/history');

const router = express.Router();

router.get('/history', auth, async (req, res) => {
  const { id } = req.user;

  const userHistory = await HistoryModels.getHistory(id);

  res.status(StatusCodes.OK).json({ result: userHistory });
});

router.post('/history', auth, async (req, res) => {
  const { id } = req.user;
  const { history } = req.body;

  const postHistoryData = HistoryModels.postHistory(id, history);

  res.status(StatusCodes.OK).json({ reult: postHistoryData });
});

router.delete('/history', auth, async (req, res) => {
  const { _id } = req.body;
  const { id } = req.user;

  const deleteHistoryData = await HistoryModels.deleteHistory(_id, id);
  const userHistory = await HistoryModels.getHistory(id);

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
