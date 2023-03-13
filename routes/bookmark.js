const express = require('express');
const { StatusCodes } = require('http-status-codes');
const userModels = require('../models/user');
const bookmarkModels = require('../models/bookmark');
const User = require('../schemas/user');
const auth = require('./auth');

const router = express.Router();

router.get('/bookmark', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const bookmark = await User.findOne({ id: id }).select('bookmark');
    res.status(StatusCodes.OK).json({ result: bookmark });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messege: '북마크 조회 실패' });
  }
});

router.put('/bookmark', auth, async (req, res) => {
  try {
    const { bookmark } = req.body;
    const id = req.user.id;

    const userInfo = await userModels.getUserId(id);
    const addBookmark = [...userInfo.bookmark, bookmark];
    const updateBookmark = await bookmarkModels.futBookmark(userInfo.id, addBookmark);

    res.status(StatusCodes.OK).json({ result: updateBookmark.bookmark });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messege: '업데이트 실패' });
  }
});

router.delete('/bookmark', auth, async (req, res) => {
  try {
    const { bookmark } = req.body;
    const id = req.user.id;

    const userInfo = await userModels.getUserId(id);
    const fiteredBookmark = await userInfo.bookmark.filter((data) => data !== bookmark);
    const deleteBookmark = await bookmarkModels.deleteBookmark(userInfo.id, fiteredBookmark);

    res.status(StatusCodes.OK).json({ result: deleteBookmark.bookmark });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messege: '업데이트 실패' });
  }
});

module.exports = router;
