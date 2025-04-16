const Artist = require('../models/Artist');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');
const bcrypt = require("bcrypt");

// ✅ Fonction de mise à jour corrigée
const updateArtist = async (req, res) => {
  console.log('🛠️ [updateArtist] Appel avec ID :', req.params.id);
  console.log('📦 [updateArtist] Données reçues :', req.body);
  try {
    const { id } = req.params;

    const updatedArtist = await Artist.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }

    console.log('✅ [updateArtist] Artiste mis à jour :', updatedArtist);
    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'artiste :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour', error });
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des artistes', error });
  }
};

// const createArtist = async (req, res) => {
//   try {
//     const newArtist = new Artist({
//       ...req.body,
//       status: "pending",         // 🔒 Ne pas faire confiance à ce que le client envoie
//       role: "artist",            // ✅ Assure aussi le bon rôle
//       isAdmin: false             // ✅ Ne jamais autoriser par défaut
//     });
//     const savedArtist = await newArtist.save();
//     await sendConfirmationEmail(savedArtist.email, savedArtist.name);
//     res.status(201).json(savedArtist);
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la création de l\'artiste', error });
//   }
// };
const createArtist = async (req, res) => {
  try {
    console.log("📥 Requête reçue pour créer un artiste :", req.body);

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
      newsletter
    } = req.body;

    if (!username || !password || !email) {
      console.log("❌ Champs obligatoires manquants");
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const existing = await Artist.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      console.log("❌ Artiste déjà existant avec ce nom ou cet email");
      return res.status(400).json({ message: "Artiste déjà existant avec ce nom ou cet email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Mot de passe hashé");

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
      status: "pending"
    });

    const savedArtist = await newArtist.save();
    console.log("✅ Artiste sauvegardé :", savedArtist);

    await sendConfirmationEmail(savedArtist.email, savedArtist.name);
    console.log("📧 Email de confirmation envoyé à", savedArtist.email);

    res.status(201).json(savedArtist);
  } catch (error) {
    console.error("🔥 Erreur interne dans createArtist :", error);
    res.status(500).json({ message: "Erreur interne lors de l'inscription", error: error.message });
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
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Artist.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', error });
  }
};

const getRandomArtworks = async (req, res) => {
  try {
    const count = await Artist.countDocuments();
    const random = Math.floor(Math.random() * count);
    const artworks = await Artist.find().skip(random).limit(3); // Exemple : 3 œuvres aléatoires
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des œuvres aléatoires', error });
  }
};

const getFeaturedArtists = async (req, res) => {
  try {
    // Utilise l'agrégation MongoDB pour récupérer 4 artistes de manière aléatoire
    const featuredArtists = await Artist.aggregate([{ $sample: { size: 4 } }]);
    res.status(200).json(featuredArtists);
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes en vedette :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des artistes" });
  }
};

module.exports = {
  updateArtist,
  getAllArtists,
  createArtist,
  deleteArtist,
  getPendingArtists,
  updateArtistStatus,
  getRandomArtworks,
  getFeaturedArtists
};
