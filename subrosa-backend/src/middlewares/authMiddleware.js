// src/middlewares/authMiddleware.js
const ensureAdmin = (req, res, next) => {
  console.log("🔒 Session reçue dans ensureAdmin :", req.session);
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Accès interdit : admin requis.' });
};

module.exports = {
  ensureAdmin,
};
