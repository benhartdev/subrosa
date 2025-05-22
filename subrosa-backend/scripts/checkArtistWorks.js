const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: "subrosa", // 👉 adapte si besoin
})
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    checkArtistWorksConsistency();
  })
  .catch((err) => console.error("❌ Connexion échouée :", err));

// Modèles
const Artist = require("../src/models/Artists");
const Work = require("../src/models/work");

async function checkArtistWorksConsistency() {
  try {
    const artists = await Artist.find({});
    const allWorks = await Work.find({});

    console.log(`🧑‍🎨 Artistes trouvés : ${artists.length}`);
    console.log(`🖼️ Œuvres trouvées : ${allWorks.length}\n`);

    for (const artist of artists) {
      const artistIdStr = artist._id.toString();
      const artistWorksInDB = allWorks.filter(w => w.artistId?.toString() === artistIdStr);
      const artistWorksRefs = artist.works?.map(id => id.toString()) || [];

      const missingRefs = artistWorksInDB
        .map(w => w._id.toString())
        .filter(id => !artistWorksRefs.includes(id));

      const nonexistentRefs = artistWorksRefs
        .filter(id => !allWorks.find(w => w._id.toString() === id));

      console.log(`🧑‍🎨 ${artist.username} (${artist._id.toString().slice(0, 7)}...)`);

      if (missingRefs.length === 0 && nonexistentRefs.length === 0) {
        console.log(`✅ Tout est cohérent`);
      } else {
        if (missingRefs.length > 0) {
          console.log(`❌ Travaux présents en BDD mais pas référencés chez l’artiste :`, missingRefs);
        }
        if (nonexistentRefs.length > 0) {
          console.log(`⚠️ Travaux référencés mais inexistants :`, nonexistentRefs);
        }
      }

      console.log(`--------------------------`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de la vérification :", err);
    process.exit(1);
  }
}
