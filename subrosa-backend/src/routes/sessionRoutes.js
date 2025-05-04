const express = require('express');
const router = express.Router();
const { checkSession } = require('../controllers/sessionController');

router.get('/check-session', checkSession);

module.exports = router;
