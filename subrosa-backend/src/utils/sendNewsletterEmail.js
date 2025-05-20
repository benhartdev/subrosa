const path = require('path');
const dotenv = require('dotenv');

// 🔥 On force le chemin absolu depuis ce fichier
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const nodemailer = require('nodemailer');
console.log("EMAIL_HOST =", process.env.EMAIL_HOST);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Mail de bienvenue
const sendWelcomeEmail = async (email) => {
  try {
    const mailOptions = {
      from: `"SUB ROSA ART" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Bienvenue dans la newsletter SUB ROSA',
      html: `
        <h2>Merci pour votre inscription !</h2>
        <p>Vous recevrez bientôt nos nouveautés.</p>
        <p><a href="${process.env.BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}">Se désinscrire</a></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email de bienvenue envoyé à ${email} | ID: ${info.messageId}`);
  } catch (err) {
    console.error("❌ Erreur dans sendWelcomeEmail :", err.message);
    throw err; // ← ne masque pas l’erreur
  }
};


// ✅ Mail de désinscription
const sendUnsubscribeConfirmation = async (email) => {
  const mailOptions = {
    from: `"SUB ROSA ART" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Confirmation de désinscription',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 1em;">
        <h2>Désinscription confirmée</h2>
        <p>Votre adresse a bien été retirée de notre newsletter.</p>
        <p>Merci d’avoir suivi notre actualité jusqu’ici.</p>
        <p>Vous pouvez vous réinscrire à tout moment sur notre site si vous changez d’avis.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Email de désinscription envoyé à ${email} | ID: ${info.messageId}`);
};

// 🔁 Export des deux fonctions
module.exports = {
  sendWelcomeEmail,
  sendUnsubscribeConfirmation
};
