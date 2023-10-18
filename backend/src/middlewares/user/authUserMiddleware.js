const jwt = require('jsonwebtoken');
function authenticateUserToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msgStatus: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (msgStatus) {
    if (msgStatus.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ msgStatus: 'Unauthorized: Token has expired' });
    }
    return res.status(401).json({ msgStatus: 'Unauthorized: Invalid token' });
  }
}

module.exports = { authenticateUserToken };
