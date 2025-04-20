// controllers/artistsController.js
const mongoose = require('mongoose');
const Artist = require('../models/Artists');
const bcrypt = require("bcrypt");
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
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
      newsletter
    } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const existing = await Artist.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "Artiste déjà existant avec ce nom ou cet email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
    await sendConfirmationEmail(savedArtist.email, savedArtist.name);
    res.status(201).json(savedArtist);
  } catch (error) {
    console.error("Erreur interne dans createArtist :", error);
    res.status(500).json({ message: "Erreur interne lors de l'inscription", error: error.message });
  }
};

const updateArtist = async (req, res) => {
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
    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'artiste :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour', error });
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

    const updated = await Artist.findByIdAndUpdate(id, { status }, { new: true });
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


module.exports = {
  getAllArtists,
  getFeaturedArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getPendingArtists,
  updateArtistStatus
};
