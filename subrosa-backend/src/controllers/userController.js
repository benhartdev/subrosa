// src/controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail'); // ✅ à créer
const NewsletterSubscriber = require('../models/NewsletterSubscriber');


const registerUser = async (req, res) => {
  try {
    const { email, username, password, ...otherFields } = req.body;

    // Vérifie si un utilisateur avec cet email ou ce username existe déjà
    const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email ou ce nom existe déjà.' });
    }


    const newUser = new User({
      email,
      username,
      password,
      ...otherFields,
    });
    console.log("➡️ Je vais sauvegarder l’utilisateur :", newUser);
    const savedUser = await newUser.save(); // ✅ stocker le résultat

      if (req.body.newsletter === true || req.body.newsletter === 'true') {
        try {
          const existingSubscriber = await NewsletterSubscriber.findOne({ email: savedUser.email });
          if (!existingSubscriber) {
            await NewsletterSubscriber.create({ email: savedUser.email });
            console.log("✅ Email inscrit à la newsletter :", savedUser.email);
          } else {
            console.log("ℹ️ Email déjà abonné à la newsletter :", savedUser.email);
          }
        } catch (err) {
          console.error("❌ Erreur lors de l'inscription à la newsletter :", err);
        }
      }

    // Envoie un e-mail de bienvenue
    await sendConfirmationEmail(email, username);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error('Erreur dans registerUser :', error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
};

module.exports = { registerUser };
