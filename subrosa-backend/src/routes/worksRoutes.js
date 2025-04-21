const express = require('express');
const router = express.Router();
const Work = require('../models/work');
const Artist = require('../models/Artists');
const { ensureAdmin, ensureArtist } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig'); // ou le bon chemin si c’est ailleurs
const fs = require('fs');

// Récupérer toutes les œuvres
router.get('/', async (req, res) => {
  try {
    const works = await Work.find().populate('artistId');
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres." });
  }
});

// Récupérer les œuvres validées uniquement
router.get('/validated', async (req, res) => {
  try {
    const works = await Work.find({ status: 'validated' });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres validées." });
  }
});

// (optionnel) Récupérer les œuvres d’un artiste spécifique
router.get('/artist/:id', async (req, res) => {
  try {
    const artistId = req.params.id;
    const works = await Work.find({ artistId });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des œuvres de l'artiste." });
  }
});


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
router.post('/artist/add', upload.array('images', 10), async (req, res) => {
  try {
    console.log('📥 Données reçues :');
    console.log('🟡 req.body =>', req.body);
    console.log('🖼️ req.files =>', req.files);
    const {
      title,
      description,
      creation_date,
      medium,
      price,
      currency,
      in_stock,
      status,
      dominant_colors,
      themes,
      artistId,
     
    } = req.body;

    const { dimensions } = req.body;

const finalDimensions = {
  height: Number(dimensions.height),
  width: Number(dimensions.width),
  depth: dimensions.depth ? Number(dimensions.depth) : null,
  unit: dimensions.unit || 'cm',
};

    // 📸 Traitement des images + altText[]
    const images = req.files.map((file, index) => {
      const altText = req.body[`altText[${index}]`] || 'Image sans texte alternatif';
      return {
        url: `/uploads/${file.filename}`,
        altText,
      };
    });

    const newWork = new Work({
      title,
  description,
  creation_date,
  medium,
  price: Number(price),
  currency,
  in_stock: Number(in_stock),
  status,
  dominant_colors,
  themes,
  artistId,
  dimensions: finalDimensions,
  images,
    });

    await newWork.save();

    res.status(201).json(newWork);
  } catch (error) {
    console.error('Erreur ajout œuvre :', error);
    res.status(500).json({ message: "Erreur lors de la soumission de l’œuvre.",
      details: error.message });
  }});


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
