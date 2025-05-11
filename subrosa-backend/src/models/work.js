const mongoose = require("mongoose");
const slugify = require('slugify');

const workSchema = new mongoose.Schema({

  title: { type: String, required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  description: { type: String },
  creation_date: { type: Date },
  medium: { type: String }, // Technique utilisée (peinture, photo, sculpture, etc.)
  dimensions: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    depth: { type: Number }, // Optionnel, pour sculptures ou œuvres 3D
    unit: { type: String, default: "cm" } // cm, inch, etc.
  },
  dominant_colors: [{ type: String }],
  themes: [{ type: String }],
  price: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  in_stock: { type: Number, default: true },
  images: [{
    url: { type: String, required: true },
    altText: { type: String, required: true }
  }],
  status: { type: String, enum: ["available", "sold", "reserved"], default: "available" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isApproved: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["Photographie", "Sculpture", "Peinture", "Illustration", "Edition d'art"],
    required: true,
  },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true, },
});

const createSlug = (title) => {
        return title
            .toLowerCase()
            .normalize("NFD") // pour gérer les accents
            .replace(/[\u0300-\u036f]/g, "") // retire les accents
            .replace(/[^a-z0-9 ]/g, "") // retire les caractères spéciaux
            .replace(/\s+/g, "-"); // remplace espaces par tirets
};

workSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


module.exports = mongoose.models.work || mongoose.model("work", workSchema);

