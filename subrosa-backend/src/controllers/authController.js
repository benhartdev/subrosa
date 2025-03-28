const jwt = require('jsonwebtoken');
const session = require('express-session');

// Middleware d'authentification (Mode CRUD)
exports.authenticateToken = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next(); // Si l'utilisateur est déjà authentifié, on continue
    }

    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Accès refusé. Token manquant.' });

    const tokenValue = token.split(' ')[1]; // Récupère la valeur du token après 'Bearer'

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide.' });
        if (user.role !== 'admin') return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas admin." });

        req.session.isAuthenticated = true; // Crée la session si le token est valide et l'utilisateur est admin
        next();
    });
};

// Générer un Token JWT (ADMIN)
exports.generateToken = (req, res) => {
    const user = { id: 1, username: 'admin', role: 'admin' };  // Utilisateur admin par défaut
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Déconnexion du Mode CRUD
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Déconnexion réussie. Vous êtes maintenant hors du mode CRUD.' });
    });
};
