// controllers/artistsController.js
const mongoose = require('mongoose');
const Artist = require('../models/Artists');
const bcrypt = require("bcrypt");
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');
const sendArtistStatusEmail = require('../utils/sendArtistStatusEmail');



const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find({isApproved: true});
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des artistes', error });
  }
};

const getFeaturedArtists = async (req, res) => {
  try {
    let featuredArtists;
    if (req.query.ids) {
      // Filtrer par IDs spécifiques
      const idsArray = req.query.ids.split(",");
      const objectIds = idsArray.map(id => new mongoose.Types.ObjectId(id));
      featuredArtists = await Artist.find({ _id: { $in: objectIds } });
    } else {
      // Retourner aléatoirement 4 artistes
      featuredArtists = await Artist.aggregate([{ $sample: { size: 4 } }]);
    }
    res.status(200).json(featuredArtists);
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes en vedette :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des artistes" });
  }
};

const createArtist = async (req, res) => {
  console.log("===== [DEBUG] createArtist =====");
console.log("BODY FIELDS :", req.body);
console.log("FILES REÇUS :", req.files);
console.log("FICHIER 0 (images) :", req.files?.images?.[0]);
console.log("FICHIER 0 (artistImages) :", req.files?.artistImages?.[0]);
  try {
      
    const {
      username,
      password,
      email,
      name,
      bio,
      birthdate,
      phone,
      city_location,
      country_location,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
      technical_skills,
      style,
      interviews,
      old_exhibitions,
      future_exhibitions,
      newsletter,
      
    } = req.body;

    // Vérification des champs requis
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    // Vérification doublon (username ou email)
    const existing = await Artist.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "Artiste déjà existant avec ce nom ou cet email" });
    }

    console.log("🔐 Mot de passe original reçu :", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hash généré :", hashedPassword);

    // Images des œuvres
const rawAlts = req.body.alts || [];
const alts = Array.isArray(rawAlts) ? rawAlts : [rawAlts];
const images = req.files['images']?.map((file, index) => ({
  url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
  alt: alts[index] || '',
  caption: ''
})) || [];

// Images de l'artiste
const rawArtistAlts = req.body.artistAlts || [];
const artistAlts = Array.isArray(rawArtistAlts) ? rawArtistAlts : [rawArtistAlts];
const artistImages = req.files['artistImages']?.map((file, index) => ({
  url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
  alt: artistAlts[index] || '',
  caption: ''
})) || [];
    

    // Création de l'artiste avec le mot de passe sécurisé + images
    const newArtist = new Artist({
      username,
      password: hashedPassword,
      email,
      name,
      bio,
      birthdate,
      phone,
      city_location,
      country_location,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
      technical_skills,
      style,
      interviews,
      old_exhibitions,
      future_exhibitions,
      newsletter,
      isApproved: false,
      role: "artist",
      status: "pending",
      images,
      alts,
      artistImages 
    });
    console.log("✅ ARTISTE À SAUVEGARDER :", newArtist);
    // Sauvegarde + envoi d'email
    const savedArtist = await newArtist.save();
    console.log("✅ ARTISTE SAUVÉ AVEC SUCCÈS");

    await sendConfirmationEmail(savedArtist.email, savedArtist.name);

   // 🔐 Création de session artiste
    req.session.user = {
      id: savedArtist._id,
      username: savedArtist.username,
      role: savedArtist.role
    };

    // 🔄 Sauvegarde de la session avant réponse
    req.session.save(err => {
      if (err) {
        console.error("❌ Erreur création de session :", err);
        return res.status(500).json({ message: "Erreur de session après inscription." });
      }

      // ✅ Réponse client finale
      res.status(201).json(savedArtist);
    });
  } catch (error) {
    console.error("❌ ERREUR SAUVEGARDE ARTISTE :", {
      message: error.message,
      errors: error.errors || null,
      name: error.name,
      stack: error.stack
    });
  
    res.status(500).json({
      message: "Erreur lors de l'enregistrement de l'artiste",
      error: error.message,
      details: error.errors || null
    });
  }
};

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

          // ✅ Parser les champs JSON envoyés sous forme de string
      if (typeof updateData.images === 'string') {
        try {
          updateData.images = JSON.parse(updateData.images);
        } catch (e) {
          console.warn('❗ Impossible de parser le champ images');
        }
      }

      if (typeof updateData.artistImages === 'string') {
        try {
          updateData.artistImages = JSON.parse(updateData.artistImages);
        } catch (e) {
          console.warn('❗ Impossible de parser le champ artistImages');
        }
      }

    // ✅ S'assurer que les tableaux sont bien reconstruits depuis FormData
    if (typeof updateData.old_exhibitions === 'string') {
      updateData.old_exhibitions = [updateData.old_exhibitions];
    }
    if (typeof updateData.future_exhibitions === 'string') {
      updateData.future_exhibitions = [updateData.future_exhibitions];
    }

    // ✅ Ne pas écraser le mot de passe si champ vide
    if (!updateData.password) delete updateData.password;

    const updated = await Artist.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Artist.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }
    res.status(200).json({ message: 'Artiste supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'artiste', error });
  }
};

