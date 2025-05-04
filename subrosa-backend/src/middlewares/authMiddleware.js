// Middleware pour s'assurer qu'un utilisateur est connecté
const ensureAuthenticated = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: "Non authentifié. Veuillez vous connecter." });
};

// Middleware pour restreindre aux administrateurs uniquement
const ensureAdmin = (req, res, next) => {
  console.log("🔒 [ensureAdmin] Vérification de la session...");
  console.log("🧾 Session actuelle :", req.session);

  if (req.session?.user?.role === 'admin') {
    console.log("✅ [ensureAdmin] Accès admin accordé à :", req.session.user.username);
    return next();
  }

  console.warn("⛔ [ensureAdmin] Accès refusé - utilisateur non admin ou session invalide");
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
