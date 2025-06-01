// src/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { sendContactMessage, getAllMessages, deleteMessage,} = require("../controllers/contactController");

// 🎯 Anti-spam : max 3 messages par minute
const contactLimiter = rateLimit({
  windowMs: 60 * 60000, // 1 heure
  message: {
    success: false,
    error: '⛔ Trop de messages envoyés. Veuillez réessayer dans une minute.'
  }
});

// 🎯 Validation des champs
const validateContact = [
  body('name').trim().escape().isLength({ min: 2, max: 100 }).withMessage('Nom requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('message').trim().escape().isLength({ min: 10, max: 1000 }).withMessage('Message trop court'),
];

//  Envoi du message avec sécurité + validation
router.post("/", contactLimiter, validateContact, sendContactMessage);

router.get("/", getAllMessages); 
router.delete("/:id", deleteMessage);

module.exports = router;
