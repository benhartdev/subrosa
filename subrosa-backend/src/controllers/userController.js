// src/controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail'); // ✅ à créer

const registerUser = async (req, res) => {
  try {
    const { email, username, password, ...otherFields } = req.body;

    // Vérifie si un utilisateur avec cet email ou ce username existe déjà
    const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email ou ce nom existe déjà.' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      ...otherFields,
    });
    console.log("➡️ Je vais sauvegarder l’utilisateur :", newUser);
    await newUser.save();

    // Envoie un e-mail de bienvenue
    await sendConfirmationEmail(email, username);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error('Erreur dans registerUser :', error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
};

module.exports = { registerUser };
