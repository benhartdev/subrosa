const nodemailer = require("nodemailer");

const sendResetEmail = async (email, username, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // true si port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"SUB ROSA ART" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Réinitialisation de votre mot de passe",
      html: `
        <h2>Bonjour ${username},</h2>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Voici le lien pour le faire (valable 1h) :</p>
        <a href="${resetLink}">${resetLink}</a>
        <br/><br/>
        <p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>
        <p>— L'équipe SUB ROSA</p>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Erreur envoi email reset :", error);
  }
};

module.exports = sendResetEmail
