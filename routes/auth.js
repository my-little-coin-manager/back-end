const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.headers.authorization.split('Bearer ')[1];

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // token 해독, token을 만들 때 설정한 secret key 값 : jwtSecret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // req에 해독한 user 정보 생성
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
