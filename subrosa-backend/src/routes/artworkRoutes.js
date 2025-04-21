// routes/artworkRoutes.js
const express = require('express');
const router = express.Router();
const Artwork = require('../models/ArtworkSelectionSchema.js'); // Adapté à votre modèle
const { ensureAdmin, ensureArtist } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig'); // ou le bon chemin si c’est ailleurs

// Route publique pour récupérer des œuvres aléatoires
router.get('/random', async (req, res) => {
  try {
    const artworks = await Artwork.aggregate([{ $sample: { size: 6 } }]);
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des œuvres.' });
  }
});

// ✅ Nouvelle route artiste avec upload d’image
router.post('/artist/add', ensureArtist, upload.single('image'), async (req, res) => {
  console.log('🧾 REQ.BODY :', req.body);
  console.log('🖼️ REQ.FILE :', req.file);
  try {
    const { title, artist, description, price } = req.body;

    // Vérifie si un fichier image a bien été reçu
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image fournie.' });
    }

    // Crée l'œuvre avec statut "pending"
    const newArtwork = new Artwork({
      title,
      artist,
      description,
      price,
      status: 'pending',
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newArtwork.save();

    res.status(201).json({
      message: "Œuvre soumise pour validation",
      artwork: newArtwork
    });

  } catch (error) {
    console.error("❌ Erreur lors de la soumission d’œuvre :", error);
    res.status(500).json({ message: 'Erreur serveur lors de l’enregistrement.' });
  }
});

// Route protégée pour ajouter une œuvre (admin uniquement)
router.post('/add', ensureAdmin, async (req, res) => {
  const { title, artist, imageUrl, description, price } = req.body;
  try {
    const newArtwork = new Artwork({ title, artist, imageUrl, description, price });
    await newArtwork.save();
    res.status(201).json({ message: 'Œuvre ajoutée avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'œuvre.' });
  }
});

module.exports = router;
