const express = require('express');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const auth = require('./auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/user', async (req, res) => {
  const { id, pw } = req.body;
  try {
    const findId = await User.findOne({ id });
    if (findId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: { msg: '이미 있는 아이디 입니다.' } });
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pw, salt);

    const user = {
      id: id,
      pw: password,
    };

    const userInfo = await User.create(user);
    res.status(StatusCodes.CREATED).json({ success: { msg: '회원가입 성공' } });
    // json web token 으로 변환할 데이터 정보
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: { msg: error.message } });
  }
});

router.get('/user', async (req, res) => {
  try {
    const { id, pw } = req.body;
    const userCheck = await User.findOne({ id });

    if (!userCheck) {
      return res.status(StatusCodes.NOT_FOUND).json({ errors: { msg: '아이디가 다릅니다.' } });
    } else if (!bcrypt.compareSync(pw, userCheck.pw)) {
      return res.status(StatusCodes.NOT_FOUND).json({ errors: { msg: '비밀번호가 다릅니다.' } });
    }

    const payload = {
      user: {
        id: userCheck.id,
      },
    };

    jwt.sign(
      payload, // token으로 변환할 데이터
      process.env.JWT_SECRET_KEY, // secret key 값
      { expiresIn: '24h' }, // token의 유효시간을 24시간으로 설정
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
