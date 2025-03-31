const jwt = require('jsonwebtoken');

// Générer un token d'accès
exports.generateToken = (req, res) => {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  };
  

// Connexion en tant qu'admin
exports.login = (req, res) => {
    const { token } = req.body;
    console.log('🛠️ Token reçu dans /login :', token);
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token décodé :', decoded);
  
      if (decoded.admin) {
        req.session.isAdmin = true;
        console.log('🟢 Session admin activée :', req.session);
        return res.status(200).json({ message: 'Connexion réussie' });
      } else {
        console.log('❌ Token sans champ admin');
        return res.status(403).json({ message: 'Token invalide' });
      }
  
    } catch (error) {
      console.error('❌ Erreur de vérification du token :', error.message);
      return res.status(401).json({ message: 'Token invalide' });
    }
  };
  

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion :', err);
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.clearCookie('connect.sid'); // nettoie le cookie de session
    return res.status(200).json({ message: 'Déconnexion réussie' });
  });
};
