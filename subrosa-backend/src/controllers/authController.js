// src/controllers/authController.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Connexion admin via variables d'environnement
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.user = { role: 'admin', email };
    console.log("🧠 Session après login ADMIN :", req.session);
    return res.status(200).json({ message: 'Connexion réussie en tant qu’admin.', role: 'admin' });
  }

  // ✅ Sinon, vérifie dans la base de données pour User ou Artiste
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    req.session.user = { role: user.role, email: user.email, id: user._id };
    console.log("🧠 Session après login USER/ARTISTE :", req.session);

    return res.status(200).json({
      message: 'Connexion réussie',
      role: user.role,
      email: user.email,
      id: user._id,
    });

  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Déconnexion réussie' });
  });
};

module.exports = {
  login,
  logout,
};
