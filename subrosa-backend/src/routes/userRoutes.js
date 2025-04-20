// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Route d'inscription utilisateur
router.post('/register', registerUser);

module.exports = router;
