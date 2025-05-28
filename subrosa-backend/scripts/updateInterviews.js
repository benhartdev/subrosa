
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const Artist = require('../src/models/Artists');

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);

async function updateArtistsInterviewField() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connecté à MongoDB");

    const artistsWithoutInterview = await Artist.find({
      $or: [
        { interview: { $exists: false } },
        { interview: null }
      ]
    });

    console.log(`🎯 Artistes à mettre à jour : ${artistsWithoutInterview.length}`);

    const updates = await Promise.all(
      artistsWithoutInterview.map(artist =>
        Artist.findByIdAndUpdate(
          artist._id,
          {
            $set: {
              interview: {
                question1: "",
                question2: "",
                question3: ""
              }
            }
          },
          { new: true }
        )
      )
    );

    console.log(`✅ ${updates.length} artistes mis à jour avec un champ interview structuré.`);

    await mongoose.disconnect();
    console.log("🔌 Déconnecté de MongoDB");
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
  }
}

updateArtistsInterviewField();
