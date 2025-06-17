const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (toEmail, artistName) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    
    await transporter.sendMail({
      from: `"SUB ROSA ART" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Confirmation d'inscription - Sub Rosa Art",
      html: `
        <h2>Bonjour ${artistName},</h2>
        <p>Merci pour votre inscription sur la galerie Sub Rosa Art. 🖼️</p>
        <p>Votre demande a bien été reçue et est en attente de validation par notre équipe.</p>
        <p>Nous vous recontacterons très vite.</p>
        <br />
        <p>— L’équipe Sub Rosa</p>
      `,
    });

  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
  }
};

module.exports = sendConfirmationEmail;
