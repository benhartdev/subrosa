// routes/artistsRoutes.js
const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const { ensureAdmin, ensureArtist } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');
// ------------------ Endpoints publics ------------------

// Retourne la liste complète des artistes (pour le public)
router.get('/', artistsController.getAllArtists);



// Retourne 4 artistes en vedette (optionnel : filtrer par IDs via query string ?ids=...)
router.get('/featured', artistsController.getFeaturedArtists);

// Inscription d'un nouvel artiste (accessible publiquement)
router.post('/register', upload.array('images', 20), artistsController.createArtist);

// ------------------ Endpoints protégés ------------------
// Ces endpoints nécessitent une authentification et des vérifications de rôles

// Mise à jour d'un artiste (l'endpoint est accessible pour l'artiste lui-même via ensureArtist ou pour un admin)
router.put('/:id', ensureAdmin, upload.none(), artistsController.updateArtist);

// Suppression d'un artiste (admin uniquement)
router.delete('/:id', ensureAdmin, artistsController.deleteArtist);

// Récupère les artistes en attente (admin uniquement)
router.get('/pending', ensureAdmin, artistsController.getPendingArtists);

// Mise à jour du statut d'un artiste (admin uniquement)
router.put('/:id/status', ensureAdmin, artistsController.updateArtistStatus);
router.get('/:id',artistsController.getArtistById);

module.exports = router;
