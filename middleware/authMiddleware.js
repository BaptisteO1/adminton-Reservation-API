const jwtUtils = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = authorizationHeader.replace('Bearer ', '');
  const userId = jwtUtils.getUserId(token);

  if (userId < 0) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = userId; // Ajoute l'userId à la requête
  next();
};
