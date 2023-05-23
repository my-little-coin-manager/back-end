const jwt = require('jsonwebtoken');
const userModels = require('../models/user');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
  // Get token from header

  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.headers.authorization.split('Bearer ')[1];
  let refreshTokenVerify = null;
  let accessTokenVerify = null;

  // token check
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    accessTokenVerify = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = accessTokenVerify.user;
    return next();
  } catch (error) {
    accessTokenVerify = null;
  }

  try {
    const userCheck = await userModels.getRefreshToken(refreshToken);
    refreshTokenVerify = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const payload = {
      user: {
        id: userCheck.id,
        nickname: userCheck.nickname,
      },
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30m', issuer: 'MLCM' });
    return res.status(StatusCodes.OK).json({ newAccessToken, nickname: userCheck.nickname });
  } catch (error) {
    const userCheck = await userModels.getRefreshToken(refreshToken);
    if (!userCheck) return;
    if (userCheck.isLogin) {
      userModels.deleteRefreshToken(refreshToken);
      return res.status(401).json({ msg: '로그인 만료' });
    }
  }
};
