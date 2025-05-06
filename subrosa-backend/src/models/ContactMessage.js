// src/models/ContactMessage.js
const mongoose = require("mongoose");
require("./Artists"); // ✅ Force le chargement du modèle "Artist"

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
