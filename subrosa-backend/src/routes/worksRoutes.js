const express = require('express');
const router = express.Router();
const Work = require('../models/work');
const Artist = require('../models/Artists');
const { ensureAdmin, ensureArtist } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig'); 
const filterByApproval = require('../middlewares/filterByApproval');

// Récupérer toutes les œuvres
router.get('/', filterByApproval, async (req, res) => {
  try {
    const works = await Work.find({ ...req.approvalFilter }).populate('artistId');
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

// Route spéciale pour récupérer TOUTES les œuvres de l’artiste connecté
router.get('/all-by-artist/:id', async (req, res) => {
  try {
    const artistId = req.params.id;
    const works = await Work.find({ artistId });
    res.status(200).json(works);
  } catch (error) {
    console.error("Erreur récupération œuvres artiste :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// Route : GET /api/works/random
router.get('/random', async (req, res) => {
  try {
    const randomWorks = await Work.aggregate([
      { $match: { isApproved: true } }, // on récupère uniquement les œuvres validées
      { $sample: { size: 8 } } // on en sélectionne 8 au hasard
    ]);
    res.status(200).json(randomWorks);
  } catch (error) {
    console.error('Erreur lors de la récupération des œuvres aléatoires :', error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// (optionnel) Récupérer les œuvres d’un artiste spécifique
router.get('/artist/:id', filterByApproval, async (req, res) => {
  try {
    const artistId = req.params.id;
    const works = await Work.find({ artistId, ...req.approvalFilter });
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


// ✅ Nouvelle route artiste avec upload d’image
router.post('/artist/add', upload.array('images', 10), async (req, res) => {
  console.log("🧠 SESSION ACTUELLE :", req.session); 
  try {
    console.log('📥 Données reçues :');
    console.log('🟡 req.body =>', req.body);
    console.log('🖼️ req.files =>', req.files);

    // ✅ Vérification présence fichiers image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Aucune image n’a été envoyée." });
    }

    // ✅ Prendre l’ID depuis la session
    const artistId = req.session?.user?.id;
    if (!artistId) {
      return res.status(401).json({ message: "Utilisateur non connecté ou session expirée." });
    }

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artiste introuvable." });
    }

    // ✅ Limite d'œuvres pour artistes non validés
    if (artist.status !== 'validated') {
      const currentCount = await Work.countDocuments({ artistId });
      if (currentCount >= 6) {
        return res.status(403).json({
          message: "Vous pouvez soumettre jusqu'à 6 œuvres avant validation de votre profil."
        });
      }
    }

    const {
      type,
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
      dimensions
    } = req.body;

    const finalDimensions = {
      height: Number(dimensions.height),
      width: Number(dimensions.width),
      depth: dimensions.depth ? Number(dimensions.depth) : null,
      unit: dimensions.unit || 'cm',
    };

    const altTexts = req.body.altText;
    const normalizedAltTexts = Array.isArray(altTexts) ? altTexts : [altTexts];

    const images = req.files.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      altText: normalizedAltTexts[index] || 'Image sans texte alternatif',
    }));

    // ✅ Sécurité anti vide
    if (images.length === 0) {
      return res.status(400).json({ message: "Une œuvre doit contenir au moins une image." });
    }

    const newWork = new Work({
      type,
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
      isApproved: false, // reste en attente
    });

    await newWork.save();

    // 🔁 Mise à jour de l'artiste avec l'œuvre ajoutée
    await Artist.findByIdAndUpdate(
      artistId,
      { $push: { works: newWork._id } },
      { new: true }
    );

    res.status(201).json(newWork);

  } catch (error) {
    console.error('❌ Erreur ajout œuvre :', error);
    res.status(500).json({
      message: "Erreur lors de la soumission de l’œuvre.",
      details: error.message
    });
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

// Valider une œuvre
router.patch('/:id/validate', ensureAdmin, async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la validation de l’œuvre." });
  }
});

// Rejeter / supprimer une œuvre
router.delete('/:id', ensureAdmin, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Œuvre supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l’œuvre." });
  }
});

// Récupérer toutes les œuvres non validées
router.get('/pending', ensureAdmin, async (req, res) => {
  try {
    const pending = await Work.find({ isApproved: false }).populate('artistId', 'username');
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération œuvres non validées' });
  }
});



module.exports = router;
