const express = require('express');
const Market = require('../schemas/bookmark');
const auth = require('./auth');

const router = express.Router();

router.get('/bookmark', auth, async (req, res) => {
  const bookmark = await Market.findOne({ userId: req.user.id }).select('bookmark');

  console.log(bookmark);

  // Market.find;
});

router.post('/bookmark', auth, async (req, res) => {
  const bookmark = req.body;
  const id = req.user.id;
});

module.exports = router;
