// scripts/cleanup-unused-images.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Work = require("../src/models/work");
const Artist = require("../src/models/Artists");
require("dotenv").config();

const UPLOADS_DIR = path.join(__dirname, "../uploads"); // adapte si besoin

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const usedImages = new Set();

  // 1. Récupérer les fichiers utilisés dans les œuvres
  const works = await Work.find({});
  works.forEach((work) => {
    work.images?.forEach((img) => {
      if (img.url) usedImages.add(path.basename(img.url));
    });
  });

  // 2. Récupérer les fichiers utilisés dans les artistes
  const artists = await Artist.find({});
  artists.forEach((artist) => {
    artist.artistImages?.forEach((img) => {
      if (img.url) usedImages.add(path.basename(img.url));
    });
  });

  // 3. Lister tous les fichiers dans /uploads/images
  const allFiles = fs.readdirSync(UPLOADS_DIR);

  // 4. Identifier les fichiers non utilisés
  const unusedFiles = allFiles.filter((filename) => !usedImages.has(filename));

  // 5. Supprimer les fichiers non utilisés
  unusedFiles.forEach((filename) => {
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.unlinkSync(filePath);
  });

  process.exit();
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
