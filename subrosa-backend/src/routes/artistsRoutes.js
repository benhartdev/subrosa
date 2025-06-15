// routes/artistsRoutes.js
const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const { ensureAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');
const ensureValidatedArtist = require('../middlewares/ensureValidatedArtist');
const { getOwnProfile } = require('../controllers/artistsController');
const { updateArtistImages } = require('../controllers/artistsController');
const rateLimit = require("express-rate-limit");
// ------------------ Endpoints publics ------------------

// Retourne la liste complète des artistes (pour le public)
router.get('/', artistsController.getAllArtists);

// Retourne 4 artistes en vedette (optionnel : filtrer par IDs via query string ?ids=...)
router.get('/featured', artistsController.getFeaturedArtists);

// Inscription d'un nouvel artiste (accessible publiquement)
const createArtistLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
      max: process.env.NODE_ENV === 'development' ? 100 : 5,
    message: "Trop de tentatives d'inscription. Veuillez réessayer plus tard."
});

router.post('/register',createArtistLimiter,
     upload.fields([
    { name: 'images', maxCount: 20 },
    { name: 'artistImages', maxCount: 3 },
]), artistsController.createArtist);

router.get('/me', ensureValidatedArtist, getOwnProfile);

// ------------------ Endpoints protégés ------------------
// Ces endpoints nécessitent une authentification et des vérifications de rôles

// Mise à jour d'un artiste (l'endpoint est accessible pour l'artiste lui-même via ensureArtist ou pour un admin)
router.put('/:id', ensureAdmin, upload.none(), artistsController.updateArtist);

// Suppression d'un artiste (admin uniquement)
router.delete('/:id', ensureAdmin, artistsController.deleteArtist);

// Récupère les artistes en attente (admin uniquement)
router.get('/pending', ensureAdmin, artistsController.getPendingArtists);

// Récupère un artiste par son slug
router.get('/slug/:slug', artistsController.getArtistBySlug);

// Ajouter des images à un artiste (admin uniquement)
router.patch('/:id/images', ensureAdmin, updateArtistImages);

// Mise à jour du statut d'un artiste (admin uniquement)
router.put('/:id/status', ensureAdmin, artistsController.updateArtistStatus);
router.get('/:id',artistsController.getArtistById);



module.exports = router;
