// Vérifie si un token est fourni et valide
const authenticateToken = (req, res, next) => {
    // ton code précédent ici (si tu veux le garder)
  };
  
  // Vérifie si l'utilisateur est connecté en session admin
  const ensureAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
      return next();
    }
    return res.status(403).json({
      message: 'Accès interdit. Vous devez être connecté en tant qu\'administrateur.'
    });
  };
  
  module.exports = {
    authenticateToken,
    ensureAdmin
  };
  