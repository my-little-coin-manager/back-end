const express = require('express');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const userModels = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { id, pw } = req.body;

  try {
    const userCheck = await userModels.getUserInfo(id);

    if (!userCheck) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: '존재하지 않는 아이디입니다.' });
    } else if (!bcrypt.compareSync(pw, userCheck.pw)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: '잘못된 비밀번호입니다.' });
    }

    const payload = {
      user: {
        id: userCheck.id,
        nickname: userCheck.nickname,
      },
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30m', issuer: 'MLCM' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h', issuer: 'MLCM' });

    userModels.updateUser(id, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(StatusCodes.OK).json({ accessToken, nickname: userCheck.nickname });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).send('Login error');
  }
});

router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  userModels.deleteRefreshToken(refreshToken);
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.end();
});

router.post('/user', async (req, res) => {
  const { id, pw, nickname } = req.body;

  try {
    const findId = await userModels.getUserInfo(id);

    if (findId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: '이미 있는 아이디입니다.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pw, salt);

    const user = {
      id: id,
      pw: password,
      nickname: nickname,
      refreshToken: '',
    };

    await User.create(user);

    res.status(StatusCodes.CREATED).json({ msg: '회원가입 성공' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
});

module.exports = router;
