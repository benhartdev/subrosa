require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Artist = require('../src/models/Artists');


mongoose.connect(process.env.MONGO_URI); // adapte l’URL si besoin

async function fixPlainPasswords() {
  const artists = await Artist.find();

  for (let artist of artists) {
    // si le mot de passe n'est pas hashé (ex: < 60 caractères ou ne commence pas par $2b$)
    if (!artist.password.startsWith('$2b$')) {
      const hashed = await bcrypt.hash(artist.password, 10);
      artist.password = hashed;
      await artist.save();
    }
  }

  process.exit();
}

fixPlainPasswords();
