// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const Artist = require('../models/Artists');

// Upload d'une image unique associée à un artiste
router.post('/upload/:artistId', upload.single('image'), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const { alt } = req.body;
    const artist = await Artist.findById(req.params.artistId);
    if (!artist)
      return res.status(404).json({ error: 'Artiste introuvable' });
    artist.images.push({ url: fileUrl, alt: alt || '' });
    await artist.save();
    res.status(200).json({ message: 'Image uploadée', image: { url: fileUrl, alt } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

// Upload de plusieurs images associées à un artiste
router.post('/upload-multiple/:artistId', upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    const { alts = [] } = req.body;
    const imageData = req.files.map((file, index) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      alt: Array.isArray(alts) ? alts[index] || '' : alts
    }));
    const artist = await Artist.findById(req.params.artistId);
    if (!artist)
      return res.status(404).json({ error: 'Artiste introuvable' });
    artist.images.push(...imageData);
    await artist.save();
    res.status(200).json({
      message: 'Images uploadées',
      images: imageData
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

// Optionnel : route pour créer un artiste avec upload simultané
router.post('/full-create', upload.array('images', 20), async (req, res) => {
  try {
    const {
      username, password, name, birthdate, country_location, city_location,
      style, technical_skills, bio, email, phone, website, facebook,
      instagram, linkedin, twitter, interviews, isApproved, status
    } = req.body;
    const old_exhibitions = req.body.old_exhibitions || [];
    const future_exhibitions = req.body.future_exhibitions || [];
    const normalizedOld = Array.isArray(old_exhibitions) ? old_exhibitions : [old_exhibitions];
    const normalizedFuture = Array.isArray(future_exhibitions) ? future_exhibitions : [future_exhibitions];
    const alts = req.body.alts || [];
    const normalizedAlts = Array.isArray(alts) ? alts : [alts];
    const images = req.files.map((file, index) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      alt: normalizedAlts[index] || '',
      caption: ''
    }));
    if (req.body.password) {
      console.warn("⚠️ Champ 'password' supprimé : l’admin ne peut pas définir le mot de passe.");
      delete req.body.password;
    }
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
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création complète de l’artiste' });
  }
});

module.exports = router;
