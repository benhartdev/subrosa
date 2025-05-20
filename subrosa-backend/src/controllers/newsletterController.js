const { sendWelcomeEmail } = require('../utils/sendNewsletterEmail');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }

  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email déjà abonné à la newsletter' });
    }

    const newSubscriber = new NewsletterSubscriber({ email });
    await newSubscriber.save();

    // ✉️ Envoi email de bienvenue
    await sendWelcomeEmail(email);

    res.status(201).json({ message: "Abonnement Newsletter réussi, email d'enregistrement envoyé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
