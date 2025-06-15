// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, logout, forgotPassword, resetPassword } = require('../controllers/authController');
const { checkSession } = require('../controllers/sessionController');


router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', (req, res) => {
  if (req.session?.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: 'Non authentifié' });
  }
});

router.get('/check', (req, res) => {
  if (req.session?.user) {
    return res.status(200).json({ authenticated: true, user: req.session.user });
  }
  return res.status(401).json({ authenticated: false });
});

module.exports = router;
