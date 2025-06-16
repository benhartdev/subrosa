const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const artistSchema = new mongoose.Schema({

      username: {
          type: String,
          required: [true, "Le username de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
          trim: true,
          minlength: [4, "Le username doit contenir au moins 4 caractères."]
    }, 
      password: {
          type: String,
          required: [true, "Le mdp de l'artiste est requis."],
          trim: true,
          minlength: [4, "Le mdp doit contenir au moins 4 caractères."]
    },
      name: {
          type: String,
          required: [true, "Le nom de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
          trim: true,
          minlength: [4, "Le nom doit contenir au moins 4 caractères."]
      },
      slug: { type: String, unique: true, lowercase: true, trim: true, },
      role: {
        type: String,
        enum: ["artist"],
        default: "artist"
      },
      isAdmin: {type: Boolean, default: false
      },
      country_location: {
          type: String,
          trim: true,
          match: [/^[A-Za-zÀ-ÿ\s\-']+$/, "Le nom du pays contient des caractères invalides."],
          set: (value) => value.toUpperCase()
      },
      city_location: {
          type: String,
          trim: true,
          match: [/^[A-Za-zÀ-ÿ\s\-']+$/, "Le nom de la ville contient des caractères invalides."],
          set: (value) =>
          value
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase()) // majuscule première lettre
      },
      birthdate: {
        type: Date,
        required: [true, "La date de naissance est requise."],
      },
      style: {
        type: String,
        enum: ['Photographe', 'Peintre', 'Sculpteur', 'Illustrateur', 'Plasticien', 'Autre'],
        required: [true, "Le style artistique est requis."]
      },
      technical_skills: {
          type: String,
          trim: true,
          maxlength: [150, "Max 150 caractères."]
      },
      bio: {
          type: String,
          trim: true,
          maxlength: [2000, "Max 2000 caractères."]
      },
      old_exhibitions: {
          type: [String],
          default: []
      },
      future_exhibitions: {
          type: [String],
          default: []
      },
      email: {
          type: String,
          required: [true, "L'adresse email est requise."],
          match: [/.+\@.+\..+/, "L'adresse email n'est pas valide."],
          lowercase: true,
          trim: true,
          unique: true
      },
      phone: {
          type: String,
          match: [/^(\+33|0)[1-9](?:[ .-]?\d{2}){4}$/, "Numéro invalide. Format attendu : 06 12 34 56 78 ou +33 6 12 34 56 78"],
          trim: true
      },
      website: {
          type: String,
          match: [/^https?:\/\/.+/, "Le site web doit commencer par http:// ou https://"],
          trim: true
      },
      facebook: {
          type: String,
          match: [/^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+$/, "Lien Facebook invalide."],
          trim: true
      },
      instagram: {
          type: String,
          match: [/^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.-]+$/, "Lien Instagram invalide."],
          trim: true
      },
      linkedin: {
          type: String,
          match: [/^https?:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9_.-]+$/, "Lien Linkedin invalide."],
          trim: true
      },
      twitter: {
        type: String,
        match: [/^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_.-]+$/, "Lien Twitter invalide."],
        trim: true
      },
      interview: { question1: { type: String, trim: true, maxlength: [200, "Max 200 caractères."]},
                    question2: { type: String, trim: true, maxlength: [200, "Max 200 caractères."]},
                    question3: { type: String, trim: true, maxlength: [200, "Max 200 caractères."]},
                },
      isApproved: {type: Boolean, default: false},
      status: { type: String, enum: ['pending', 'validated', 'rejected'], default: 'pending'},
      works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
      artistImages: [{url: { type: String },altText: { type: String },uploadedAt: { type: Date, default: Date.now }}],
      newsletter: { type: Boolean, default: true },
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactMessage' }],
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
      createdAt: { type: Date, default: Date.now },
    });
    
    const createSlug = (name) => {
        return name
            .toLowerCase()
            .normalize("NFD") // pour gérer les accents
            .replace(/[\u0300-\u036f]/g, "") // retire les accents
            .replace(/[^a-z0-9 ]/g, "") // retire les caractères spéciaux
            .replace(/\s+/g, "-"); // remplace espaces par tirets
};

    // Génération auto du slug si non fourni et incremente le slug si plusieurs artistes ont le même nom
    // Si le slug est déjà pris, on ajoute un suffixe numérique
   artistSchema.pre("save", async function (next) {
  if (!this.slug && this.name) {
    const baseSlug = createSlug(this.name);
    let slug = baseSlug;
    let counter = 1;

    // Vérifie que le slug est unique dans la base
    while (await this.constructor.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

artistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

    module.exports = mongoose.model('Artist', artistSchema, 'Artists');

