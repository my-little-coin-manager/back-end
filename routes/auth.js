const jwt = require('jsonwebtoken');
const userModels = require('../models/user');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
  // Get token from header

  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.headers.authorization.split('Bearer ')[1];

  // token check
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const refreshTokenVerify = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const accessTokenVerify = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = accessTokenVerify.user;
    next();
  } catch (error) {
    if (jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)) {
      const userCheck = await userModels.getRefreshToken(refreshToken);

      const payload = {
        user: {
          id: userCheck.id,
          nickname: userCheck.nickname,
        },
      };
      const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30m', issuer: 'MLCM' });
      return res.status(StatusCodes.OK).json({ newAccessToken, nickname: userCheck.nickname });
    } else {
      return res.status(401).json({ msg: '로그인 만료' });
    }
  }
};
