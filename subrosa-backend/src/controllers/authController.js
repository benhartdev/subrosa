const bcrypt = require("bcrypt");
const Artist = require("../models/Artists");
const User = require("../models/user");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("📥 Login reçu :", username);
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

      // ✅ Sauvegarde explicite de session avant réponse
      return req.session.save(err => {
        if (err) {
          console.error("Erreur session admin :", err);
          return res.status(500).json({ message: "Erreur session." });
        }

        return res.status(200).json({
          message: "Connexion ADMIN réussie",
          user: req.session.user
        });
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
      role: user.role,
      isAdmin: user.isAdmin,
      username: user.username
    };

    // ✅ Sauvegarde explicite de session avant réponse
    req.session.save(err => {
      if (err) {
        console.error("Erreur session utilisateur :", err);
        return res.status(500).json({ message: "Erreur session." });
      }

      return res.status(200).json({
        message: "Connexion réussie",
        user, // ⬅️ on renvoie tout l’objet de l'artiste ici
      });
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const logout = (req, res) => {
  console.log("🔐 Déconnexion reçue :", req.session.user);
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Déconnexion réussie." });
  });
};

module.exports = { loginUser, logout };