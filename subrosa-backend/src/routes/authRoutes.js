// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, logout } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/logout', logout);

router.get('/me', (req, res) => {
    if (req.session?.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).json({ message: 'Non authentifié' });
    }
  });

  
module.exports = router;
