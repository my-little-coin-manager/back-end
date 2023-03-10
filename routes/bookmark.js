const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Market = require('../schemas/bookmark');
const User = require('../schemas/user');
const auth = require('./auth');

const router = express.Router();

router.get('/bookmark', auth, async (req, res) => {
  const id = req.user.id;
  const bookmark = await User.findOne({ id: id }).select('bookmark');

  console.log(bookmark);

  // Market.find;
});

router.put('/bookmark', auth, async (req, res) => {
  try {
    const { bookmark } = req.body;
    const id = req.user.id;

    const findUser = await User.findOne({ id: id }).select('-pw');
    const book = await [...findUser.bookmark, bookmark];
    const updateBookmark = await User.findOneAndUpdate({ id: findUser.id }, { $set: { bookmark: book } }).select('bookmark');

    res.status(StatusCodes.OK).json({ result: updateBookmark.bookmark });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messege: '업데이트 실패' });
  }
});

router.delete('/bookmark', auth, async (req, res) => {
  try {
    const { bookmark } = req.body;
    const id = req.user.id;

    const findUser = await User.findOne({ id: id }).select('-pw');
    const book = await findUser.bookmark.filter((data) => data !== bookmark);

    const updateBookmark = await User.findOneAndUpdate({ id: findUser.id }, { $set: { bookmark: book } }).select('bookmark');

    res.status(StatusCodes.OK).json({ result: updateBookmark.bookmark });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messege: '업데이트 실패' });
  }
});

module.exports = router;
