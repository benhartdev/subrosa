// scripts/list-used-images.js
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Work = require("../src/models/work");
const Artist = require("../src/models/Artists");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const usedImages = new Set();

  // Récupérer toutes les images dans les œuvres
  const works = await Work.find({});
  works.forEach((work) => {
    work.images?.forEach((img) => {
      if (img.url) usedImages.add(path.basename(img.url));
    });
  });

  // Récupérer toutes les images dans les artistes
  const artists = await Artist.find({});
  artists.forEach((artist) => {
    artist.artistImages?.forEach((img) => {
      if (img.url) usedImages.add(path.basename(img.url));
    });
  });

  // Sauvegarde dans un fichier texte
  const outputPath = path.join(__dirname, "used-images.txt");
  fs.writeFileSync(outputPath, Array.from(usedImages).join("\n"), "utf-8");

  process.exit();
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
