const express = require('express');
const { StatusCodes } = require('http-status-codes');
const History = require('../schemas/history');
const auth = require('./auth');
const HistoryModels = require('../models/history');

const router = express.Router();

router.get('/history', auth, async (req, res) => {
  const { id } = req.user;

  const userHistory = await HistoryModels.getHistory(id);

  res.status(StatusCodes.OK).json(userHistory);
});

router.post('/history', auth, async (req, res) => {
  const { id } = req.user;
  const { history } = req.body;

  const postHistoryData = await HistoryModels.postHistory(id, history);

  res.status(StatusCodes.OK).json(postHistoryData);
});

router.delete('/history', auth, async (req, res) => {
  const { _id } = req.body;
  const { id } = req.user;

  const deleteHistoryData = await HistoryModels.deleteHistory(_id, id);

  res.status(StatusCodes.OK).json(deleteHistoryData);
});

module.exports = router;
