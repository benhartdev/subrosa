const nodemailer = require("nodemailer");

const sendArtistStatusEmail = async (to, username, status) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let subject;
  let html;

  if (status === "validated") {
    subject = "🎉 Votre profil artiste a été validé !";
    html = `
      <h2>Bonjour ${username},</h2>
      <p>Bonne nouvelle ! Votre profil a été validé sur <strong>SUB ROSA ART</strong>.</p>
      <p>Vous pouvez maintenant publier vos œuvres, gérer votre espace personnel et interagir avec notre communauté.</p>
      <p>Merci pour votre confiance et bienvenue parmi nos artistes !</p>
      <br>
      <p>L’équipe SUB ROSA ART</p>
    `;
  } else if (status === "rejected") {
    subject = "❌ Votre demande d'inscription a été refusée";
    html = `
      <h2>Bonjour ${username},</h2>
      <p>Merci pour votre inscription sur <strong>SUB ROSA ART</strong>.</p>
      <p>Après examen, nous ne pouvons malheureusement pas valider votre profil pour le moment.</p>
      <p>Raisons fréquentes :</p>
      <ul>
        <li>Dossier incomplet</li>
        <li>Qualité des visuels insuffisante</li>
        <li>Style artistique non aligné avec notre ligne éditoriale</li>
      </ul>
      <p>Vous pouvez bien sûr soumettre une nouvelle demande ultérieurement.</p>
      <br>
      <p>L’équipe SUB ROSA ART</p>
    `;
  } else if (status === "pending") {
    subject = "🕓 Votre profil est en cours de validation";
    html = `
      <h2>Bonjour ${username},</h2>
      <p>Nous vous confirmons que votre demande a bien été enregistrée.</p>
      <p>Votre profil est actuellement en cours d'étude par notre équipe.</p>
      <p>Vous recevrez une notification dès qu'une décision aura été prise.</p>
      <br>
      <p>Merci de votre patience,</p>
      <p>L’équipe SUB ROSA ART</p>
    `;
  } else {
    // Ne rien envoyer pour les autres statuts
    console.warn("📭 Aucun email envoyé : statut non pris en charge :", status);
    return;
  }

  const mailOptions = {
    from: `"SUB ROSA ART" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendArtistStatusEmail;
