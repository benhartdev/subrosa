const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { sendWelcomeEmail, sendUnsubscribeConfirmation } = require('../utils/sendNewsletterEmail');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

router.post('/subscribe', newsletterController.subscribe);

router.get('/unsubscribe', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ success: false, message: "Email manquant" });


  try {
    const result = await NewsletterSubscriber.findOneAndDelete({ email });
    if (!result) return res.status(404).json({ success: false, message: "Adresse non trouvée" });

    // 💡 On essaie d'envoyer un email mais on n'échoue pas la désinscription si ça rate
    try {
      await sendUnsubscribeConfirmation(email);
    } catch (err) {
      console.warn(`⚠️ Email non envoyé à ${email} :`, err.message);
    }

    res.redirect(`http://localhost:3000/newsletter/desinscription?email=${encodeURIComponent(email)}`);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erreur lors de la désinscription" });
  }
});


module.exports = router;
