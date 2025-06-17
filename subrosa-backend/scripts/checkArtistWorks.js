const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: "subrosa", // 👉 adapte si besoin
})
  .then(() => {
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


    for (const artist of artists) {
      const artistIdStr = artist._id.toString();
      const artistWorksInDB = allWorks.filter(w => w.artistId?.toString() === artistIdStr);
      const artistWorksRefs = artist.works?.map(id => id.toString()) || [];

      const missingRefs = artistWorksInDB
        .map(w => w._id.toString())
        .filter(id => !artistWorksRefs.includes(id));

      const nonexistentRefs = artistWorksRefs
        .filter(id => !allWorks.find(w => w._id.toString() === id));


      if (missingRefs.length === 0 && nonexistentRefs.length === 0) {
      } else {
        if (missingRefs.length > 0) {
        }
        if (nonexistentRefs.length > 0) {
        }
      }

    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de la vérification :", err);
    process.exit(1);
  }
}
