const Artist = require("../models/Artists");
const User = require("../models/user");
const crypto = require('crypto');
const sendResetEmail = require('../utils/sendResetEmail');
const bcrypt = require("bcryptjs");
const { sendPasswordResetConfirmationEmail } = require("../utils/sendEmailNewPassword");


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
    const cleanEmail = email.trim().toLowerCase();

    // 🔍 Recherche d'abord dans les artistes
    console.log("🔍 Recherche dans ARTIST...");
    let user = await Artist.findOne({ email: cleanEmail });
    let accountType = "artist";

    // 🔍 Sinon, recherche dans les utilisateurs
    if (!user) {
      console.log("🔍 Aucun artist trouvé. Recherche dans USER...");
      user = await User.findOne({ email: cleanEmail });
      accountType = "user";
    }

    // ❌ Aucun utilisateur trouvé
    if (!user) {
      console.warn("❌ Aucun utilisateur trouvé avec cet email :", cleanEmail);
      return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email." });
    }

    // ✅ Création d'un token de réinitialisation
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 heure

    // ✅ Mise à jour des champs
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;

    console.log("🧪 Avant save :", {
  email: user.email,
  token: token,
  username: user.username,
  resetPasswordToken: user.resetPasswordToken,
  resetPasswordExpires: user.resetPasswordExpires
});

    // ✅ Sauvegarde
   const saved = await user.save();
console.log("✅ Champs enregistrés dans MongoDB :", saved.resetPasswordToken, saved.resetPasswordExpires);

    // ✅ Envoi de l’email
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await sendResetEmail(user.email, user.username, resetLink);

    console.log(`✅ ${accountType.toUpperCase()} trouvé : ${user.email}`);
    console.log("🔑 Token enregistré :", token);

    res.status(200).json({ message: "Email de réinitialisation envoyé." });

  } catch (error) {
    console.error("❌ Erreur dans forgotPassword:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token ou mot de passe manquant." });
  }

  try {
    console.log("🔍 Recherche avec token :", token);
    let account = await Artist.findOne({ resetPasswordToken: token });
    let accountType = "artist";

    if (!account) {
      account = await User.findOne({ resetPasswordToken: token });
      accountType = "user";
    }

    if (!account) {
      return res.status(400).json({ message: "Token invalide ou expiré." });
    }

    if (account.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Le lien a expiré. Merci de recommencer la procédure." });
    }

    const isSame = await bcrypt.compare(newPassword, account.password);
    if (isSame) {
      return res.status(400).json({ message: "Le nouveau mot de passe doit être différent de l’ancien." });
    }

    account.password = newPassword;
    account.resetPasswordToken = undefined;
    account.resetPasswordExpires = undefined;

    await account.save();

    try {
      await sendPasswordResetConfirmationEmail(account.email, account.username || account.name);
    } catch (emailErr) {
      console.warn("❌ Impossible d’envoyer l’email de confirmation :", emailErr.message);
    }

    console.log("✅ Mot de passe mis à jour avec succès");
    return res.status(200).json({
      message: `Mot de passe réinitialisé avec succès pour le ${accountType}.`
    });

  } catch (err) {
    console.error("❌ Erreur reset password :", err);
    return res.status(500).json({ message: "Erreur serveur lors de la réinitialisation." });
  }
};




module.exports = { loginUser, logout, forgotPassword, resetPassword };