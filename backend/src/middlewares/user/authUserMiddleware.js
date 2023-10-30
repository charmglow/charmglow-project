const jwt = require('jsonwebtoken');
function authenticateUserToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = { authenticateUserToken };
