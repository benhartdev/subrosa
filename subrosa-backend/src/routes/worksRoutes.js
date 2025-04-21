const express = require('express');
const router = express.Router();
const Work = require('../models/work');
const Artist = require('../models/Artist');
const { ensureArtist } = require('../middlewares/authMiddleware');

router.post('/by-artist', ensureArtist, async (req, res) => {
  try {
    // Création de l’œuvre
    const newWork = new Work(req.body);
    const savedWork = await newWork.save();

    // Récupération de l'ID de l'artiste connecté via la session
    const artistId = req.session.user._id;

    // Ajout de l'œuvre à l'artiste
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      { $push: { works: savedWork._id } },
      { new: true }
    ).populate('works');

    res.status(201).json({
      message: 'Œuvre ajoutée et associée à l’artiste',
      work: savedWork,
      updatedArtist
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de l’œuvre." });
  }
});
