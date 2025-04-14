const bcrypt = require("bcrypt");
const Artist = require("../models/Artist");
const User = require("../models/user");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
     // ✅ ADMIN via .env
     if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.user = {
        username,
        role: "admin",
        isAdmin: true
      };
      return res.status(200).json({
        message: "Connexion ADMIN réussie",
        user: {
          username,
          role: "admin",
          isAdmin: true
        }
      });
    }
    // Recherche dans les 2 collections
    const user =
     
      (await Artist.findOne({ username })) ||
      (await User.findOne({ username }));

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Création de la session dynamique
    req.session.user = {
      id: user._id,
      role: user.role, // "admin", "artist" ou "user"
      isAdmin: user.isAdmin,
      username: user.username
    };

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        role: user.role,
        isAdmin: user.isAdmin,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Déconnexion réussie." });
  });
};

module.exports = { loginUser, logout };
