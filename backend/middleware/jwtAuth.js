// middleware/jwtAuth.js
const jwt = require('jsonwebtoken');

module.exports = function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;  // кладём информацию о пользователе
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
