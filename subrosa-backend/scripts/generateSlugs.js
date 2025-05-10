const mongoose = require("mongoose");
const slugify = require("slugify");
const Artist = require("../src/models/Artists");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/subrosa-art";

async function generateSlugs() {
  try {
    console.log("📡 Connexion à MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connexion MongoDB établie.");

    const artists = await Artist.find();
    console.log(`🎨 ${artists.length} artistes trouvés.`);

    for (const artist of artists) {
      const slug = slugify(artist.name, { lower: true, strict: true });

      // Slug déjà existant ?
      if (artist.slug && artist.slug === slug) {
        console.log(`➡️ Slug déjà existant pour ${artist.name} → ${artist.slug}`);
        continue;
      }

      // Vérifier si birthdate est un string
      if (typeof artist.birthdate === "string") {
        try {
          const [day, month, year] = artist.birthdate.split("/");
          artist.birthdate = new Date(`${year}-${month}-${day}`);
        } catch (e) {
          console.warn(`❗️Erreur format date pour ${artist.name} : ${artist.birthdate}`);
          continue;
        }
      }

      artist.slug = slug;

      await artist.save({ validateBeforeSave: false });
      console.log(`✅ Slug mis à jour pour ${artist.name} → ${artist.slug}`);
    }

    console.log("🎉 Slugs générés avec succès.");
  } catch (error) {
    console.error("❌ Erreur pendant la génération des slugs :", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion de MongoDB.");
  }
}

generateSlugs();
