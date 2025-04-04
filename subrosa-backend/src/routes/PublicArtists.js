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

module.exports = router;
