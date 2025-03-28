const express = require('express');
const Artwork = require('../models/ArtworkSelectionSchema.js');
const router = express.Router();
const { ensureAdmin } = require('../middlewares/authMiddleware');

// Route publique pour récupérer des œuvres aléatoires
router.get('/random', async (req, res) => {
    try {
        const artworks = await Artwork.aggregate([{ $sample: { size: 6 } }]);
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des œuvres.' });
    }
});

// 🔒 Route protégée pour ajouter une œuvre d'art (admin uniquement)
router.post('/add', ensureAdmin, async (req, res) => {
    const { title, artist, imageUrl, description, price } = req.body;

    try {
        const newArtwork = new Artwork({
            title,
            artist,
            imageUrl,
            description,
            price
        });

        await newArtwork.save();
        res.status(201).json({ message: 'Œuvre ajoutée avec succès !' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'œuvre.' });
    }
});

module.exports = router;
