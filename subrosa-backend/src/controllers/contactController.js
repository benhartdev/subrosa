const ContactMessage = require("../models/ContactMessage");
const Artist = require("../models/Artists");
const sendContactEmail = require("../utils/sendContactEmail");

// Envoi d'un message de contact
const sendContactMessage = async (req, res) => {
  console.log("📦 SESSION REÇUE :", req.session);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    let artist = null;

    // 1. Si l'utilisateur connecté est un artiste
    if (req.session?.user?.role === "artist") {
      artist = await Artist.findById(req.session.user.id);
      console.log("🎯 Artiste connecté :", artist?.username);
    }

    // 2. Sinon, tentative de liaison via l'email
    if (!artist) {
      artist = await Artist.findOne({ email });
      if (artist) {
        console.log("🎯 Artiste trouvé via email :", artist.username);
      } else {
        console.log("❌ Aucun artiste trouvé avec l'email :", email);
      }
    }

    // 3. Enregistrement du message
    const newMessage = new ContactMessage({
      name,
      email,
      message,
      artistId: artist ? artist._id : null,
    });

    await newMessage.save();
    console.log("✅ Message enregistré :", newMessage._id);

    // 4. Liaison du message à l'artiste via $push pour eviter erreur silencieuse mongoose, sur l'update de la date qui bloquait
    if (artist) {
      await Artist.findByIdAndUpdate(
        artist._id,
        { $push: { messages: newMessage._id } },
        { new: true }
      );
      console.log("📥 Message lié à l'artiste :", artist.username);
    }

    // 5. Envoi des emails
    let emailSent = true;
    try {
      console.log("✉️ Destinataire confirmation :", email);
      await sendContactEmail(
        "ben.hoffele.photographe@outlook.fr",
        { name, email },
        message
      );
      console.log("📤 Email envoyé avec succès");
    } catch (emailErr) {
      emailSent = false;
      console.warn("⚠️ Erreur lors de l’envoi de l’email :", emailErr.message);
    }

    // 6. Réponse frontend
    res.status(200).json({
      message: "Message enregistré.",
      emailSent,
    });
  } catch (error) {
    console.error("❌ Erreur globale dans sendContactMessage :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Récupération de tous les messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .populate("artistId", "username artistImages");

    console.log("📦 Messages récupérés :", messages.length);
    res.json(messages);
  } catch (error) {
    console.error("❌ Erreur getAllMessages :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Suppression d’un message
const deleteMessage = async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Message non trouvé" });
    }
    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression message :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};

module.exports = { sendContactMessage, getAllMessages, deleteMessage };
