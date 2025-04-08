const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  description: { type: String },
  creation_date: { type: Date },
  medium: { type: String }, // Technique utilisée (peinture, photo, sculpture, etc.)
  dimensions: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    depth: { type: Number }, // Optionnel, pour sculptures ou œuvres 3D
    unit: { type: String, default: 'cm' } // cm, inch, etc.
  },
  dominant_colors: [{ type: String }],
  themes: [{ type: String }],
  price: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  in_stock: { type: Boolean, default: true },
  images: [{
    url: { type: String, required: true },
    altText: { type: String, required: true }
  }],
  status: { type: String, enum: ['available', 'sold', 'reserved'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

workSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model("Work", workSchema);
