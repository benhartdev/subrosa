const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const authController = require('../controllers/authController');
const { authenticateToken, ensureAdmin } = require('../middlewares/authMiddleware');
const session = require('express-session');

// Configuration de la session
router.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Route pour générer un token JWT
router.get('/generateToken', authController.generateToken);

// Route pour activer le Mode CRUD
router.get('/login', authenticateToken, (req, res) => {
    res.json({ message: 'Connexion réussie. Vous êtes maintenant en mode CRUD.' });
});

// Route pour quitter le Mode CRUD
router.get('/logout', authController.logout);

// Routes CRUD protégées par le middleware ensureAdmin
router.get('/all', ensureAdmin, artistsController.getAllArtists);
router.post('/', ensureAdmin, artistsController.createArtist);
router.put('/:id', ensureAdmin, artistsController.updateArtist);
router.delete('/:id', ensureAdmin, artistsController.deleteArtist);

module.exports = router;
