const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Artist = require("../src/models/Artists");
const Work = require("../src/models/work");

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connexion MongoDB réussie.");

    const works = await Work.find();
    console.log(`🔎 ${works.length} œuvres trouvées.`);

    for (const work of works) {
      const artistId = work.artistId;
      if (!artistId) {
        console.warn(`⚠️  L'œuvre ${work._id} n'a pas d'artistId.`);
        continue;
      }

      await Artist.findByIdAndUpdate(
        artistId,
        { $addToSet: { works: work._id } }, // évite les doublons
        { new: true }
      );

      console.log(`✅ Lien créé : œuvre ${work._id} → artiste ${artistId}`);
    }

    console.log("🎉 Association terminée.");
  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion MongoDB.");
  }
}

main();
