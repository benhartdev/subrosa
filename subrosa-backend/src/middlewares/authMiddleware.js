const jwt = require('jsonwebtoken');

// Middleware pour vérifier si l'utilisateur est authentifié en tant qu'admin
exports.authenticateToken = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next(); // L'utilisateur est déjà authentifié
    }

    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Accès refusé. Token manquant." });

    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalide." });
        if (user.role !== 'admin') return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas admin." });

        req.session.isAuthenticated = true;
        next();
    });
};

// Middleware pour vérifier si la session admin est active
exports.ensureAdmin = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    return res.status(403).json({ message: "Accès interdit. Vous devez être connecté en tant qu'administrateur." });
};
