const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');

// ✅ Route pour récupérer des œuvres aléatoires
router.get('/random-artworks', artistsController.getRandomArtworks);

module.exports = router;
