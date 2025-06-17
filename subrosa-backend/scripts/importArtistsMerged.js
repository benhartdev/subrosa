const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Ton modèle Artist
const Artist = require("../src/models/Artists");

// 🔑 URI MongoDB
const MONGO_URI = "mongodb+srv://benhartdev:Defcrew78@cluster0.nm9zt.mongodb.net/subrosa?retryWrites=true&w=majority";

// 🧼 Étape 1 : conversion Extended JSON → JSON standard
function convertExtendedJSON(inputPath) {
  const extended = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  const clean = extended.map((artist) => {
    return {
      ...artist,
      _id: artist._id?.$oid || artist._id,
      images: artist.images?.map((img) => ({
        ...img,
        _id: img._id?.$oid || img._id,
        uploadedAt: img.uploadedAt?.$date || img.uploadedAt,
      })) || [],
      works: artist.works?.map((w) => w?.$oid || w) || [],
    };
  });

  const outputPath = path.join(__dirname, "clean_artists.json");
  fs.writeFileSync(outputPath, JSON.stringify(clean, null, 2), "utf-8");
  return clean;
}

// 🗃️ Étape 2 : insertion MongoDB
async function importToMongo(artists) {
  try {
    await mongoose.connect(MONGO_URI);

    const result = await Artist.insertMany(artists);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur pendant l'import :", err);
  }
}

// ▶️ Lancement
const inputFile = path.join(__dirname, "Subrosa-art.Artists.json");
const converted = convertExtendedJSON(inputFile);
importToMongo(converted);
