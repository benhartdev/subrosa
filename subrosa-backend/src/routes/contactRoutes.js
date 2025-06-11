// src/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { sendContactMessage, getAllMessages, deleteMessage, markAsRead,} = require("../controllers/contactController");

//  Anti-spam : max 3 messages par heure
 const contactLimiter = rateLimit({
  windowMs: 60 * 60000, // 1 heure
   message: {
    success: false,
    error: '⛔⛔ Trop de messages envoyés. Veuillez réessayer dans une minute.⛔⛔'
  }
 });

// 🎯 Validation des champs

const validateContact = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nom requis'),

  body('email')
  .trim()
  .custom((value) => {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!strictEmailRegex.test(value)) {
      throw new Error("Adresse email invalide");
    }
    return true;
  }),

  body('message')
    .trim()
    .escape()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message trop court'),
];


//  Envoi du message avec sécurité + validation
router.post("/", validateContact, sendContactMessage);  // contactLimiter a rajouter apres debug
router.put("/mark/:id", markAsRead);
router.get("/", getAllMessages); 
router.delete("/:id", deleteMessage);

module.exports = router;
