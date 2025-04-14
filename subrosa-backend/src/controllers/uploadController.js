// controllers/uploadController.js
const Artist = require('../models/Artist');

// Upload d'une image enrichie (alt)
exports.uploadSingleImage = async (req, res) => {
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
};

// Upload de plusieurs images enrichies
exports.uploadMultipleImages = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).json({ error: 'Artiste introuvable' });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    }

    const { alts = [] } = req.body;
    const altsArray = Array.isArray(alts) ? alts : [alts];

    const imageData = req.files.map((file, index) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      alt: altsArray[index] || '',
      uploadedAt: new Date(),
    }));

    artist.images.push(...imageData);
    await artist.save();

    res.status(200).json({
      message: 'Images uploadées et associées à l\'artiste avec succès.',
      artist,
    });
  } catch (err) {
    console.error('Erreur lors de l’upload multiple :', err);
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
};
