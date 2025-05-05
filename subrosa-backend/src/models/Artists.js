const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({

      username: {
          type: String,
          required: [true, "Le username de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
          trim: true,
          minlength: [4, "Le nom doit contenir au moins 4 caractères."]
    }, 
      password: {
          type: String,
          required: [true, "Le mdp de l'artiste est requis."],
          trim: true,
          minlength: [4, "Le nom doit contenir au moins 4 caractères."]
    },
      name: {
          type: String,
          required: [true, "Le nom de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
          trim: true,
          minlength: [4, "Le nom doit contenir au moins 4 caractères."]
      },
      role: {
        type: String,
        enum: ["artist"],
        default: "artist"
      },
      isAdmin: {
        type: Boolean,
        default: false
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
          type: String,
         
          match: [/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/, "Format de date invalide. Utilisez jj/mm/aaaa."],
          trim: true
      },
      style: {
          type: String,
         
          enum: ['peinture', 'photographie', 'sculpture', 'illustration', 'plasticien', 'autre'],
          trim: true
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
      numer_of_Artworks: {
          type: Number,
          min: [0, "Oeuvres > 0."],
          default: 0
      },
      number_of_artworks_in_stock: {
          type: Number,
          min: [0, "Stock >= à 0."],
          default: 0
      },
      interviews: { type: String, trim: true, maxlength: [500, "Max 500 caractères."]},
      isApproved: {type: Boolean, default: false},
      status: { type: String, enum: ['pending', 'validated', 'rejected'], default: 'pending'},
      name: String, images: [{ url: String, alt: String, uploadedAt: { type: Date, default: Date.now }}],
      works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
      artistImages: [{url: { type: String },alt: { type: String },uploadedAt: { type: Date, default: Date.now }}],
      newsletter: { type: Boolean, default: true },
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactMessage' }]
    });
    

    module.exports = mongoose.model('Artist', artistSchema, 'Artists');

