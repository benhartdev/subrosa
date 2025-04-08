const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const authController = require('../controllers/authController');
const { ensureAdmin } = require('../middlewares/authMiddleware.js');
console.log('ensureAdmin:', ensureAdmin);
console.log('artistsController:', artistsController);



router.get('/all', ensureAdmin, artistsController.getAllArtists);


router.post('/register', artistsController.createArtist);

// Route de connexion admin
router.post('/login', authController.login);

// Route de déconnexion admin
router.get('/logout', authController.logout);

// Routes CRUD protégées par le middleware ensureAdmin
router.get('/all', ensureAdmin, artistsController.getAllArtists);
router.post('/', ensureAdmin, artistsController.createArtist);
router.put('/:id', ensureAdmin, artistsController.updateArtist);
router.delete('/:id', ensureAdmin, artistsController.deleteArtist);
router.get('/pending', ensureAdmin, artistsController.getPendingArtists);
router.put('/:id/status', ensureAdmin, artistsController.updateArtistStatus);


module.exports = router;
