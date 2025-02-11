// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Obtén el header de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  // Se asume que el header tiene el formato "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no válido.' });
  }

  try {
    // Verifica el token usando la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
    // Agrega la información del usuario verificado a req.user para uso posterior
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido.' });
  }
};

module.exports = verifyToken;
