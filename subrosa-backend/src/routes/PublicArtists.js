const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');

// ✅ Route publique pour récupérer tous les artistes
router.get('/', artistsController.getAllArtists);
router.post('/', artistsController.createArtist);

module.exports = router;
