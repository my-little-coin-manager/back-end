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
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '아이디가 다릅니다.' });
    } else if (!bcrypt.compareSync(pw, userCheck.pw)) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '비밀번호가 다릅니다.' });
    }

    const payload = {
      user: {
        id: userCheck.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });

    const a = await userModels.updateUser(id, refreshToken);
    console.log(a);

    console.log(refreshToken);

    res.json({ accessToken, refreshToken, nickname: userCheck.nickname });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
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
