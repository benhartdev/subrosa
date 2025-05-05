const ContactMessage = require("../models/ContactMessage");
const Artist = require("../models/Artists");
const sendContactEmail = require("../utils/sendContactEmail");


const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si un artiste correspond à cet email
    const artist = await Artist.findOne({ email });

    if (artist) {
      console.log("🎯 Artiste trouvé :", artist.username);
    } else {
      console.log("❌ Aucun artiste trouvé avec l'email :", email);
    }

    // Créer le message
    const newMessage = new ContactMessage({
      name,
      email,
      message,
      artistId: artist ? artist._id : null,
    });

    // Sauvegarde en base
    await newMessage.save();
      console.log("✅ Message enregistré :", newMessage._id);
   
      // Associer à l’artiste (si trouvé)
    if (artist) {
      artist.messages = artist.messages || [];
      artist.messages.push(newMessage._id);
      await artist.save();
      console.log("📥 Message ajouté au profil artiste");
    }

    // Envoyer les emails (admin + confirmation)
    await sendContactEmail(
      "ben.hoffele.photographe@outlook.fr", // 🔁 adresse admin réelle
      { name, email },
      message
    );

    res.status(200).json({ message: "Message envoyé et enregistré." });
  } catch (error) {
    console.error("Erreur dans sendContactMessage :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .populate("artistId", "username email artistImages");
    res.json(messages);
  } catch (error) {
    console.error("Erreur getAllMessages :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { sendContactMessage, getAllMessages, };
