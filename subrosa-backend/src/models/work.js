const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  imageUrl: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Work", workSchema);
