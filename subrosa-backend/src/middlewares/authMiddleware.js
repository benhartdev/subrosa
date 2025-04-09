// Middleware pour s'assurer qu'un utilisateur est connecté
const ensureAuthenticated = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: "Non authentifié. Veuillez vous connecter." });
};

// Middleware pour restreindre aux administrateurs uniquement
const ensureAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Accès interdit. Administrateur requis." });
};

// Middleware pour restreindre aux artistes uniquement
const ensureArtist = (req, res, next) => {
  if (req.session?.user?.role === 'artist') {
    return next();
  }
  return res.status(403).json({ message: "Accès réservé aux artistes uniquement." });
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureArtist
};
