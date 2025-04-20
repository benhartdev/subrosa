const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // ou smtp.orange / outlook / autre
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendArtistStatusEmail = async (email, name, status) => {
  let subject = "";
  let html = "";

  if (status === "approved") {
    subject = "🎉 Bienvenue dans la galerie SUB ROSA !";
    html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color:#8A2BE2;">Bonjour ${name},</h2>
        <p>
          Nous avons le plaisir de vous annoncer que votre candidature à la galerie <strong>SUB ROSA</strong> a été acceptée. 🎨✨
        </p>
        <p>
          Nous sommes impatients d’en savoir plus sur votre univers artistique. <br>
          Je reviendrai très prochainement vers vous pour organiser un entretien individuel afin de définir ensemble la suite : œuvres à exposer, portrait à publier, fiche à compléter, etc.
        </p>
        <p>
          À très bientôt !<br>
          L'équipe SUB ROSA
        </p>
      </div>
    `;
  } else {
    subject = "🖤 Retour suite à votre candidature SUB ROSA";
    html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Bonjour ${name},</h2>
        <p>
          Merci infiniment pour votre candidature à la galerie <strong>SUB ROSA</strong>.
        </p>
        <p>
          Après étude de votre dossier, nous sommes au regret de ne pas pouvoir retenir votre candidature pour le moment. <br>
          Ce refus peut être lié à différents facteurs : nombre limité de places cette saison, univers artistique trop proche d’un artiste déjà représenté, ou besoin de mieux cerner votre projet.
        </p>
        <p>
          N’hésitez pas à nous recontacter ultérieurement ou à suivre nos prochaines ouvertures via notre newsletter.
        </p>
        <p>
          Bien à vous,<br>
          L’équipe SUB ROSA
        </p>
      </div>
    `;
  }

  await transporter.sendMail({
    from: `"SUB ROSA" <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = sendArtistStatusEmail;