const getPendingArtists = async (req, res) => {
  try {
    const pendingArtists = await Artist.find({ status: 'pending' });
    res.status(200).json(pendingArtists);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des artistes en attente', error });
  }
};

const updateArtistStatus = async (req, res) => {
  console.log("🧠 SESSION ADMIN :", req.session);
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Artist.findByIdAndUpdate(id, { status, isApproved: status === "validated" }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Artiste non trouvé' });

     try {
       await sendArtistStatusEmail(updated.email, updated.name, status);
     } catch (emailError) {
       console.error("Erreur lors de l'envoi de l'email :", emailError.message);
     }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', error });
  }
};

const getOwnProfile = async (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const artist = await Artist.findById(userId);
  if (!artist) return res.status(404).json({ message: 'Artiste introuvable' });

  if (artist.status !== 'validated') {
    return res.status(403).json({ message: "Profil non accessible tant que non validé." });
  }

  res.status(200).json(artist);
};

const getArtistBySlug = async (req, res) => {
  try {
    const artist = await Artist.findOne({ slug: req.params.slug })
  .populate({
    path: "works",
    model: "work",
    match: { isApproved: true }, // ⚠️ adapte selon ton nom de modèle exact
  });

    if (!artist) {
      return res.status(404).json({ message: "Artiste introuvable" });
    }
    res.status(200).json(artist);
  } catch (error) {
    console.error("Erreur récupération artiste par slug:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔁 Fonction pour ajouter des images dans le champ artistImages

const updateArtistImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { newImages } = req.body;

    if (!Array.isArray(newImages) || newImages.length === 0) {
      return res.status(400).json({ message: "Aucune image fournie." });
    }

    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { $push: { artistImages: { $each: newImages } } },
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ message: "Artiste introuvable." });
    }

    res.status(200).json({
      message: `${newImages.length} image(s) ajoutée(s) avec succès à la fiche artiste.`,
      artist: updatedArtist
    });
  } catch (error) {
    console.error("❌ Erreur ajout images artiste :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

const getArtistById = async (req, res) => {
  const { id } = req.params;
  const sessionUser = req.session.user;

  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artiste introuvable" });
    }

    // 🔐 Accès refusé si artiste non validé et l'utilisateur n'est ni admin ni lui-même
    if (
      artist.status !== 'validated' &&
      (!sessionUser || (
        sessionUser.role !== "admin" && sessionUser.id !== artist._id.toString()
      ))
    ) {
      return res.status(403).json({ message: "Accès interdit à cet artiste non validé" });
    }

    res.status(200).json(artist);
  } catch (error) {
    console.error("Erreur récupération artiste :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllArtists,
  getFeaturedArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getPendingArtists,
  updateArtistStatus,
  updateArtistImages,
  getArtistById,
  getOwnProfile,
  getArtistBySlug,
};
