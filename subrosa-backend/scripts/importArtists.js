const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ⚠️ Adapte le chemin vers ton modèle Artist
const Artist = require("../src/models/Artists");

const MONGO_URI = "mongodb+srv://benhartdev:Defcrew78@cluster0.nm9zt.mongodb.net/subrosa?retryWrites=true&w=majority";

async function importArtists() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    const filePath = path.join(__dirname, "clean_artists.json");

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const artists = JSON.parse(jsonData);

    // 💥 Optionnel : vide la collection avant
    // await Artist.deleteMany();

    const result = await Artist.insertMany(artists);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur pendant l'import :", err);
  }
}

importArtists();
