const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le username de l'artiste est requis."],
    match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
    trim: true,
    unique: true,
    minlength: [4, "Le nom doit contenir au moins 4 caractères."]
},
password: {
  type: String,
  required: [true, "Le mdp de l'artiste est requis."],
  minlength: [4, "Le nom doit contenir au moins 4 caractères."]
},
email: {
  type: String,
  required: [true, "L'adresse email est requise."],
  match: [/.+\@.+\..+/, "L'adresse email n'est pas valide."],
  lowercase: true,
  trim: true,
  unique: true
},
  firstName: { type: String },
  lastName: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    country: { type: String }
  },
  phone: { type: String },
  newsletter: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['admin', 'user', 'artist'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ✅ Hasher le mot de passe avant la sauvegarde dans la base de données
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)

