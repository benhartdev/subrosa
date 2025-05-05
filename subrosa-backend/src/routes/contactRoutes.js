// src/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { sendContactMessage, getAllMessages } = require("../controllers/contactController");

router.post("/", sendContactMessage);
router.get("/", getAllMessages); // ici

module.exports = router;
