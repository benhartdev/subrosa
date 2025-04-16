// src/controllers/authController.js
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    console.log("🧠 Session après login :", req.session);
    return res.status(200).json({ message: 'Connexion réussie en tant qu’admin.' });
  }
  

  return res.status(403).json({ message: 'Identifiants incorrects' });
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
  adminLogin,
  logout,
};
