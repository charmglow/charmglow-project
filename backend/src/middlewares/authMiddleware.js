const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId; // Store the decoded token in the request for future use
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = { authenticateToken };
