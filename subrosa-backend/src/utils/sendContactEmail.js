const nodemailer = require("nodemailer");

const sendContactEmail = async (toAdmin, fromUser, messageContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 1. Email pour toi (l’admin)
  await transporter.sendMail({
    from: `"Formulaire SUB ROSA" <${process.env.SMTP_USER}>`,
    to: toAdmin,
    subject: `📨 Nouveau message de ${fromUser.name}`,
    html: `
      <h2>Salut Ben, tu as recu un message via le formulaire de contact SUB ROSA</h2>
      <p><strong>Nom :</strong> ${fromUser.name}</p>
      <p><strong>Email :</strong> ${fromUser.email}</p>
      <p><strong>Message :</strong><br/>${messageContent}</p>
      <p>Réponds à cette personne dans les meilleurs délais. 
    `,
  });

  // 2. Email de confirmation pour l'expéditeur
  await transporter.sendMail({
    from: `"SUB ROSA" <${process.env.SMTP_USER}>`,
    to: fromUser.email,
    subject: "✔️ Confirmation de réception – SUB ROSA",
    html: `
      <p>Bonjour ${fromUser.name},</p>
      <p>Nous avons bien reçu votre message :</p>
      <blockquote>${messageContent}</blockquote>
      <p>Nous reviendrons vers vous dans les plus brefs délais.</p>
      <br/>
      <p>L’équipe SUB ROSA</p>
    `,
  });
};

module.exports = sendContactEmail;
