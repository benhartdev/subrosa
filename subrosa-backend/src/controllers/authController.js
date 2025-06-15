const Artist = require("../models/Artists");
const User = require("../models/user");
const crypto = require('crypto');
const sendResetEmail = require('../utils/sendResetEmail');
const bcrypt = require("bcryptjs");
const loginUser = async (req, res) => {
  let { username, password } = req.body;
  console.log("📥 Login reçu :", username);

   // 🔍 Sécurisation basique : trim des espaces
  username = username?.trim();
  password = password?.trim();

  console.log("📥 Tentative de login");
  console.log("→ Username reçu :", `"${username}"`);
  console.log("→ Password reçu :", `"${password}"`);

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
      console.warn("❌ Aucun utilisateur trouvé pour :", username);
      return res.status(401).json({ message: "Utilisateur introuvable." });
    }

    console.log("✅ Utilisateur trouvé :", user.username);
    console.log("→ Password hashé en base :", user.password);

    const validPassword = await bcrypt.compare(password, user.password);

     console.log("🧪 Résultat de la comparaison bcrypt :", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Création de la session dynamique
    req.session.user = {
      id: user._id,
      role: user.role,
      isAdmin: user.isAdmin,
      username: user.username,
      name: user.name,
       artistId: user.role === "artist" ? user._id : null,
    };

    // ✅ Sauvegarde explicite de session avant réponse
    req.session.save(err => {
      if (err) {
        console.error("Erreur session utilisateur :", err);
        return res.status(500).json({ message: "Erreur session." });
      }

      return res.status(200).json({
        message: "Connexion réussie",
        user: req.session.user,
      });
    });

  } catch (error) {
    console.error("❌ Erreur serveur pendant la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const logout = (req, res) => {
  console.log("🔐 Déconnexion reçue :", req.session.user);
  console.log("🔐 Déconnexion reçue :", req.session.artist);
  console.log("🔐 Déconnexion reçue :", req.session.admin);


  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Déconnexion réussie." });
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 heure

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;

    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await sendResetEmail(user.email, user.username, resetLink);

    res.status(200).json({ message: "Email de réinitialisation envoyé." });
  } catch (error) {
    console.error("Erreur dans forgotPassword:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Lien invalide ou expiré." });
    }

   
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { loginUser, logout, forgotPassword, resetPassword };