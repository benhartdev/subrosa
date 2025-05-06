// src/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { sendContactMessage, getAllMessages, deleteMessage } = require("../controllers/contactController");

router.post("/", sendContactMessage);
router.get("/", getAllMessages); 
router.delete("/:id", deleteMessage);

module.exports = router;
