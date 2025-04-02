const mongoose = require('mongoose');


const ArtistSchema = new mongoose.Schema({

      username: {
          type: String,
          required: [true, "Le nom de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
          trim: true,
          minlength: [4, "Le nom doit contenir au moins 4 caractères."]
    }, 

      password: {
          type: String,
          required: [true, "Le nom de l'artiste est requis."],
          match: [/^[A-Za-zÀ-ÿ0-9'’\- ]+$/, "Le nom ne peut contenir que des lettres (y compris accentuées), chiffres, tirets, apostrophes et espaces."],
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

      country_location: {
          type: String,
          required: [true, "Le pays est requis."],
          trim: true,
          match: [/^[A-Za-zÀ-ÿ\s\-']+$/, "Le nom du pays contient des caractères invalides."],
          set: (value) => value.toUpperCase()
      },

      city_location: {
          type: String,
          required: [true, "La ville est requise."],
          trim: true,
          match: [/^[A-Za-zÀ-ÿ\s\-']+$/, "Le nom de la ville contient des caractères invalides."],
          set: (value) =>
          value
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase()) // majuscule première lettre
      },

      birthdate: {
          type: String,
          required: [true, "La date de naissance est requise."],
          match: [/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/, "Format de date invalide. Utilisez jj/mm/aaaa."],
          trim: true
      },

      style: {
          type: String,
          required: [true, "Le style artistique est requis."],
          enum: ['peinture', 'photographie', 'sculpture', 'illustration', 'autre'],
          trim: true
      },

      technical_skills: {
          type: String,
          required: [true, "Les techniques employées sont requise."],
          trim: true,
          maxlength: [150, "La liste de skills ne peut pas dépasser 150 caractères."]
      },

      bio: {
          type: String,
          trim: true,
          maxlength: [1000, "La biographie ne peut pas dépasser 1000 caractères."]
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
          match: [/^(\+33|0)[1-9](\d{2}){4}$/, "Le numéro de téléphone est invalide (attendu : format FR)"],
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

      twitter: {
          type: String,
          match: [/^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/, "Lien Twitter invalide."],
          trim: true
      },

      linkedin: {
          type: String,
          match: [/^https?:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9_.-]+$/, "Lien Linkedin invalide."],
          trim: true
      },
      
      date_of_entry: {
          type: Date,
          default: Date.now
      },

      numer_of_Artworks: {
          type: Number,
          min: [0, "Le nombre d'œuvres doit être positif."],
          default: 0
      },

      number_of_artworks_in_stock: {
          type: Number,
          min: [0, "Le stock doit être supérieur ou égal à 0."],
          default: 0
      },

      past_sales: String,

      past_orders: String,

      orders_in_progress: String,

      followers: String,

      interviews: {
          type: String,
          trim: true,
          maxlength: [2000, "L'interview ne peut pas dépasser 2000 caractères."]
      },

      isApproved: { 
          type: Boolean,
          default: false 
      },

      status: {
          type: String,
          enum: ['pending', 'validated', 'rejected'],
          default: 'pending'
      }
    });
    

module.exports = mongoose.model('Artist', ArtistSchema, 'Artists');
