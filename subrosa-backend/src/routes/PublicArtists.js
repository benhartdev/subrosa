const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const upload = require('../middlewares/multerConfig');
const Artist = require('../models/Artist');

// ✅ Route publique pour récupérer tous les artistes
router.get('/', artistsController.getAllArtists);
router.post('/', artistsController.createArtist);

// // 3. Rendre les fichiers accessibles publiquement
// app.use('/uploads', express.static('uploads'));

// app.use(express.json());

// 4. Route pour upload d'une seule image enrichie
router.post('/upload/:artistId', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const { alt } = req.body;

    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ error: 'Artiste introuvable' });

    artist.images.push({
      url: fileUrl,
      alt: alt || '',
    });
    await artist.save();

    res.status(200).json({
      message: 'Image enrichie uploadée et associée à l\'artiste',
      image: { url: fileUrl, alt }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

// 5. Route pour upload de plusieurs images enrichies
router.post('/upload-multiple/:artistId', upload.array('images', 6), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    }

    const { alts = [] } = req.body; // Peut venir d'un formulaire multipart

    const imageData = req.files.map((file, index) => {
      return {
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
        alt: Array.isArray(alts) ? alts[index] || '' : alts
      };
    });

    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ error: 'Artiste introuvable' });

    artist.images.push(...imageData);
    await artist.save();

    res.status(200).json({
      message: 'Images enrichies uploadées et associées à l\'artiste',
      images: imageData
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});


// ✅ Route POST complète : création artiste + upload d'images enrichies
router.post('/full-create', upload.array('images', 6), async (req, res) => {
  try {
    const {
      username, password, name, birthdate, country_location, city_location,
      style, technical_skills, bio, email, phone, website, facebook,
      instagram, linkedin, twitter, interviews, isApproved, status
    } = req.body;

    // Gérer les expositions (array)
    const old_exhibitions = req.body.old_exhibitions || [];
    const future_exhibitions = req.body.future_exhibitions || [];

    // Forcer sous forme de tableaux si single input
    const normalizedOld = Array.isArray(old_exhibitions) ? old_exhibitions : [old_exhibitions];
    const normalizedFuture = Array.isArray(future_exhibitions) ? future_exhibitions : [future_exhibitions];
    const alts = req.body.alts || [];
    const normalizedAlts = Array.isArray(alts) ? alts : [alts];

    // Construire le tableau d’images enrichies
    const images = req.files.map((file, index) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      alt: normalizedAlts[index] || '',
      caption: '' // Tu pourras ajouter les captions plus tard si tu veux
    }));

    // Création de l'artiste
    const newArtist = new Artist({
      username,
      password,
      name,
      birthdate,
      country_location,
      city_location,
      style,
      technical_skills,
      bio,
      email,
      phone,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
      interviews,
      isApproved,
      status: status || 'pending',
      old_exhibitions: normalizedOld,
      future_exhibitions: normalizedFuture,
      images
    });

    await newArtist.save();
    console.log('✅ Artiste bien sauvegardé :', newArtist);
    res.status(201).json(newArtist);
  } catch (error) {
    console.error('Erreur lors de la création de l’artiste complet :', error.message);
    res.status(500).json({ error: 'Erreur lors de la création complète de l’artiste' });
  }
});


module.exports = router;
