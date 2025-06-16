const nodemailer = require("nodemailer");

const sendPasswordResetConfirmationEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SUB ROSA ART" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de modification de mot de passe",
      html: `<p>Bonjour ${name},</p><p>Votre mot de passe a bien été modifié.</p>`,
    });

    console.log("✉️ Email de confirmation envoyé :", info.messageId);
  } catch (err) {
    console.error("❌ Impossible d’envoyer l’email de confirmation :", err.message);
  }
};

module.exports = { sendPasswordResetConfirmationEmail };
