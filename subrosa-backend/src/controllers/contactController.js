const ContactMessage = require("../models/ContactMessage");
const Artist = require("../models/Artists");
const sendContactEmail = require("../utils/sendContactEmail");
const { validationResult } = require("express-validator");
const BlockedIP = require("../models/BlockedIP");

// Fonction de nettoyage
function sanitizeMessage(input) {
  const cleaned = input
    .replace(/<[^>]*>?/gm, "") // supprime balises HTML
    .replace(/https?:\/\/[^\s]+/g, "[lien supprimé]") // remplace les liens
    .replace(/&[a-z]+;/gi, "") // supprime les entités HTML (&nbsp;, etc.)
    .trim();
  return cleaned;
}
// Mots interdit - crypto - pub etc...
function containsBannedWords(message) {
  const bannedWords = [
    "crypto", "bitcoin", "gagner de l’argent", "nft",
    "sexe", "porno", "casino"
  ];
  const lowerMessage = message.toLowerCase();
  return bannedWords.some(word => lowerMessage.includes(word));
}

// Envoi d'un message de contact
const sendContactMessage = async (req, res) => {
  console.log("📦 SESSION REÇUE :", req.session);

  // 🚨 Étape pour traiter les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("❌ Erreurs de validation :", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email } = req.body;
  const message = sanitizeMessage(req.body.message);

  if (containsBannedWords(message)) {
  return res.status(400).json({
    success: false,
    error: "❌ Votre message contient des termes interdits.",
  });
  }
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

    let suggestedArtist = null;

  // Si l'utilisateur est connecté
  if (req.session?.user?.role === "artist") {
    artist = await Artist.findById(req.session.user.id);
    console.log("🎯 Artiste connecté :", artist?.username);
  } else {
  // Tentative de correspondance par email (sans rattachement)
  suggestedArtist = await Artist.findOne({ email });
  if (suggestedArtist) {
    console.log("💡 Email connu d’un artiste :", suggestedArtist.username);
  }
}

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    
    // ⚠️ Vérifie si l’IP est bloquée
    const isBlocked = await BlockedIP.findOne({ ip });

    if (isBlocked) {
      console.log("⛔ Message bloqué : IP interdite →", ip);
      return res.status(403).json({
        error: "⛔ Cette adresse IP est bloquée. Vous ne pouvez pas envoyer de message.",
      });
    }

    const suspectedArtistEmailMatch = !!suggestedArtist && !artist;

    // 3. Enregistrement du message
    const newMessage = new ContactMessage({
      name,
      email,
      message,
      artistId: artist ? artist._id : null,
      suggestedArtistId: suggestedArtist ? suggestedArtist._id : null,
      suspectedArtistEmailMatch,
      ip,
      userAgent,
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

// Marquer un message comme lu ou non lu
const markAsRead = async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;

  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Message non trouvé" });

    res.status(200).json({ message: "Statut mis à jour", updated });
  } catch (error) {
    console.error("Erreur dans markAsRead :", error);
    res.status(500).json({ message: "Erreur serveur" });
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

module.exports = { sendContactMessage, getAllMessages, deleteMessage, markAsRead };
